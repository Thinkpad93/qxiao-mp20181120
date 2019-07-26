import service from "@/api";
export default {
  data() {
    return {
      //echart
      homeOption: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          icon: "circle",
          itemWidth: 12,
          itemHeight: 12,
          data: []
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}星"
          }
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
          icon: "circle",
          itemWidth: 12,
          itemHeight: 12,
          data: []
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}星"
          }
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
  },
  methods: {
    //在家表现一周查询
    async homeStatQuery() {
      let params = {
        studentId: this.studentId,
        openId: this.openId,
        date: this.query.day
      };
      let res = await service.homeStatQuery(params);
      if (res.errorCode === 0) {
        let result = res.data;
        if (Object.keys(result).length) {
          this.homeOption.xAxis.data = result.day; //一周时间数据
          this.homeOption.legend.data = result.homeStar.map(item => item.name);
          this.homeOption.series = result.homeStar.map(item => {
            return {
              ...item,
              smooth: true
            };
          });
        }
      }
    },
    //课堂表现一周查询
    async stateMentList() {
      let params = {
        openId: this.openId,
        studentId: this.studentId
      };
      let res = await service.stateMentList(params);
      if (res.errorCode === 0) {
        let result = res.data;
        if (result.day.length) {
          this.stateMentOption.xAxis.data = result.day;
          this.stateMentOption.legend.data = result.lessonStar.map(
            item => item.name
          );
          this.stateMentOption.series = result.lessonStar.map(item => {
            return {
              ...item,
              smooth: true
            };
          });
        }
      }
    }
  },
}
