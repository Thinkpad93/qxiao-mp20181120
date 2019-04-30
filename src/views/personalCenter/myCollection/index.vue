<style>
.page-collection {
  position: relative;
}
</style>

<template>
  <div class="page-collection">
    <ul class="collection_content" style="background:#fff">
      <li>
        <p>尽可能的增加孩子的阅读时间，这个十分关键,孩子的阅读能力的理解有助于....</p>
        <span>
          <van-icon name="cross"/>
        </span>
      </li>
      <li>
        <p>了解每个年龄阶段孩子的性格特点，才能正确的培养孩子</p>
        <div class="more_image">
          <img src="http://dummyimage.com/110x80" alt>
          <img src="http://dummyimage.com/110x80" alt>
          <img src="http://dummyimage.com/110x80" alt>
        </div>
        <span>
          <van-icon name="cross"/>
        </span>
      </li>

      <li>
        <div class="single_image">
          <img src="http://dummyimage.com/110x80" alt>
          <div>
            <p>【儿童性格培养】如何培养孩子的个性</p>
            <span>
              <van-icon name="cross"/>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
li {
  width: 95vw;
  margin: 0 auto;
  padding: 30px 0px;
  border-bottom: 1px solid #eee;
  p {
    font-size: 40px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-weight: 600;
  }
  span {
    display: flex;
    justify-content: flex-end;
    i {
      margin-top: 30px;
      margin-right: 20px;
    }
  }
  .more_image {
    margin-top: 20px;
  }
  .single_image {
    display: flex;
    img {
      margin-right: 20px;
    }
  }
}
</style>
