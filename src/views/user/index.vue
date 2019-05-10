<template>
  <div class="page">
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker></van-picker>
      </van-popup>
      <div class="user-info flex a-i-c">
        <router-link to="/child/add" tag="div" class="switch-children">添加孩子</router-link>
        <div class="avatar">
          <img :src="photo" width="50" height="50" radius="50">
        </div>
        <!-- <router-link to="/personData" tag="div" class="avatar">
          <img :src="photo" width="50" height="50" radius="50">
        </router-link>-->
        <div class="info-box ml-30">
          <div class="flex a-i-c">
            <h3 size-17 class="username pr-20" v-if="openStudentName">{{ openStudentName }}</h3>
            <van-tag type="danger" @click="tagClick">{{ showRoleTypeText }}</van-tag>
          </div>
          <div class="info-meta flex pt-20">
            <div class="mr-10">Q星: {{ statrCount }}</div>
            <!-- <div class="mr-10">积分: 800</div> -->
          </div>
        </div>
      </div>
      <!-- 孩子列表 -->
      <!-- <div class="cells-title">孩子列表</div> -->
      <van-radio-group v-model="openStudentId">
        <van-cell-group>
          <van-cell
            :title="item.openStudentName"
            clickable
            v-for="(item, index) in studentList"
            :key="index"
            @click="openStudentId = item.openStudentId"
          >
            <van-radio :name="item.openStudentId" checked-color="#92cd36"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!-- 孩子列表 -->
      <div class="snail flex a-i-c j-c-s-b">
        <div class="snail-left flex a-i-c">
          <img src="@/assets/snail-icon@2x.png" alt width="20" height="20">
          <div class="ml-10">竞争力(广州)</div>
        </div>
        <div class="snail-right flex a-i-c">
          <span class="mr-10">60</span>
          <img src="@/assets/arrow-up@2x.png" alt width="8" height="18">
        </div>
      </div>

      <router-link to="/myPersonality">
        <van-cell title="我的个性计划" is-link></van-cell>
      </router-link>
      <router-link to="/myStudy">
        <van-cell title="我的学习计划" is-link></van-cell>
      </router-link>
      <router-link to="/works">
        <van-cell title="我的作品" is-link></van-cell>
      </router-link>
      <router-link to="/myBraclet">
        <van-cell title="我的手环" is-link></van-cell>
      </router-link>
      <router-link to="/collection">
        <van-cell title="我的收藏" is-link></van-cell>
      </router-link>
      <router-link to="/myDownload">
        <van-cell title="我的下载" is-link></van-cell>
      </router-link>
      <router-link to="/mySchedule">
        <van-cell title="我的课表" is-link></van-cell>
      </router-link>
      <router-link to="/helpCenter">
        <van-cell title="帮助中心" is-link></van-cell>
      </router-link>
    </div>
    <div class="page-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import qxFooter from "@/components/Footer";
import { mapState } from "vuex";
export default {
  name: "user",
  components: {
    qxFooter
  },
  data() {
    return {
      popupShow: false,
      statrCount: 0,
      openStudentId: parseInt(this.$store.state.user.info.openStudentId),
      query: {
        studentId: this.$store.state.user.info.openStudentId,
        openId: this.$store.state.user.info.openId
      },
      roleList: [],
      studentList: []
    };
  },
  computed: {
    ...mapState("user", {
      openStudentName: state => state.info.openStudentName,
      photo: state => state.info.photo,
      openId: state => state.info.openId,
      roleType: state => state.info.roleType
    }),
    showRoleTypeText() {
      let text = "";
      if (this.roleType == 1) {
        text = "校长";
      } else if (this.roleType == 2) {
        text = "老师";
      } else if (this.roleType == 3 || this.roleType == 9) {
        text = "家长";
      } else {
        text = "管理员";
      }
      return text;
    }
  },
  watch: {
    //学生切换
    openStudentId(news, old) {
      let roleType = this.roleType;
      let _cookie = Cookies.getJSON("info");
      let single = this.studentList.find(item => item.openStudentId === news);
      let obj = null;
      if (roleType == 3 || roleType == 9) {
        obj = Object.assign({}, _cookie, single);
      } else {
        let { openStudentId, openStudentName } = single;
        obj = Object.assign({}, _cookie, { openStudentId, openStudentName });
      }
      this.$store.dispatch("user/setInfo", obj).then(data => {
        if (data.success === "ok") {
        }
      });
    }
  },
  methods: {
    //角色切换
    tagClick() {
      //只有一种角色
      if (this.roleList.length === 1 && this.roleList[0].roleType == 3) {
        return;
      }
      let _cookie = Cookies.getJSON("info");
      //选择要切换的角色
      let single = this.roleList.find(item => item.roleType != this.roleType);
      let { id, roleType, classId, className, studentId } = single;
      let obj = null;
      if (this.roleType != 9) {
        obj = Object.assign({}, _cookie, {
          id,
          roleType,
          classId,
          className,
          studentId
        });
      } else {
        obj = Object.assign({}, _cookie, { id, roleType });
      }
      this.$store.dispatch("user/setInfo", obj).then(data => {
        if (data.success === "ok") {
          //toast.clear();
        }
      });
    },
    //多角色列表
    async queryRole(params = {}) {
      let res = await service.queryRole(params);
      if (res.errorCode === 0) {
        this.roleList = res.data;
      }
    },
    //查询学生列表--开放版
    async queryOpenStudentList(params = {}) {
      let res = await service.queryOpenStudentList(params);
      if (res.errorCode === 0) {
        this.studentList = res.data;
      }
    },
    //获取可兑换星星数
    async queryTotalCountStar(params = {}) {
      let res = await service.queryTotalCountStar(params);
      if (res.errorCode === 0) {
        this.statrCount = res.data.totalCountStar;
      }
    }
  },
  mounted() {
    this.queryRole({ openId: this.openId });
    this.queryOpenStudentList({ openId: this.openId });
    this.queryTotalCountStar(this.query);
  }
};
</script>
<style lang="less" scoped>
.user-info {
  color: #fff;
  position: relative;
  height: 220px;
  padding-left: 30px;
  background-image: url("~@/assets/user-center-bg@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.snail {
  height: 80px;
  width: calc(100% - 60px);
  margin: 30px auto;
  padding: 0 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 20px 0 rgba(204, 204, 204, 0.3);
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
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-50%);
}
</style>

