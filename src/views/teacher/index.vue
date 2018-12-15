<template>
  <div class="page">
    <div class="page-hd">
      <a href="javascript:;" class="btn btn-primary">录入老师信息</a>
      <div class="">
        <a href="javascript:;" style="color:#409eff;" size-14>批量导入老师信息</a>
        <a href="javascript:;" style="color:#409eff;" size-14>批量邀请老师</a>
      </div>
    </div>
    <div class="page-bd">
      <div class="cells-title">老师列表(5)</div>
      <div class="cells">
        <div class="cell" v-for="(item, index) in 6" :key="index" @click="go(index)">
          <div class="cell-hd">
            <img class="teacher-icon" src="http://iph.href.lu/690x298" alt="">
          </div>
          <div class="cell-bd">
            <p>张一清</p>
            <small class="and" style="color:#bdbdbd;">小一班</small>
          </div>
          <div class="cell-ft">
            <span size-14 :class="index % 2 === 0 ? 'status': ''">未加入</span>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  name: "teacher",
  data() {
    return {};
  },
  methods: {
    go(index) {
      this.$router.push({ path: `/teacher/edit/${index}` });
    }
  }
};
</script>
<style lang="less" scoped>
.page-hd {
  height: 214px;
  background-color: #fff;
  a {
    width: 240px;
  }
}
.cells-title {
  color: #808080;
  font-size: 30px;
  margin: 20px 0;
  padding-left: 30px;
}
.cells {
  font-size: 34px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
}
.cell {
  padding: 20px 30px;
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
.cell-bd {
  flex: 1;
  padding-left: 20px;
}
.teacher-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.status {
  color: #ff87b7;
}
</style>
