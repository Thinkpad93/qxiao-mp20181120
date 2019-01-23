<template>
  <div class="page">
    <div class="page-bd">
      <template v-if="albumData.length"></template>
      <template v-else>
        <!-- 空提示 -->
        <div class="empty">
          <img src="@/assets/image/kong.png" alt="">
          <p size-17>功能开发中</p>
        </div>        
      </template>
      <!-- <div class="album">
        <div class="cell" v-for="(album, index) in 3" :key="index">
          <figure class="figure">
            <div class="place"></div>
            <img src="@/assets/image/109951163721579973.jpg" alt="">
            <figcaption>
              <p>
                <span>小班</span>
                <span>小1班</span>
              </p>
              <p>80张</p>
            </figcaption>
          </figure>
        </div>
      </div> -->
    </div>
  </div>  
</template>
<script>
export default {
  name: "album",
  data() {
    return {
      albumData: []
    };
  }
};
</script>
<style lang="less">
</style>
