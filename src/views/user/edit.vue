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
              <input class="input" placeholder="请输入手机号" v-model="leaderInfo.tel" readonly>
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
              <input class="input" placeholder="请输入手机号" v-model="teacherInfo.tel" readonly>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校名称</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入学校名称" v-model="teacherInfo.schoolName" readonly>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校ID码</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入学校ID码" v-model="teacherInfo.schoolCode" readonly>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校地址</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入学校地址" v-model="teacherInfo.location" readonly>
            </div>
          </div>
        </div>
      </template>
      <!-- 家长 -->
      <template v-if="roleType == 3">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学生姓名</label>
            </div>
            <div class="cell-bd">
              <input
                class="input"
                placeholder="请输入学生姓名"
                maxlength="20"
                v-model="patroarch.studentName"
              >
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">手机号</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入手机号" v-model="patroarch.tel" readonly>
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">性别</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="patroarch.sex">
                <option
                  :value="option.id"
                  v-for="(option,index) in sexList"
                  :key="index"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for class="label">关系</label>
            </div>
            <div class="cell-bd">
              <select class="select" name dir="rtl" v-model="patroarch.relation">
                <option
                  :value="option.id"
                  v-for="(option,index) in relationList"
                  :key="index"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="flex-ft">
      <van-button type="info" size="large" class="no-radius" @click="handleSubmit">保存</van-button>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { sex, relation, schoolType } from "@/mixins/type";
import { mapState } from "vuex";
export default {
  name: "userEdit",
  mixins: [sex, relation, schoolType],
  data() {
    return {
      leaderInfo: {},
      teacherInfo: {},
      patroarch: {}
    };
  },
  computed: {
    ...mapState("user", {
      openId: state => state.info.openId,
      roleType: state => state.info.roleType,
      studentId: state => state.info.studentId
    })
  },
  methods: {
    handleSubmit() {
      if (this.roleType == 1 || this.roleType == 4) {
        this.updateSchool();
      } else if (this.roleType == 2) {
        this.teacherInfoUpdate();
      } else {
        this.studentInfoUpdate();
      }
    },
    //学生家长信息修改
    async studentInfoUpdate() {
      let { studentName, sex, relation, studentId } = this.patroarch;
      if (studentName == "") {
        this.$toast("请完善学生名称");
      } else {
        let obj = Object.assign(
          {},
          { studentName, sex, relation, openId: this.openId, studentId }
        );
        let res = await service.studentInfoUpdate(obj);
        if (res.errorCode === 0) {
          this.$router.go(-1);
        }
      }
    },
    //老师信息修改
    async teacherInfoUpdate() {
      let { teacherName, sex } = this.teacherInfo;
      if (teacherName == "") {
        this.$toast("请完善老师名称");
      } else {
        let obj = Object.assign({}, { teacherName, sex, openId: this.openId });
        let res = await service.teacherInfoUpdate(obj);
        if (res.errorCode === 0) {
          this.$router.go(-1);
        }
      }
    },
    //园长信息修改
    async updateSchool(params = {}) {
      let { schoolName, location, leaderName, type } = this.leaderInfo;
      if (schoolName == "") {
        this.$toast("请完善学校名称");
        return;
      }
      if (location == "") {
        this.$toast("详细地址");
        return;
      }
      if (leaderName == "") {
        this.$toast("请完善校长名称");
        return;
      }
      let obj = Object.assign(
        {},
        { schoolName, location, leaderName, type, openId: this.openId }
      );
      let res = await service.updateSchool(obj);
      if (res.errorCode === 0) {
        this.$router.go(-1);
      }
    },
    //学生信息查询
    async studentQueryMe(params = {}) {
      let res = await service.studentQueryMe(params);
      if (res.errorCode === 0) {
        this.patroarch = res.data;
      }
    },
    //查询老师信息
    async queryTeacherInfo(openId) {
      let res = await service.queryTeacherInfo({ openId });
      if (res.errorCode === 0) {
        this.teacherInfo = res.data;
      }
    },
    //查询管理信息
    async queryInfo(openId) {
      let res = await service.queryInfo({ openId });
      if (res.errorCode === 0) {
        this.leaderInfo = res.data;
      }
    }
  },
  mounted() {
    if (this.roleType == 1 || this.roleType == 4) {
      this.queryInfo(this.openId);
    } else if (this.roleType == 2) {
      this.queryTeacherInfo(this.openId);
    } else {
      this.studentQueryMe({ openId: this.openId, studentId: this.studentId });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
