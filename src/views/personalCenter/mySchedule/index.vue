
<template>
  <div class="page-mySchedule" style="position:relative">
    <table border="0" cellspacing="0" cellpadding="0" width="100%">
      <thead>
        <tr>
          <th style="background-color:#fff;">时间||星期</th>
          <th>星期一</th>
          <th>星期二</th>
          <th>星期三</th>
          <th>星期四</th>
          <th>星期五</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="firstcol">
            <p>第一节</p>
            <p>08:00-08:45</p>
          </td>
          <td>语文</td>
          <td>数学</td>
          <td>英语</td>
          <td>语文</td>
          <td>英语</td>
        </tr>
        <tr>
          <td class="firstcol">
            <p>第二节</p>
            <p>08:00-08:45</p>
          </td>
          <td>语文</td>
          <td>数学</td>
          <td>英语</td>
          <td>语文</td>
          <td>英语</td>
        </tr>
        <tr class="topline2px">
          <td class="firstcol">
            <p>第三节</p>
            <p>08:00-08:45</p>
          </td>
          <td>语文</td>
          <td>数学</td>
          <td>英语</td>
          <td>语文</td>
          <td>英语</td>
        </tr>
        <tr>
          <td class="firstcol">
            <p>第四节</p>
            <p>08:00-08:45</p>
          </td>
          <td>语文</td>
          <td>数学</td>
          <td>英语</td>
          <td>语文</td>
          <td>英语</td>
        </tr>
        <tr class="topline2px">
          <td class="firstcol">
            <p>第五节</p>
            <p>08:00-08:45</p>
          </td>
          <td>语文</td>
          <td>数学</td>
          <td>英语</td>
          <td>语文</td>
          <td>英语</td>
        </tr>
        <tr class="topline2px">
          <td class="firstcol">
            <p>第六节</p>
            <p>08:00-08:45</p>
          </td>
          <td>语文</td>
          <td>数学</td>
          <td>英语</td>
          <td>语文</td>
          <td>英语</td>
        </tr>
        <tr class="topline2px">
          <td class="firstcol">
            <p>第七节</p>
            <p>08:00-08:45</p>
          </td>
          <td>语文</td>
          <td>数学</td>
          <td>英语</td>
          <td>语文</td>
          <td>英语</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
th,
td {
  height: 100px;
  border-bottom: 1px solid #f0eaea;
  border-left: 1px solid #f0eaea;
  text-align: center;
  color: #666;
  font-weight: 500px;
}

.firstcol {
  p {
    &:nth-of-type(2) {
      font-size: 14px;
      color: #aaa;
      margin-top: 5px;
    }
  }
}
</style>
