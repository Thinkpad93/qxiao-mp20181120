export default {
  data() {
    return {
      //echart
      homeOption: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          //type: 'scroll',
          //bottom: 10,
          data: []
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        series: []
      },
      stateMentOption: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        series: []
      }
    }
  }
}
