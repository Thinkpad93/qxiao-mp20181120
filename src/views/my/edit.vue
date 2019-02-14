<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells-title">基础信息修改</div>
      <!-- 园长 -->
      <template v-if="roleType == 1">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">姓名</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入园长名称" maxlength="4" v-model="leaderInfo.leaderName">
            </div>            
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校名称</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入学校名称" v-model="leaderInfo.schoolName">
            </div>            
          </div>    
          <div class="cell cell-select cell-select-after">
            <div class="cell-hd">
              <label for="" class="label">学校类型</label>
            </div>
            <div class="cell-bd">
              <select class="select" name="" dir="rtl" v-model="leaderInfo.type">
                <option :value="option.id" v-for="(option,index) in schoolTypeList" :key="index">{{ option.name }}</option>
              </select>              
            </div>            
          </div>     
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">详细地址</label>
            </div>
            <div class="cell-bd">
              <input class="input" placeholder="请输入详细地址" v-model="leaderInfo.location">
            </div>            
          </div>                          
        </div>
        <div class="btn-area">
          <a href="javascript:void(0);" class="btn btn-primary" @click="handleSubmit(1)">保存</a>
        </div>          
      </template>
      <!-- 老师 -->
      <template v-if="roleType == 2">
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
          <a href="javascript:void(0);" class="btn btn-primary" @click="handleSubmit(2)">保存</a>
        </div>        
      </template>
      <!-- 家长 -->
      <template v-if="roleType == 3">
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
          <a href="javascript:void(0);" class="btn btn-primary" @click="handleSubmit(3)">保存</a>
        </div>           
      </template>
    </div>  
  </div>  
</template>
<script>
import service from "@/api";
import { sex, relation, schoolType } from "@/mixins/type";
import { mapGetters } from "vuex";
export default {
  name: "userEditor",
  mixins: [sex, relation, schoolType],
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
          this.updateSchool();
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
        this.$toast("请完善学生名称");
      } else {
        let obj = Object.assign(
          {},
          { studentName, sex, relation, openId: this.openId }
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
        this.$toast("请完善园长名称");
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
    },
    //查询园长信息-我的
    async queryInfo(openId) {
      let res = await service.queryInfo({ openId });
      if (res.errorCode === 0) {
        this.leaderInfo = res.data;
      }
    }
  },
  mounted() {
    if (this.roleType === 1) {
      this.queryInfo(this.openId);
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
