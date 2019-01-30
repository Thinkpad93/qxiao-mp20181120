<template>
  <div class="page">
    <div class="page-bd">
      <div class="album-view">

      </div>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "albumDetail",
  data() {
    return {
      query: {
        openId: this.$store.getters.openId,
        channelId: null
      }
      //albumChannel: []
    };
  },
  methods: {
    //查询班级所属的相册栏目
    async albumChannelDetail(params = {}) {
      let res = await service.albumChannelDetail(params);
      if (res.errorCode === 0) {
        //this.albumChannel = res.data;
      }
    }
  },
  mounted() {
    this.albumChannelDetail(this.query);
  }
};
</script>
<style lang="less">
</style>
