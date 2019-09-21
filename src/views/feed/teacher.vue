<template>
  <div class="page">
    <div class="page-hd">
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="showDatePicker" @click="popupShow = true">
          <span>{{ className }}</span>
          <van-icon name="arrow-down" size="16px"></van-icon>
        </a>
      </div>
    </div>
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="classList"
          show-toolbar
          value-key="className"
          @cancel="popupShow = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>
      <!-- 新增 -->
      <template>
        <qxRelease url="/feed/add" />
      </template>
      <van-tabs v-model="active" :line-height="2" @click="handleTabClick">
        <van-tab title="我的接收"></van-tab>
        <van-tab title="我的发起"></van-tab>
      </van-tabs>
      <!-- list -->
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :offset="100"
        @load="onLoad"
      >
        <div class="feed-mod mt-20">
          <div class="feed" v-for="(item, index) in list" :key="index" @click="jump(item)">
            <div class="feed-hd flex a-i-c j-c-s-b">
              <div class="avatar flex a-i-c">
                <template v-if="active == 1">
                  <img
                    :src="item.teacherPhoto"
                    width="40"
                    height="40"
                    radius="50"
                    v-if="item.teacherPhoto"
                  />
                  <p class="ml-20">{{ item.teacherName }}</p>
                </template>
                <template v-if="active == 0">
                  <img
                    :src="item.studentPhoto"
                    width="40"
                    height="40"
                    radius="50"
                    v-if="item.studentPhoto"
                  />
                  <p class="ml-20">{{ item.studentName }}</p>
                </template>
              </div>
              <div class>
                <template v-if="active == 1">
                  <span style="color:#999">接收学生：{{ item.studentName }}</span>
                </template>
              </div>
            </div>
            <div class="feed-bd">
              <p v-html="item.title"></p>
            </div>
            <div class="feed-ft">
              <div class>
                <time>{{ item.postTime }}</time>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import qxRelease from "@/components/Release";
import classList from "@/mixins/classList";
import { mapState } from "vuex";
export default {
  name: "feedTeacher",
  mixins: [classList],
  components: {
    qxRelease
  },
  data() {
    return {
      popupShow: false,
      loading: false,
      finished: false,
      totalPage: 1, //总页数
      active: 0,
      query: {
        page: 1,
        pageSize: 10,
        teacherId: this.$store.state.user.info.id,
        classId: this.$store.state.user.info.classId
      },
      className: this.$store.state.user.info.className,
      list: []
    };
  },
  methods: {
    //tab切换
    handleTabClick(index) {
      this.query.page = 1;
      //当切换班级时，重新设置为没有全部加载完成
      this.finished = false;
      this.queryTeacherFeedList();
    },
    //选择班级确认
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.queryTeacherFeedList();
    },
    //加载更多
    onLoad() {
      console.log("onload");
      if (this.query.page < this.totalPage) {
        this.query.page += 1;
        let type = this.active == 0 ? 1 : 2;
        let obj = Object.assign({}, this.query, { type });
        service.queryTeacherFeedList(obj).then(res => {
          if (res.errorCode === 0) {
          }
        });
      } else {
        // 数据全部加载完成
        console.log("数据全部加载完成");
        this.loading = false;
        this.finished = true;
      }
    },
    //页面跳转
    jump(params = {}) {
      let type = this.active == 0 ? 1 : 2;
      this.$router.push({
        path: "/feed/view",
        query: {
          type,
          ...params
        }
      });
    },
    //查询老师端互动
    async queryTeacherFeedList() {
      let type = this.active == 0 ? 1 : 2;
      let obj = Object.assign({}, this.query, { type });
      let res = await service.queryTeacherFeedList(obj);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.query.page = res.data.page;
        this.totalPage = res.data.totalPage;
        this.list = res.data.data || [];
      }
    }
  },
  mounted() {
    this.queryTeacherFeedList();
  }
};
</script>
<style lang="less" scoped>
.feed {
  margin-bottom: 4px;
  position: relative;
  background-color: #fff;
  time {
    color: #999;
  }
  &-curr {
    //background-color: rgba(132, 206, 9, 0.1);
  }
  &-hd {
    padding: 30px 30px 0 30px;
  }
  &-bd {
    p {
      padding: 20px 30px;
      line-height: 1.4;
    }
    .time {
      padding: 0 30px;
      padding-bottom: 20px;
    }
    .meta {
      height: 85px;
      color: #999;
      padding: 0 20px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 1px;
        border-top: 1px solid #ededed;
        color: #e5e5e5;
        transform-origin: 0 0;
        transform: scaleY(0.5);
        z-index: 2;
      }
    }
  }
  &-ft {
    padding: 0 30px 20px 30px;
    .reply {
      margin-bottom: 10px;
      padding: 20px;
      border-radius: 8px;
      line-height: 1.4;
      background-color: rgba(51, 109, 146, 0.1);
    }
  }
}
</style>