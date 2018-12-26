<template>
  <div class="page">
    <div class="page-bd">
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">幼儿园ID码</label>
          </div>      
          <div class="cell-bd">
            <input class="input" readonly maxlength="4" v-model="info.schoolCode">
          </div>  
        </div>        
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">幼儿园名称</label>
          </div>      
          <div class="cell-bd">
            <input class="input" readonly maxlength="4" v-model="info.schoolName">
          </div>  
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">幼儿园类型</label>
          </div> 
          <div class="cell-bd">  
            <select class="select" name="" dir="rtl" v-model="info.type">
              <option  :value="option.id" v-for="(option,index) in schoolTypeList" :key="index">{{ option.name }}</option>
            </select> 
          </div>              
        </div>       
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">详细地址</label>
          </div>    
          <div class="cell-bd">
            <input class="input" readonly maxlength="4" v-model="info.location">
          </div>                 
        </div>             
      </div>
      <div class="cells">
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">园长姓名</label>
          </div>  
          <div class="cell-bd">
            <input class="input" readonly maxlength="4" v-model="info.leaderName">
          </div>                      
        </div>
        <div class="cell">
          <div class="cell-hd">
            <label for="" class="label">园长手机号</label>
          </div>        
          <div class="cell-bd">
            <input class="input" readonly maxlength="4" v-model="info.tel">
          </div>                
        </div>
      </div>
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
export default {
  name: "my",
  mixins: [schoolType],
  components: {
    qxfooter
  },
  data() {
    return {
      info: {},
      openId: this.$store.getters.openId
    };
  },
  methods: {
    //退出登陆
    handleOut() {
      let confirmDom = this.$weui.confirm(
        "确定要退出登陆吗？",
        () => {
          console.log(true);
        },
        { title: "提示" }
      );
    },
    async queryInfo(openId) {
      let res = await service.queryInfo({ openId });
      if (res.errorCode === 0) {
        this.info = res.data;
      }
    }
  },
  mounted() {
    this.queryInfo(this.openId);
  }
};
</script>
<style lang="less" scoped>
.cells {
  margin-bottom: 20px;
  font-size: 34px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  padding: 0 30px;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
    z-index: 2;
  }
}
.cell-hd {
  line-height: 120px;
}
.cell-bd {
  flex: 1;
}
</style>
