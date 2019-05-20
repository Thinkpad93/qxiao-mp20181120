<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- <p>{{ startDate }}</p> -->
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
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleSubmit">保存修改</van-button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import dayjs from "dayjs";
import { sex, relation } from "@/mixins/type";
import { isPhone } from "@/utils/validator";
export default {
  name: "childEdit",
  mixins: [sex, relation],
  data() {
    return {
      popupShow: false,
      form: {},
      query: {
        openId: this.$store.state.user.info.openId,
        studentId: this.$route.query.openStudentId
      }
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
    async handleSubmit() {
      console.log(this.form);
      let { studentName, address } = this.form;
      if (studentName == "") {
        this.$toast("请输入姓名");
        return;
      }
      if (address == "") {
        this.$toast("请输入地址");
        return;
      }
      let res = await service.studentInfoUpdate(this.form);
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
    }
  },
  mounted() {
    this.studentQueryMe(this.query);
  }
};
</script>
<style lang="less" scoped>
</style>
