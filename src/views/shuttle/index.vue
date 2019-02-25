<template>
  <div class="page">
    <div class="page-hd">
      <audio
        id="player"
        ref="audioRef"
        :src="playUrl"
        @ended="handleEnded"
        @playing="handlePlaying"
      ></audio>
      <div class="button-sp-area flex" size-17>
        <a href="javascript:;" id="showDatePicker" @click="popupShow = true">
          <span>{{ className }}</span>
          <i class="iconfont icon-xiangxia1"></i>
        </a>
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
      timer: null, //页面定时器
      playTime: 6000, //单条语音播放时长为6s
      playIndex: 0, //播放起始位置为0
      playUrl: "",
      audioTime: null,
      popupShow: false,
      className: this.$store.getters.className,
      query: {
        openId: this.$store.getters.openId,
        classId: this.$store.getters.classId,
        date: moment().format("YYYY-MM-DD") //获取当前年月日
      },
      audioList: [], //音频列表
      shuttleData: [],
      classClockData: [],
      palyNumber: 1,
      palyMax: 3 //每条语音播放最多次数
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
    //播放结束事件
    handleEnded(e) {
      if (this.palyNumber === this.palyMax) {
        //单条语音播放次数达到
        this.palyNumber = 1;
        this.playIndex++;
        if (this.playIndex < this.audioList.length) {
          this.playUrl = this.audioList[this.playIndex].url;
        } else {
          //全部语音已经播放完
          this.playIndex = 0;
          this.classClockQuery();
          this.realShuttle(this.query);
        }
      } else {
        this.palyNumber++;
        this.$refs.audioRef.play();
      }
    },
    //播放语音
    handleAudioAutoPlay() {
      this.audioTime = setInterval(() => {
        if (this.playIndex < this.audioList.length) {
          this.playIndex++;
          this.playUrl = this.audioList[this.playIndex].url;
        } else {
          this.playIndex = 0;
          //当播放到最后一条时，重新请求
          this.classClockQuery();
          this.realShuttle(this.query);
        }
      }, this.playTime);
    },
    //实时接送接口 返回语音播报
    async realShuttle(params = {}) {
      let res = await service.realShuttle(params);
      if (res.errorCode === 0) {
        if (res.data.length) {
          this.shuttleData = res.data;
          //保存音频url
          this.audioList = this.shuttleData.map(item => {
            return { url: item.url };
          });
          //设置第一条开始播放
          this.playUrl = this.audioList[this.playIndex].url;
        } else {
          //如果没有数据返回，说明还没有到打卡时间，则清除定时器
          clearInterval(this.audioTime);
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
    //this.handleAudioAutoPlay();
  },
  destroyed() {
    console.log("destroyed");
    clearInterval(this.timer);
    clearInterval(this.audioTime);
  }
};
</script>
<style lang="less">
.button-sp-area {
  color: #9cd248;
  height: 100px;
  justify-content: center;
  align-items: center;
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
