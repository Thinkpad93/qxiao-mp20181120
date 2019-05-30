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
          // axisLabel: {
          //   showMinLabel: true,
          //   showMaxLabel: false
          // }
        },
        yAxis: {
          type: "value",
          // axisLabel: {
          //   showMinLabel: true,
          //   showMaxLabel: false
          // }
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
          data: ["个人表现", "班级平均值"]
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
        series: [{
            data: [],
            type: "line",
            name: "个人表现",
            stack: "总量",
            smooth: true,
          },
          {
            data: [],
            type: "line",
            name: "班级平均值",
            stack: "总量",
            smooth: true,
          }
        ]
      }
    }
  }
}
