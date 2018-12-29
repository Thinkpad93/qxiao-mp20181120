<template>
  <div class="page">
    <div class="page-bd">
      <!-- 园长 -->
      <template v-if="roleType === 1 || roleType === 4">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校ID码</label>
            </div> 
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="leaderInfo.schoolCode">
            </div>                          
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校名称</label>
            </div>  
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="leaderInfo.schoolName">
            </div>                          
          </div>   
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校类型</label>
            </div>    
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="leaderInfo.schoolName">
            </div>     
          </div>   
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">详细地址</label>
            </div>    
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="leaderInfo.location">
            </div>                        
          </div>                          
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">园长姓名</label>
            </div>   
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="leaderInfo.leaderName">
            </div>                          
          </div>   
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">园长手机号</label>
            </div>  
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="leaderInfo.tel">
            </div>                           
          </div>                       
        </div>
      </template>
      <!-- 老师 -->
      <template v-if="roleType === 2 || roleType === 5">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">姓名</label>
            </div>  
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="teacherInfo.teacherName">
            </div>               
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">性别</label>
            </div>  
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="teacherInfo.sex">
            </div>               
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">手机号</label>
            </div>  
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="teacherInfo.tel">
            </div>              
          </div>          
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校名称</label>
            </div>  
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="teacherInfo.schoolName">
            </div>              
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校ID码</label>
            </div> 
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="teacherInfo.schoolCode">
            </div>               
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校地址</label>
            </div>    
            <div class="cell-bd">
              <input class="input" readonly maxlength="4" v-model="teacherInfo.location">
            </div>              
          </div>
        </div>
      </template>
    </div>
    <div class="page-ft">
      <div class="btn-area">
        <a href="javascript:;" class="btn btn-primary" @click="handleOut">退出</a>
      </div>      
      <qxfooter></qxfooter>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
import qxfooter from "@/components/footer";
import { schoolType } from "@/mixins/type";
import { mapGetters } from "vuex";
export default {
  name: "my",
  mixins: [schoolType],
  components: {
    qxfooter
  },
  data() {
    return {
      leaderInfo: {},
      teacherInfo: {},
      openId: this.$store.getters.openId
    };
  },
  computed: {
    ...mapGetters(["roleType"])
  },
  methods: {
    //退出登陆
    handleOut() {
      let confirmDom = this.$weui.confirm(
        "确定要退出登陆吗？",
        () => {
          console.log(true);
          this.$store.dispatch("account/logout").then(res => {
            location.reload();
          });
        },
        { title: "提示" }
      );
    },
    //查询老师信息-我的
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
    }
  }
};
</script>
<style lang="less">
</style>
