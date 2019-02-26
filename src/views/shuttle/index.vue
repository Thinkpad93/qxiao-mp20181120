<template>
  <div class="page">
    <div class="page-hd">
      <audio
        id="player"
        ref="audioRef"
        :src="playUrl"
        @ended="handleEnded"
        @playing="handlePlaying"
        @pause="handlePause"
      ></audio>
      <div class="shuttle-sp-area flex">
        <a href="javascript:;" @click="popupShow = true">
          <span>{{ className }}</span>
          <i class="iconfont icon-xiangxia1"></i>
        </a>
        <!-- <div @click="handlePlayAudio">
          <span>{{ playBoolean ? '暂停':'播放' }}</span>
        </div>-->
      </div>
    </div>
    <div class="page-bd">
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          :columns="classList"
          show-toolbar
          value-key="className"
          @cancel="popupShow = false"
          @confirm="handleClassConfirm"
        ></van-picker>
      </van-popup>
      <template>
        <div class="table">
          <div class="table-head">
            <div class="tr">
              <div class="th">
                <i style="background-color:#92cd36;"></i>
                <span size-14>已打卡</span>
              </div>
              <div class="th">
                <i style="background-color:#e5e5e5;"></i>
                <span size-14>未打卡</span>
              </div>
            </div>
          </div>
          <div class="table-body">
            <div class="tr">
              <div
                class="td"
                :class="[item.clockFlag ? 'td-success': 'td-default']"
                v-for="(item, index) in classClockData"
                :key="index"
              >
                <div>
                  <img :src="item.photo" v-if="item.photo">
                  <div class="icon-d" v-else></div>
                  <div class>
                    <span>{{ item.studentName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cells" style="margin-top:15px;">
          <div class="cell" v-for="(item, index) in shuttleData" :key="index">
            <div class="cell-hd">
              <label for class="label">{{ item.studentName }}</label>
            </div>
            <div class="cell-bd">
              <p class="cell-p">{{ item.postTime }}</p>
            </div>
            <div class="cell-ft"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import service from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "shuttle",
  data() {
    return {
      popupShow: false,
      className: this.$store.getters.className,
      query: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId,
        date: moment().format("YYYY-MM-DD") //获取当前年月日
      },
      shuttleData: [],
      classClockData: [],
      playBoolean: false,
      playIndex: 0, //播放起始位置为0
      playUrl: "", //播放url
      playList: [], //音频列表
      playNumber: 1, //默认播放次数为1
      playMax: 2 //每条语音最多播放次数
    };
  },
  watch: {
    //audio的url, 如果有变化则重新播放
    playUrl(newPlaying, oldPlaying) {
      const audio = this.$refs.audioRef;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  },
  computed: {
    ...mapGetters(["classList"])
  },
  methods: {
    handleClassConfirm(value, index) {
      this.className = value.className;
      this.query.classId = value.classId;
      this.classClockQuery();
      this.realShuttle(this.query);
    },
    //播放开始事件
    handlePlaying(e) {},
    //播放暂停事件
    handlePause(e) {},
    //播放结束事件
    handleEnded(e) {
      if (this.playNumber === this.playMax) {
        //单条语音播放次数达到
        setTimeout(() => {
          this.playNumber = 1;
          this.playIndex++;
          if (this.playIndex < this.playList.length) {
            this.playUrl = this.playList[this.playIndex].url;
          } else {
            //全部语音已经播放完
            this.playIndex = 0;
            this.playUrl = "";
            this.playBoolean = false;
            //重新请求
            this.classClockQuery();
            this.realShuttle(this.query);
          }
        }, 1000);
      } else {
        this.playNumber++;
        this.$refs.audioRef.play();
      }
    },
    handlePlayAudio() {
      //设置第一条开始播放
      let audio = this.$refs.audioRef;
      if (audio.paused) {
        this.playBoolean = true;
        this.playUrl = this.playList[this.playIndex].url;
        audio.play();
      } else {
        this.playBoolean = false;
        audio.pause();
      }
    },
    //实时接送接口 返回语音播报
    async realShuttle(params = {}) {
      let res = await service.realShuttle(params);
      if (res.errorCode === 0) {
        if (res.data.length) {
          this.shuttleData = res.data;
          //保存音频url
          this.playList = this.shuttleData.map(item => {
            return { url: item.url };
          });
          //设置第一条开始播放
          this.playUrl = this.playList[this.playIndex].url;
        } else {
          //如果没有数据返回，说明还没有到打卡时间
        }
      }
    },
    //查询班级当天打卡记录
    async classClockQuery() {
      let { openId, classId } = this.query;
      let res = await service.classClockQuery({ openId, classId });
      if (res.errorCode === 0) {
        this.popupShow = false;
        this.classClockData = res.data;
      }
    }
  },
  mounted() {
    this.classClockQuery();
    this.realShuttle(this.query);
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>
<style lang="less">
.shuttle-sp-area {
  color: #9cd248;
  height: 100px;
  padding: 0 30px;
  justify-content: space-between;
  align-items: center;
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 150px;
    color: #fff;
    border-radius: 30px;
    background-color: #9cd248;
    span {
      margin-right: 20px;
    }
  }
}
.table {
  background-color: #fff;
  .tr {
    display: flex;
    flex-wrap: wrap;
  }
}
.table-head {
  padding: 24px 0;
  .th {
    flex: 1;
    text-align: center;
    font-size: 0;
    i {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      vertical-align: top;
    }
  }
}
.table-body {
  .td {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 200px;
    position: relative;
    text-align: center;
    color: #fff;
    background-color: #fff;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      bottom: 0;
      border-left: 1px solid #e5e5e5;
      color: #e5e5e5;
      transform-origin: 0 0;
      transform: scaleX(0.5);
    }
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #e5e5e5;
      color: #e5e5e5;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
    &-success {
      background-color: #92cd36;
    }
    &-default {
      background-color: #cccccc;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    span {
      display: inline-block;
      margin-top: 20px;
    }
  }
}
</style>
