<template>
  <div class="page">
    <div class="page-bd">
      <!-- 园长 -->
      <template v-if="roleType === 1">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">头像</label>
            </div>
            <div class="cell-bd"></div>
            <div class="cell-ft">
              <img class="user-icon" :src="photo" alt="">
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校ID码</label>
            </div> 
            <div class="cell-bd">
              <p class="cell-p">{{ leaderInfo.schoolCode }}</p>
            </div>                          
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校名称</label>
            </div>  
            <div class="cell-bd">
              <p class="cell-p">{{ leaderInfo.schoolName }}</p>
            </div>                          
          </div>   
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校类型</label>
            </div>    
            <div class="cell-bd">
              <p class="cell-p">
                <template v-if="leaderInfo.type === 0">公办</template>
                <template v-else-if="leaderInfo.type === 1">私立</template>
                <template v-else>民办</template>
              </p>
            </div>     
          </div>   
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">详细地址</label>
            </div>    
            <div class="cell-bd">
              <p class="cell-p">{{ leaderInfo.location }}</p>
            </div>                        
          </div>                          
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">园长姓名</label>
            </div>   
            <div class="cell-bd">
              <p class="cell-p">{{ leaderInfo.leaderName }}</p>
            </div>                          
          </div>   
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">园长手机号</label>
            </div>  
            <div class="cell-bd">
              <p class="cell-p">{{ leaderInfo.tel }}</p>
            </div>                           
          </div>                       
        </div>
      </template>
      <!-- 老师 -->
      <template v-if="roleType === 2">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">头像</label>
            </div>
            <div class="cell-bd"></div>
            <div class="cell-ft">
              <p class="cell-p">
                <img class="user-icon" :src="photo" alt="">
              </p>
            </div>
          </div>          
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">姓名</label>
            </div>  
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.teacherName }}</p>
            </div>               
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">性别</label>
            </div>  
            <div class="cell-bd">
              <p class="cell-p">
                <template v-if="teacherInfo.sex === 1">男</template>
                <template v-else>女</template>
              </p>
            </div>               
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">手机号</label>
            </div>  
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.tel }}</p>
            </div>              
          </div>          
        </div>
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校名称</label>
            </div>  
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.schoolName }}</p>
            </div>              
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校ID码</label>
            </div> 
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.schoolCode }}</p>
            </div>               
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">学校地址</label>
            </div>    
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.location }}</p>
            </div>              
          </div>
        </div>
      </template>
      <!-- 家长 -->
      <template v-if="roleType === 3">
        <div class="cells">
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">宝宝姓名</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ patroarch.studentName }}</p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">性别</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">
                <template v-if="patroarch.sex === 1">男</template>
                <template v-else>女</template>                
              </p>
            </div>            
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">手机号码</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ patroarch.tel }}</p>
            </div>            
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">和宝宝关系</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">
                <template v-if="patroarch.relation === 1">妈妈</template>
                <template v-else-if="patroarch.relation === 2">爸爸</template>
                <template v-else-if="patroarch.relation === 3">爷爷</template>
                <template v-else-if="patroarch.relation === 4">奶奶</template>
                <template v-else-if="patroarch.relation === 5">外公</template>
                <template v-else>外婆</template>
              </p>
            </div>            
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for="" class="label">所在班级</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ patroarch.className }}</p>
            </div>            
          </div>          
        </div>
      </template>
    </div>
    <div class="page-ft">
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
      patroarch: {},
      openId: this.$store.getters.openId,
      photo: this.$store.getters.photo
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
    //学生信息查询
    async studentQuery(openId) {
      let res = await service.studentQuery({ openId });
      if (res.errorCode === 0) {
        this.patroarch = res.data[0];
      }
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
    } else {
      this.studentQuery(this.openId);
    }
  }
};
</script>
<style lang="less">
.user-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px 0;
}
</style>
