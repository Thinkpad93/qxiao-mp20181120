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
            <label class="label">学校名称</label>
          </div>
          <div class="cell-bd">
            <p>华南政工大学</p>
          </div>
        </div>
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">班级</label>
          </div>
          <div class="cell-bd">
            <p>一年级一班</p>
          </div>
        </div>
      </div>
      <div class="cells">
        <div class="cell min-h120">
          <div class="cell-hd">
            <label class="label">姓名</label>
          </div>
          <div class="cell-bd">
            <div class="cell-bd">
              <input class="input" placeholder="请输入姓名" maxlength="5" v-model="form.studentName">
            </div>
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
            <input
              class="input"
              type="number"
              pattern="[0-9]*"
              placeholder="请输入手机号"
              v-model="form.tel"
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
        <van-button type="info" size="large" class="no-radius" @click="handleSubmit">添加</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import dayjs from "dayjs";
import { sex, relation } from "@/mixins/type";
export default {
  name: "babyAdd",
  mixins: [sex, relation],
  data() {
    return {
      popupShow: false,
      minDate: new Date(1966, 10, 1),
      startDate: new Date(),
      form: {
        sex: 1,
        relation: 1
      }
    };
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
    handleConfirm(value) {},
    handleSubmit() {}
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
