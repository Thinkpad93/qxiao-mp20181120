<template>
  <div class="page">
    <div class="page-bd">
      <!-- popup -->
      <van-popup v-model="popupShow" position="bottom">
        <van-datetime-picker
          @cancel="popupShow = false"
          @confirm="handleConfirm"
          v-model="startDate"
          type="date"
          :min-date="minDate"
          :formatter="formatter"
        ></van-datetime-picker>
      </van-popup>
      <!-- popup -->
      <div class="cells">
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">
              <template v-if="imagesList.length">
                <img :src="imagesList[0]" width="50" height="50" radius="50">
              </template>
              <img :src="form.openPhoto" width="50" height="50" radius="50" v-else>
            </label>
          </div>
          <div class="cell-bd text-right">
            <span v-if="imagesList.length" @click.stop="handleDelImg(0)">删除</span>
            <span @click="handleChooseImage" v-else>点击更换</span>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">学生姓名</label>
          </div>
          <div class="cell-bd">
            <input class="input" placeholder="请输入姓名" maxlength="5" v-model="form.studentName">
          </div>
        </div>
        <div class="cell cell-select cell-select-after min-h120">
          <div class="cell-hd">
            <label for class="label">性别</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="form.sex">
              <option
                :value="option.id"
                v-for="(option,index) in sexList"
                :key="index"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
        <div class="cell min-h120" v-if="form.schoolName">
          <div class="cell-hd">
            <label class="label">就读学校</label>
          </div>
          <div class="cell-bd">
            <input class="input" v-model="form.schoolName" disabled>
          </div>
        </div>
        <div class="cell min-h120" v-if="form.className">
          <div class="cell-hd">
            <label class="label">所在班级</label>
          </div>
          <div class="cell-bd">
            <input class="input" v-model="form.className" disabled>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">出生日期</div>
          <div class="cell-bd">
            <input
              class="input"
              placeholder="请选择出生日期"
              @click="popupShow = true"
              v-model="form.birthday"
              readonly
              maxlength="20"
            >
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">地址</label>
          </div>
          <div class="cell-bd">
            <input class="input" placeholder="请输入地址" maxlength="100" v-model="form.address">
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label for class="label">家长手机号码</label>
          </div>
          <div class="cell-bd">
            <input
              class="input"
              placeholder="请输入手机号"
              v-model="form.tel"
              readonly
              unselectable="on"
              @focus="this.blur()"
            >
          </div>
        </div>

        <div class="cell cell-select cell-select-after min-h120">
          <div class="cell-hd">
            <label for class="label">关系</label>
          </div>
          <div class="cell-bd">
            <select class="select" name dir="rtl" v-model="form.relation">
              <!-- 兼容性问题修改 -->
              <optgroup disabled hidden></optgroup>
              <option
                :value="option.id"
                v-for="(option,index) in relationList"
                :key="index"
              >{{ option.name }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="page-ft">
      <div class="fixed-bottom">
        <div class="flex">
          <van-button
            size="large"
            type="danger"
            class="no-radius"
            @click="handleDel"
            v-if="!form.schoolName || !form.className"
          >删除</van-button>
          <van-button size="large" type="info" class="no-radius" @click="handleSubmit">保存</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import dayjs from "dayjs";
import { sex, relation } from "@/mixins/type";
import wxHandle from "@/mixins/wx";
import { isPhone } from "@/utils/validator";
export default {
  name: "childEdit",
  mixins: [sex, relation, wxHandle],
  data() {
    return {
      popupShow: false,
      minDate: new Date(1966, 10, 1),
      form: {},
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$route.query.openStudentId
      },
      roleType: this.$route.query.roleType
    };
  },
  computed: {
    startDate() {
      if ("birthday" in this.form) {
        return new Date(dayjs(this.form.birthday));
      }
    }
  },
  methods: {
    //格式化函数
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    handleConfirm(value) {
      let now = dayjs(new Date(value).getTime()).format("YYYY-MM-DD");
      this.form.birthday = now;
      this.popupShow = false;
    },
    handleDel() {
      let params = {
        openStudentId: this.query.studentId,
        roleType: this.roleType
      };
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除吗？"
        })
        .then(() => {
          this.deleteOpenStudent(params);
        });
    },
    async handleSubmit() {
      let params = {
        openId: this.query.openId,
        imgIds: this.serverId
      };
      let { studentName, address } = this.form;
      if (studentName == "") {
        this.$toast("请输入姓名");
        return;
      }
      //如果有上传图片
      if (this.serverId.length) {
        //先上传图片ID给后端去下载图片
        service.imgIds(params).then(res => {
          if (res.errorCode === 0) {
            this.form.openPhoto = res.data.paths[0].imageUrl;
            //提交保存
            service.studentInfoUpdate(this.form).then(res => {
              if (res.errorCode === 0) {
                this.$router.go(-1);
              } else {
                this.$toast(`${res.errorMsg}`);
              }
            });
          }
        });
      } else {
        this.studentInfoUpdate(this.form);
      }
    },
    //学生删除（开放版）
    async deleteOpenStudent(params = {}) {
      let res = await service.deleteOpenStudent(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //学生信息查询
    async studentQueryMe(params = {}) {
      let res = await service.studentQueryMe(params);
      if (res.errorCode === 0) {
        this.form = res.data;
      }
    },
    //学生修改
    async studentInfoUpdate(params = {}) {
      let res = await service.studentInfoUpdate(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    this.studentQueryMe(this.query);
  }
};
</script>
<style lang="less" scoped>
.fixed-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
