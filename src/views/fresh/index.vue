<template>
  <div class="page">
    <template v-if="roleType == 1 || roleType == 2 || roleType == 4">
      <div class="page-hd">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:void(0);" id="showDatePicker" @click="popupShow = true">
            <span>{{ className }}</span>
            <i class="iconfont icon-xiangxia1"></i>
          </a>
        </div>
      </div>
    </template>
    <div class="page-bd">
      <!-- -->
      <van-popup v-model="popupShow" position="bottom">
        <div class="popup-class">
          <div class="cells">
            <div class="cell popup-box" v-for="(p, index) in classList" :key="index">
              <div class="cell-hd">
                <img src="@/assets/image/kong.png" width="54" height="54">
              </div>
              <div class="cell-bd">
                <p>{{ p.className }}</p>
              </div>
              <div class="cell-ft">
                <van-radio-group v-model="classId">
                  <van-radio
                    :name="p.classId"
                    checked-color="#92cd36"
                    @click="handleClassConfirm(p)"
                  ></van-radio>
                </van-radio-group>
              </div>
            </div>
          </div>
        </div>
      </van-popup>
      <template v-if="roleType == 2">
        <router-link to="/fresh/add" class="release">
          <img src="@/assets/image/release-icon.png" alt>
        </router-link>
      </template>
      <figure
        class="figure figure-skin-two"
        v-for="(fresh, index) in freshData"
        :key="index"
        @touchstart="start(fresh, index)"
        @touchmove="move"
        @touchend="end(fresh)"
      >
        <div class="figure-bd">
          <div class="figure-info">
            <figcaption size-18 class="text-ellipsis">{{ fresh.title }}</figcaption>
            <div class="metedata flex">
              <time class="time">{{ fresh.postTime }}</time>
            </div>
            <div
              class="figure-thumb-medium"
              v-if="fresh.topImage"
              :style="{backgroundImage: `url(${fresh.topImage})`}"
            ></div>
            <p class="line-clamp">{{ fresh.textContent | brReplace }}</p>
          </div>
        </div>
        <div class="figure-ft">
          <div class="figure-icon">
            <i class="iconfont icon-chakan"></i>
            <b>{{ fresh.classReadCount }}</b>
          </div>
          <div class="figure-icon">
            <i class="iconfont icon-pinglun"></i>
            <b>{{ fresh.classCommentCount }}</b>
          </div>
        </div>
      </figure>
      <div class="empty" v-if="!freshData.length">
        <img src="@/assets/image/kong.png" alt>
        <p size-18>暂无新鲜速报</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { mapState } from "vuex";
import { scrollMixins } from "@/mixins/scroll";
export default {
  name: "fresh",
  mixins: [scrollMixins],
  data() {
    return {
      long: 0,
      time: 0,
      popupShow: false,
      className:
        this.$store.state.users.className || this.$route.query.className,
      classId: parseInt(this.$store.state.users.classId),
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.state.wx.openId || this.$route.query.openId,
        classId: this.$store.state.users.classId || this.$route.query.classId,
        studentId:
          this.$store.state.student.studentId || this.$route.query.studentId,
        page: 1,
        pageSize: 10
      },
      roleType: this.$store.state.users.roleType || this.$route.query.roleType,
      queryClass: {
        id: this.$store.state.users.id,
        roleType: this.$store.state.users.roleType || this.$route.query.roleType
      },
      freshData: []
    };
  },
  computed: {
    ...mapState("queryClass", {
      classList: state => state.classList
    })
  },
  filters: {
    brReplace(value) {
      if (!value) return "";
      return value.replace(/<br\/>/g, "");
    }
  },
  methods: {
    start(fresh, index) {
      this.long = 0;
      this.time = setTimeout(() => {
        this.long = 1;
        if (this.roleType == 2) {
          this.$dialog
            .confirm({
              title: "提示",
              message: "确定删除该条速报吗？"
            })
            .then(async () => {
              let obj = {
                openId: this.query.openId,
                freshId: fresh.freshId
              };
              //删除速报
              let res = await service.deleteFresh(obj);
              if (res.errorCode === 0) {
                this.freshData.splice(index, 1);
              }
            })
            .catch(() => {});
        }
      }, 500);
    },
    move() {
      clearTimeout(this.time);
      this.time = 0;
    },
    end(fresh) {
      clearTimeout(this.time);
      if (this.long == 0 && this.time != 0) {
        this.$router.push({
          path: "/fresh/show",
          query: {
            freshId: fresh.freshId,
            classId: fresh.classId,
            studentId: fresh.studentId
          }
        });
      }
      return false;
    },
    //选择班级
    handleClassConfirm(obj) {
      this.popupShow = false;
      this.className = obj.className;
      this.query.classId = obj.classId;
      this.freshQuery(this.query);
    },
    //加载分页数据
    handleLoadingMore(e) {
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      let bottom =
        document.body.offsetHeight - scrollTop - window.innerHeight <= 200;
      if (bottom && this.isLoading === false) {
        if (this.query.page < this.totalPage) {
          this.isLoading = true;
          this.query.page += 1;
          service.freshQuery(this.query).then(res => {
            if (res.errorCode === 0) {
              this.totalPage = res.data.totalPage;
              this.query.page = res.data.page;
              this.isLoading = false;
              let list = res.data.data;
              if (list.length) {
                list.forEach(element => {
                  this.freshData.push(element);
                });
              }
            }
          });
        }
      }
    },
    //删除速报
    async deleteFresh(params = {}) {
      let res = await service.deleteFresh(params);
      if (res.errorCode === 0) {
      }
    },
    //速报列表查询
    async freshQuery(params = {}) {
      let res = await service.freshQuery(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.isLoading = false;
        this.freshData = res.data.data || [];
      }
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length) {
      this.wxSdk.wxShare(this.roleType);
      this.$store.dispatch("users/reloadUserInfo", this.$route.query);
    }
    this.freshQuery(this.query);
  }
};
</script>
<style lang="less">
.page-hd {
  margin-bottom: 20px;
  background-color: #fff;
}
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>
