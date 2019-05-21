<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- popup -->
      <van-popup v-model="popupShow" position="bottom">
        <van-datetime-picker
          @cancel="popupShow = false"
          @confirm="handleConfirm"
          v-model="startDate"
          type="date"
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
              <div class="icon-d" v-else></div>
            </label>
          </div>
          <div class="cell-bd text-right">
            <span v-if="imagesList.length" @click.stop="handleDelImg(0)">删除</span>
            <span @click="handleChooseImage" v-else>点击添加</span>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">姓名</label>
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
            <label class="label">家长手机号码</label>
          </div>
          <div class="cell-bd">
            <input class="input" pattern="[0-9]*" placeholder="请输入手机号" v-model="form.tel">
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
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleSubmit">添加</van-button>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import dayjs from "dayjs";
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import wxHandle from "@/mixins/wx";
import { isPhone } from "@/utils/validator";
import { mapState } from "vuex";
export default {
  name: "childAdd",
  mixins: [sex, relation, wxHandle],
  data() {
    return {
      popupShow: false,
      startDate: new Date(),
      form: {
        openId: this.$store.state.user.info.openId,
        studentName: "",
        photo: "",
        birthday: "",
        address: "",
        sex: 1,
        tel: "",
        relation: 1
      }
    };
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType
    })
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
    handleSubmit() {
      let params = {
        openId: this.form.openId,
        imgIds: this.serverId
      };
      let { studentName, tel } = this.form;
      if (studentName == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (isPhone(tel)) {
        //如果有上传图片
        if (this.serverId.length) {
          //先上传图片ID给后端去下载图片
          service.imgIds(params).then(res => {
            if (res.errorCode === 0) {
              this.form.photo = res.data.paths;
              //提交保存
              service.addStudentWithOpen(this.form).then(res => {
                if (res.errorCode === 0) {
                  this.$router.go(-1);
                } else {
                  this.$toast(`${res.errorMsg}`);
                }
              });
            }
          });
        } else {
          this.addStudentWithOpen(this.form);
        }
      } else {
        this.$toast("请正确填写手机号");
      }
    },
    //添加孩子
    async addStudentWithOpen(params = {}) {
      let res = await service.addStudentWithOpen(params);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      } else {
        this.$toast(`${res.errorMsg}`);
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
