<template>
  <div class="page">
    <div class="page-bd">
      <article class="article">
        <h1 size-24>让我做一个好人吧</h1>
        <div class="article-head flex">
          <div class="article-cell">
            <img src="@/assets/image/109951163721579973.jpg" alt="">
          </div>
          <div class="article-cell">
            <p>刘家明(园长)</p>
            <time style="color:#8d8d8d;">09-22</time>            
          </div>
        </div>
        <section size-16 class="article-content">
          <p>亲爱的家长朋友们：</p>
          <p>
             根据《国务院办公厅关于2018年部分节假日安排的通知》（国办发明电〔2017〕12号）文件精神，现将2018年中秋节学校放假安排通知如下：  
          </p>
          <p> 
		        9月22日（周六）至9月24日（周一，中秋节）放假3天，9月25日（周二）正常上班上课。
		        请各单位安排好放假期间的值班、安全保卫等工作，做好应对各类突发事件的预案。如遇有重大突发事件，要按规定及时报告并妥善处理。
          </p>
          <p>
            <img src="http://iph.href.lu/690x298" alt="">
          </p>
          <p>
            请各单位安排好放假期间的值班、安全保卫等工作，做好应对各类突发事件的预案。如遇有重大突发事件，要按规定及时报告并妥善处理。
          </p>
          <p>
            1969年，在周星驰7岁的时候，他的父母正式离异。于是，周星驰和姐姐周文姬、妹妹周星霞一起在母亲凌宝儿的抚养下成长 [22] 。
            周星驰在学校成绩并不好，偏科，除了语文，其它科目成绩都不怎样，老师称赞周星驰画画不错。 
            [21] 周星驰中学就读于香港圣玛利奥英文书院。在中学毕业以后，他做过两个月的办公室助理
          </p>
        </section>
      </article>
      <div class="cells-title">班级阅读情况</div>
      <div class="cells">
        <div class="tab">
          <a href="javascript:;" class="curr" @click="handleTabClick">已读</a>
          <a href="javascript:;" @click="handleTabClick">未读</a>
        </div>
        <div class="tab-content">
          <div class="item">
            <div class="cell" v-for="(t, index) in 4" :key="index">
              <div class="cell-hd">
                <img class="icon" src="@/assets/image/109951163721579973.jpg" alt="">
              </div>
              <div class="cell-bd">
                <p>李明敏</p>
              </div>
              <div class="cell-ft">
                <span :style="{ color: index % 2 === 0 ? '#92cd36': '#ff87b7'}">未确认通知</span>
              </div>
            </div>
          </div>
          <div class="item"></div>
        </div>
      </div>
    </div>  
  </div>  
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    handleTabClick() {}
  }
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
.article-head {
  align-items: center;
  .article-cell {
    margin-right: 20px;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.article-content {
  text-align: justify;
  p {
    margin: 20px 0;
    line-height: 1.4;
  }
  img {
    max-width: 100%;
  }
}
.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.tab {
  display: flex;
  font-size: 30px;
  background-color: #fff;
  a {
    height: 100px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .curr {
    color: #92cd36;
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      display: block;
      width: 50%;
      height: 4px;
      background-color: #92cd36;
      transform: translateX(-50%);
    }
  }
}
.tab-content {
  .cell {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
