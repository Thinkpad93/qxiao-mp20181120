<template>
  <div class="page">
    <template v-if="roleType == 3">
      <div class="page-hd" style="margin-bottom:0;">
        <img src="@/assets/image/baby_header_bg.png" alt>
        <div class="media-box media-box_appmsg flex">
          <div class="media-box__hd">
            <img class="media-box__thumb" :src="photo" :alt="patroarch.studentName">
          </div>
          <div class="media-box__bd">
            <h4 size-17 class="media-box__title">{{ patroarch.studentName }}</h4>
          </div>
        </div>
        <!-- <a href="javascript:void(0);" class="switch-children" @click="handleToBaby">
          <i></i>
          切换孩子
        </a>-->
      </div>
    </template>
    <div class="page-bd">
      <!-- 园长 -->
      <template v-if="roleType == 1 || roleType == 4">
        <div class="cells" style="margin-top: 10px;">
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校名称</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ leaderInfo.schoolName }}</p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">详细地址</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ leaderInfo.location }}</p>
            </div>
          </div>
        </div>
        <div class="cells" style="margin-top: 10px;">
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">姓名</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ leaderInfo.leaderName }}</p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">手机号</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ leaderInfo.tel }}</p>
            </div>
          </div>
          <div class="cell cell-switch">
            <div class="cell-hd">家长班级圈控制</div>
            <div class="cell-bd" style="text-align: right;">
              <van-switch
                v-model="leaderInfo.isOpen"
                size="28px"
                active-color="#92cd36"
                @change="handleChange"
              ></van-switch>
            </div>
          </div>
        </div>
        <a
          href="javascript:void(0);"
          style="color:#92cd36;margin:50px auto 0 auto;width:250px;display:block;"
          class="btn btn-white btn-large"
          @click="handleEditUser"
        >修改资料</a>
      </template>
      <!-- 老师 -->
      <template v-if="roleType == 2">
        <div class="cells" style="margin-top: 10px;">
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">头像</label>
            </div>
            <div class="cell-bd"></div>
            <div class="cell-ft">
              <p class="cell-p">
                <img class="user-icon" :src="photo" alt>
              </p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">姓名</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.teacherName }}</p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">性别</label>
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
              <label for class="label">手机号</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.tel }}</p>
            </div>
          </div>
        </div>
        <div class="cells" style="margin-top: 10px;">
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校名称</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.schoolName }}</p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校ID码</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.schoolCode }}</p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <label for class="label">学校地址</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ teacherInfo.location }}</p>
            </div>
          </div>
        </div>
        <a
          href="javascript:void(0);"
          style="color:#92cd36;margin:50px auto 0 auto;width:250px;display:block;"
          class="btn btn-white btn-large"
          @click="handleEditUser"
        >修改资料</a>
      </template>
      <!-- 家长 -->
      <template v-if="roleType == 3">
        <div class="cells" style="margin-top: 10px;">
          <div class="cell">
            <div class="cell-hd">
              <img src="@/assets/image/info-icon-1@2x.png" class="info-icon">
              <label for class="label">宝宝姓名</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ patroarch.studentName }}</p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <img src="@/assets/image/info-icon-2@2x.png" class="info-icon">
              <label for class="label">性别</label>
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
              <img src="@/assets/image/info-icon-3@2x.png" class="info-icon">
              <label for class="label">手机号码</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ patroarch.tel }}</p>
            </div>
          </div>
          <div class="cell">
            <div class="cell-hd">
              <img src="@/assets/image/info-icon-4@2x.png" class="info-icon">
              <label for class="label">和宝宝关系</label>
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
              <img src="@/assets/image/info-icon-5@2x.png" class="info-icon">
              <label for class="label">所在班级</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ patroarch.className }}</p>
            </div>
          </div>
        </div>
        <a
          href="javascript:void(0);"
          style="color:#92cd36;margin:50px auto 0 auto;width:250px;display:block;"
          class="btn btn-white btn-large"
          @click="handleEditUser"
        >修改资料</a>
      </template>
    </div>
    <div class="page-ft">
      <footer class="footer">
        <div class="item">
          <router-link to="/home">
            <i class="iconfont icon-shouyefill"></i>
            <div>首页</div>
          </router-link>
        </div>
        <div class="item">
          <template>
            <router-link to="/my">
              <i class="iconfont icon-yonghufill"></i>
              <div>我的</div>
            </router-link>
          </template>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { schoolType, sex } from "@/mixins/type";
import { mapState } from "vuex";
export default {
  name: "my",
  mixins: [schoolType, sex],
  data() {
    return {
      isOpen: true,
      leaderInfo: {},
      teacherInfo: {},
      patroarch: {},
      openId: this.$store.state.wx.openId,
      photo: this.$store.state.wx.photo
    };
  },
  computed: {
    ...mapState("users", {
      roleType: state => state.roleType
    }),
    ...mapState("student", {
      studentId: state => state.studentId
    })
  },
  methods: {
    handleToBaby() {
      this.$router.push({
        path: "/baby"
      });
    },
    //用户信息修改
    handleEditUser(role) {
      this.$router.push({ path: "/my/edit" });
    },
    handleChange() {
      let { schoolId, isOpen } = this.leaderInfo;
      this.updateIsOpen({ schoolId, isOpen });
    },
    async updateIsOpen(params = {}) {
      let res = await service.updateIsOpen(params);
    },
    //学生信息查询
    async studentQueryMe(params) {
      let res = await service.studentQueryMe(params);
      if (res.errorCode === 0) {
        this.patroarch = res.data;
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
<style lang="less">
.user-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px 0;
}
.media-box {
  color: #fff;
  font-size: 20px;
  position: absolute;
  z-index: auto;
  top: 50%;
  left: 40px;
  border: none;
  transform: translateY(-50%);
}
.media-box_appmsg {
  align-items: center;
}
.media-box__thumb {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.media-box__title {
  margin-left: 20px;
}

.info-icon {
  width: 64px;
  height: 64px;
  margin-right: 20px;
}
.switch-children {
  color: #fff;
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  height: 60px;
  padding: 0 30px;
  align-items: center;
  border-radius: 30px 0 0 30px;
  background-color: rgba(0, 0, 0, 0.3);
  transform: translateY(-50%);
}
</style>
