<template>
  <div class="page">
    <div class="page-hd">
      <!-- 班级选择菜单 -->
      <div class="classId flex a-i-c j-c-s-b">
        <p>班级</p>
        <div @click="popupShow = true">
          <span class="mr-10">{{ className }}</span>
          <van-icon name="arrow-down" size="16px"></van-icon>
        </div>
      </div>
      <!-- 班级选择菜单 -->
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
      <div class="list" v-if="list.length">
        <div class="flex f-w-w" style="margin-left: -10px; margin-right: -10px;">
          <div class="suni" v-for="(item, i) in list" :key="i">
            <div class="suni-thumb">
              <img :src="item.imageUrl" alt>
            </div>
            <div class="suni-meta">
              <p>{{ item.studentName }}</p>
              <time>{{ item.postTime }}</time>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-else>
        <img src="@/assets/kong.png" alt>
        <p class="mt-30">暂无学生作品~</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@/api";
import classList from "@/mixins/classList";
export default {
  name: "worksTeacher",
  mixins: [classList],
  data() {
    return {
      popupShow: false,
      query: {
        classId: this.$store.state.user.info.classId,
        page: 1,
        pageSize: 20
      },
      list: []
    };
  },
  computed: {
    className: {
      get() {
        return this.$store.state.user.info.className;
      },
      set(newValue) {
        return (this.$store.state.user.info.className = newValue);
      }
    }
  },
  methods: {
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.queryWorkStudent(this.query);
    },
    //学生作品
    async queryWorkStudent(params = {}) {
      let res = await service.queryWorkStudent(params);
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.list = res.data.data || [];
      }
    }
  },
  mounted() {
    this.queryWorkStudent(this.query);
  }
};
</script>
<style lang="less" scoped>
.classId {
  background-color: #fff;
}
.list {
  padding: 0 30px 30px 30px;
}
.suni {
  width: 50%;
  padding: 0 20px;
  margin-bottom: 30px;
  &-meta {
    margin-top: 10px;
    font-size: 32px;
    time {
      font-size: 24px;
      color: #999;
    }
  }
  &-thumb {
    height: 310px;
    position: relative;
    padding-bottom: 100%;
    overflow: hidden;
    background-color: #e4f1ff;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
