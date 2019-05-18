<template>
  <div class="flex-page">
    <div class="flex-bd">
      <!-- <div class="cells">
        <div class="cell min-h160 role-item" v-for="(item, index) in roleList" :key="index">
          <div class="cell-bd">
            <div class="flex a-i-c">
              <template v-if="item.roleType == 1 || roleType == 1">
                <img src="@/assets/teacher@2x.png" width="50" height="50" radius="50">
              </template>
              <template v-if="item.roleType == 2">
                <img src="@/assets/teacher@2x.png" width="50" height="50" radius="50">
              </template>
              <template v-if="item.roleType == 3">
                <img src="@/assets/family@2x.png" width="50" height="50" radius="50">
              </template>
              <strong>{{ item.name }}</strong>
            </div>
          </div>
          <div class="cell-ft">
            <van-radio-group v-model="roleType">
              <van-radio :name="item.roleType" checked-color="#92cd36"/>
            </van-radio-group>
          </div>
        </div>
      </div>-->
      <div class="role-box flex a-i-c j-c-c">
        <div class="role-list">
          <div
            class="item"
            v-for="(item, index) in roleList"
            :key="index"
            @click="changeRole(item)"
          >
            <div>
              <img src="@/assets/teacher@2x.png" v-if="item.roleType == 2">
              <img src="@/assets/family@2x.png" v-else>
            </div>
            <p>{{ item.roleType == 2 ? "我是老师": "我是家长" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import service from "@/api";
import { mapState } from "vuex";
export default {
  name: "roelSelect",
  data() {
    return {
      roleList: [],
      roleType: parseInt(this.$store.state.user.info.roleType)
    };
  },
  computed: {
    ...mapState("user", {
      openId: state => state.info.openId
    })
  },
  methods: {
    changeRole(item) {
      console.log(item);
      //如果要切换的角色是当前角色，则不切换
      if (item.roleType == this.roleType) {
        this.$router.go(-1);
        return;
      }
      let _cookie = Cookies.getJSON("info");
      let single = this.roleList.find(item => item.roleType != this.roleType);
      let { id, roleType, classId, className, studentId, name } = single;
      let obj = Object.assign({}, _cookie, {
        id,
        roleType,
        classId,
        className,
        studentId,
        name
      });
      this.$store.dispatch("user/setInfo", obj).then(data => {
        if (data.success === "ok") {
          this.$router.go(-1);
        }
      });
    },
    //多角色列表
    async queryRole(params = {}) {
      let res = await service.queryRole(params);
      if (res.errorCode === 0) {
        this.roleList = res.data;
      }
    }
  },
  mounted() {
    this.queryRole({ openId: this.openId });
  }
};
</script>
<style lang="less" scoped>
.role-box {
  min-height: 100vh;
  background-color: #84ce09;
  .item {
    color: #fff;
    font-size: 32px;
    text-align: center;
    position: relative;
    p {
      padding-top: 30px;
    }
    img {
      width: 284px;
      height: 284px;
    }
    &:last-child {
      margin-top: 100px;
    }
  }
}
.role-item {
  strong {
    font-weight: normal;
    display: inline-block;
    margin-left: 30px;
  }
}
</style>
