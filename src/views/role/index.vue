<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="cells-title">基础信息修改</div>
      <!-- 园长 -->
      <template v-if="roleType == 1 || roleType == 4">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">姓名</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入园长名称"
                maxlength="20"
                v-model="leaderInfo.leaderName"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">手机号</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入手机号"
                v-model="leaderInfo.tel"
                readonly
                unselectable="on"
                @focus="this.blur()"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校名称</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入学校名称" v-model="leaderInfo.schoolName">
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">详细地址</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入详细地址" v-model="leaderInfo.location">
            </div>
          </div>
        </div>
      </template>
      <!-- 老师 -->
      <template v-if="roleType == 2">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">姓名</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入老师姓名"
                maxlength="20"
                v-model="teacherInfo.teacherName"
              >
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">性别</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="teacherInfo.sex">
                <option
                  :value="option.id"
                  v-for="(option,index) in sexList"
                  :key="index"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">手机号</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入手机号"
                v-model="teacherInfo.tel"
                readonly
                unselectable="on"
                @focus="this.blur()"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校名称</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入学校名称"
                v-model="teacherInfo.schoolName"
                readonly
                unselectable="on"
                @focus="this.blur()"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校ID码</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入学校ID码"
                v-model="teacherInfo.schoolCode"
                readonly
                unselectable="on"
                @focus="this.blur()"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校地址</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入学校地址"
                v-model="teacherInfo.location"
                readonly
                unselectable="on"
                @focus="this.blur()"
              >
            </div>
          </div>
        </div>
      </template>
      <!-- 家长 -->
      <template v-if="roleType == 3"></template>
    </div>
    <div class="flex-ft"></div>
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation, schoolType } from "@/mixins/type";
import { mapState } from "vuex";
export default {
  name: "role",
  data() {
    return {};
  },
  computed: {
    ...mapState("user", {
      openId: state => state.info.openId,
      roleType: state => state.info.roleType,
      studentId: state => state.info.studentId
    })
  }
};
</script>
<style lang="less" scoped>
</style>
