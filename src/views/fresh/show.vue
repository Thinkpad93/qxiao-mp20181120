<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>大班组KC3《跳房子》游戏活动</h1>
        <section size-16 class="article-content">
          <p>
            <img src="http://iph.href.lu/690x298" alt="">
          </p>
          <p>活动目标</p>
          <p>
            1.展幼儿投准，单脚跳跃动作，增强幼儿腿部力量，提高幼儿平衡能力。
          </p>
          <p>
            2.培养幼儿参与意识，竞争意识，规则意识。 活动准备
          </p>
          <p>
            1.在场地上画好格子当作房子。
          </p>
        </section>
      </article>
    </div>
  </div>  
</template>
<script>
import service from "@/api";
export default {
  name: "freshShow",
  data() {
    return {
      query: {
        freshId: null,
        classId: null
      }
    };
  },
  methods: {
    //速报详情
    async freshDetail(params = {}) {
      let res = await service.freshDetail(params);
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.article {
  padding: 30px 30px 10px 30px;
  word-wrap: break-word;
  background-color: #fff;
  h1 {
    margin-bottom: 20px;
  }
}
</style>
