<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells-title">基础信息修改</div>
      <!-- 园长 -->
      <template v-if="roleType === 1"></template>
      <!-- 老师 -->
      <template v-if="roleType === 2">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">姓名</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入老师姓名" maxlength="4" v-model="teacherInfo.teacherName">
            </div>
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">性别</label>
            </div>
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="teacherInfo.sex">
                <option :value="option.id" v-for="(option,index) in sexList" :key="index">{{ option.name }}</option>
              </select>
            </div>
          </div>          
        </div>
        <div class="btn-area">
          <a href="javascript:;" class="btn btn-primary" @click="handleSubmit(2)">保存</a>
        </div>        
      </template>
      <!-- 家长 -->
      <template v-if="roleType === 3">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学生姓名</label>
            </div>     
            <div class="cell-bd">
              <input class="input" placeholder="请输入学生姓名" maxlength="4" v-model="patroarch.studentName">
            </div>                   
          </div>
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">性别</label>
            </div>  
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="patroarch.sex">
                <option :value="option.id" v-for="(option,index) in sexList" :key="index">{{ option.name }}</option>
              </select>
            </div>                      
          </div>   
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">学生和家长关系</label>
            </div>  
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="patroarch.relation">
                <option :value="option.id" v-for="(option,index) in relationList" :key="index">{{ option.name }}</option>
              </select>
            </div>                      
          </div>                  
        </div>
        <div class="btn-area">
          <a href="javascript:;" class="btn btn-primary" @click="handleSubmit(3)">保存</a>
        </div>           
      </template>
    </div>  
  </div>  
</template>
<script>
import service from "@/api";
import { sex, relation } from "@/mixins/type";
import { mapGetters } from "vuex";
export default {
  name: "userEditor",
  mixins: [sex, relation],
  data() {
    return {
      leaderInfo: {},
      teacherInfo: {},
      patroarch: {},
      openId: this.$store.getters.openId
    };
  },
  computed: {
    ...mapGetters(["roleType"])
  },
  methods: {
    handleSubmit(index) {
      switch (index) {
        case 1:
          break;
        case 2:
          this.teacherInfoUpdate();
          break;
        case 3:
          this.studentInfoUpdate();
          break;
      }
    },
    //学生家长信息修改
    async studentInfoUpdate() {
      let { studentName, sex, relation } = this.patroarch;
      if (studentName == "") {
        this.$weui.topTips("请完善学生名称");
      } else {
        let obj = Object.assign(
          {},
          { studentName, sex, relation, openId: this.openId }
        );
        let res = await service.studentInfoUpdate(obj);
        if (res.errorCode === 0) {
          this.$weui.alert(
            "修改成功",
            () => {
              this.$router.go(-1);
            },
            { title: "提示" }
          );
        }
      }
    },
    //老师信息修改
    async teacherInfoUpdate() {
      let { teacherName, sex } = this.teacherInfo;
      if (teacherName == "") {
        this.$weui.topTips("请完善老师名称");
      } else {
        let obj = Object.assign({}, { teacherName, sex, openId: this.openId });
        let res = await service.teacherInfoUpdate(obj);
        if (res.errorCode === 0) {
          this.$weui.alert(
            "修改成功",
            () => {
              this.$router.go(-1);
            },
            { title: "提示" }
          );
        }
      }
    },
    //学生信息查询
    async studentQuery(params = {}) {
      let res = await service.studentQuery(params);
      if (res.errorCode === 0) {
        this.patroarch = res.data[0];
      }
    },
    //查询老师信息
    async queryTeacherInfo(openId) {
      let res = await service.queryTeacherInfo({ openId });
      if (res.errorCode === 0) {
        this.teacherInfo = res.data;
      }
    }
  },
  mounted() {
    if (this.roleType === 1) {
    } else if (this.roleType === 2) {
      this.queryTeacherInfo(this.openId);
    } else {
      this.studentQuery({ openId: this.openId, tel: "" });
    }
  }
};
</script>
<style lang="less">
</style>
