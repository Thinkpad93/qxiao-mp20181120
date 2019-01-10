<template>
  <div class="page">
    <div class="page-bd">
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
    return {};
  }
};
</script>
<style lang="less">
.album {
  display: flex;
  padding: 30px 30px 0 30px;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
}
.cell {
  margin-bottom: 30px;
}
.figure {
  width: 312px;
  height: 312px;
  overflow: hidden;
  position: relative;
  .place {
    width: 100%;
    padding-top: 125%;
  }
  figcaption {
    padding: 40px 0;
    text-align: center;
    font-size: 36px;
    color: #fff;
    left: 0;
    top: 50%;
    width: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    transform: translateY(-50%);
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
