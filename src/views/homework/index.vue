
<template>
  <div class="page">
    <template v-if="roleType == 1 || roleType == 2 || roleType == 4">
      <div class="page-hd">
        <div class="button-sp-area flex" size-17>
          <a href="javascript:;" id="showDatePicker" @click="popupShow = true">
            <span>{{ className }}</span>
            <van-icon name="arrow-down" size="16px"></van-icon>
          </a>
        </div>
      </div>
    </template>
    <div class="page-bd">
      <!-- -->
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="classList"
          show-toolbar
          value-key="className"
          @cancel="popupShow = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>
      <template v-if="roleType == 2">
        <router-link to="/homework/add" class="release">
          <van-icon name="description" size="24px"></van-icon>
        </router-link>
      </template>
      <van-swipe-cell
        ref="swipeCell"
        :right-width="60"
        v-for="(homework, index) in homeworkData"
        :key="index"
        :disabled="roleType == 3"
        :on-close="onClose(homework, index)"
      >
        <van-cell-group>
          <figure class="figure figure-skin-two" @click="go(homework)">
            <div class="figure-bd">
              <div class="figure-info">
                <figcaption size-18 class="text-ellipsis">
                  <i v-if="!homework.status"></i>
                  <span>{{ homework.title }}</span>
                </figcaption>
                <div class="metedata flex">
                  <time class="time">{{ homework.postTime }}</time>
                </div>
                <div
                  class="figure-thumb-medium"
                  v-if="homework.topImage"
                  :style="{backgroundImage: `url(${homework.topImage})`}"
                ></div>
                <p class="line-clamp">{{ homework.textContent | brReplace }}</p>
              </div>
            </div>
            <div class="figure-ft">
              <div class="figure-icon">
                <van-icon name="eye-o" size="16px"></van-icon>
                <b>{{ homework.classReadCount }}</b>
              </div>
            </div>
          </figure>
        </van-cell-group>
        <span slot="right" style="line-height: 80px;">删除</span>
      </van-swipe-cell>
      <div class="empty" v-if="!homeworkData.length">
        <img src="@/assets/image/kong.png" alt>
        <p>暂无亲子作业</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import { scrollMixins } from "@/mixins/scroll";
export default {
  name: "homeWork",
  mixins: [scrollMixins],
  data() {
    return {
      long: 0,
      time: 0,
      popupShow: false,
      className: this.$route.query.className,
      isLoading: false,
      totalPage: 1, //总页数
      query: {
        openId: this.$store.state.user.info.openId,
        classId: this.$store.state.user.info.classId,
        studentId: this.$store.state.user.info.studentId,
        page: 1,
        pageSize: 10
      },
      roleType: this.$store.state.user.info.roleType,
      queryClass: {
        id: this.$store.state.user.info.id,
        roleType: this.$store.state.user.info.roleType,
      },
      homeworkData: [],
      classList: []
    };
  },
  filters: {
    brReplace(value) {
      if (!value) return "";
      return value.replace(/<br\/>/g, "");
    }
  },
  methods: {
    onClose(homework, index) {
      return (clickPosition, instance) => {
        switch (clickPosition) {
          case "right":
            this.$dialog
              .confirm({
                title: "提示",
                message: "确定删除该条作业吗？"
              })
              .then(async () => {
                let obj = {
                  openId: this.query.openId,
                  homeId: homework.homeId
                };
                //删除作业
                let res = await service.homeworkDelete(obj);
                if (res.errorCode === 0) {
                  instance.close();
                  this.homeworkData.splice(index, 1);
                }
              })
              .catch(() => {
                instance.close();
              });
            break;
        }
      };
    },
    go(homework) {
      let { classId, homeId, studentId, needConfirm } = homework;
      this.$router.push({
        path: "/homework/show",
        query: {
          classId,
          homeId,
          studentId,
          needConfirm,
        }
      });
    },
    //选择班级
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.homeworkQuery(this.query);
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
          service.homeworkQuery(this.query).then(res => {
            if (res.errorCode === 0) {
              this.totalPage = res.data.totalPage;
              this.query.page = res.data.page;
              this.isLoading = false;
              let list = res.data.data;
              if (list.length) {
                list.forEach(element => {
                  this.homeworkData.push(element);
                });
              }
            }
          });
        }
      }
    },
    //作业列表查询
    async homeworkQuery(params = {}) {
      let res = await service.homeworkQuery(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.isLoading = false;
        this.homeworkData = res.data.data;
      }
    },
    //根据角色查询班级
    async queryClassGroup() {
      let { id, studentId, roleType } = this.$route.query;
      let res = await service.queryClassId({ id, studentId, roleType });
      if (res.errorCode === 0) {
        this.classList = res.data;
      }
    }
  },
  mounted() {
    this.queryClassGroup();
    this.homeworkQuery(this.query);
  }
};
</script>
<style lang="less" scoped>
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>
