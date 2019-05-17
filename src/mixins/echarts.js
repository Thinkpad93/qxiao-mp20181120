export default {
  data() {
    return {
      //echart
      homeOption: {
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
            areaStyle: {}
          },
          {
            data: [],
            type: "line",
            name: "班级平均值",
            stack: "总量",
            smooth: true,
            areaStyle: {}
          }
        ]
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
            areaStyle: {}
          },
          {
            data: [],
            type: "line",
            name: "班级平均值",
            stack: "总量",
            smooth: true,
            areaStyle: {}
          }
        ]
      }
    }
  }
}
