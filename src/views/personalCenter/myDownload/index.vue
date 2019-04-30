<style>
.page-collection {
  position: relative;
}
</style>

<template>
  <div class="page-collection">
    <ul class="collection_content" style="background:#fff">
      <li>
        <div class="single_image">
          <img src="http://dummyimage.com/110x80" alt>
          <div>
            <p>华南师范大学附属小学</p>
            <a>一年级上学期语文期末考试</a>
            <span>
              <button>上传成绩</button>
              <van-icon name="cross"/>
            </span>
          </div>
        </div>
      </li>
      <li>
        <div class="single_image">
          <img src="http://dummyimage.com/110x80" alt>
          <div>
            <p>广州市天河区华阳小学</p>
            <a>一年级上学期语文期末考试</a>
            <span>
              <button>上传成绩</button>
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
    font-size: 30px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-weight: 600;
  }
  a {
    display: block;
    color: #aaa;
    margin-top: 20px;
    font-size: 20px;
  }
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    button {
      background: #2dbef8;
      color: #fff;
      border-radius: 30px;
      padding: 8px 20px;
      border: none;
      font-size: 12px;
    }
  }
  .single_image {
    display: flex;
    img {
      margin-right: 20px;
    }
    div {
      flex: 1;
    }
  }
}
</style>

