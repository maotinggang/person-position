<template>
  <!-- eslint-disable -->
  <div>
    <baidu-map
      class="bm-view"
      :style="{paddingRight: paddingRight}"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      :continuous-zoom="true"
    >
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-panorama></bm-panorama>
      <bm-polyline
        v-if="showLine"
        :path="historyList"
        stroke-color="red"
        :stroke-opacity="1"
        :stroke-weight="3"
      ></bm-polyline>
      <bml-lushu
        v-if="showLine"
        :path="path"
        :icon="iconPerson"
        :play="play"
        :speed="playSpeed"
        @start="start"
        @stop="stop"
        @pause="pause"
      ></bml-lushu>
      <bm-marker v-if="showLine" :position="polyStartEnd.start" :zIndex="-1" :icon="iconStart"></bm-marker>s
      <bm-marker v-if="showLine" :position="polyStartEnd.end" :zIndex="-1" :icon="iconEnd"></bm-marker>
      <bm-info-window
        :position="{lng: pointInfo.lng, lat: pointInfo.lat}"
        :show="show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
        :title="'姓名：'+pointInfo.name"
        :offset="{width:3,height:-3}"
      >
        <span class="point-span">
          <Row>
            <Col>时间：{{pointInfo.time}}</Col>
          </Row>
          <Row>
            <Col span="16">设备号：{{pointInfo.id}}</Col>
            <Col span="8">定位：{{pointInfo.qf}}</Col>
          </Row>
          <Row>
            <Col span="12">经度：{{pointInfo.lng}}</Col>
            <Col span="12">纬度：{{pointInfo.lat}}</Col>
          </Row>
          <Row>
            <Col span="8">高度：{{pointInfo.alt}}</Col>
            <Col span="8">速度：{{pointInfo.speed}}</Col>
            <Col span="8">方向：{{pointInfo.track_true}}</Col>
          </Row>
        </span>
      </bm-info-window>
    </baidu-map>
  </div>
</template>

<script>
import { EventBus } from "@/lib/event";
import collection from "lodash/collection";
import { mapState } from "vuex";
import { BmlLushu } from "vue-baidu-map";
export default {
  props: {
    paddingRight: {
      type: String,
      default: "200px"
    }
  },
  components: { BmlLushu },
  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15,
      show: false,
      showLine: false,
      pointInfo: "",
      polyStartEnd: { start: "", end: "" },
      play: false,
      iconPerson: {
        url: `http://${document.location.host}/img/person.png`,
        size: { width: 32, height: 32 },
        opts: { anchor: { width: 16, height: 32 } }
      },
      iconEnd: {
        url: `http://${document.location.host}/img/end.png`,
        size: { width: 48, height: 48 },
        opts: { anchor: { width: 24, height: 40 } }
      },
      iconStart: {
        url: `http://${document.location.host}/img/start.png`,
        size: { width: 48, height: 48 },
        opts: { anchor: { width: 24, height: 40 } }
      }
    };
  },
  mounted() {
    EventBus.$on("history-clicked", value => {
      this.center = { lng: value.lng, lat: value.lat };
      this.zoom = 17;
      let device = collection.find(this.$store.state.list, {
        id: value.id
      });
      value.name = device.name;
      this.handleInfoWindow(value);
    });
    EventBus.$on("history-clear", () => {
      this.show = false;
      this.showLine = false;
      this.polyStartEnd = {};
    });
    EventBus.$on("history-select-done", () => {
      if (this.historyList[0]) {
        this.center = {
          lng: this.historyList[0].lng,
          lat: this.historyList[0].lat
        };
        this.zoom = 17;
        this.polyStartEnd.start = this.historyList[0];
        this.polyStartEnd.end = this.historyList[this.historyList.length - 1];
        this.showLine = true;
      }
    });
    EventBus.$on("history-play", () => {
      this.start();
    });
    EventBus.$on("history-stop", () => {
      this.stop();
    });
    EventBus.$on("history-pause", () => {
      this.pause();
    });
  },
  methods: {
    handleInfoWindow(point) {
      this.show = true;
      this.pointInfo = point;
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
    start() {
      this.play = true;
    },
    stop() {
      this.play = false;
    },
    pause() {
      this.play = false;
    }
  },
  computed: {
    ...mapState(["historyList", "playSpeed"]),
    path() {
      let temp = [];
      let length = this.historyList.length;
      if (length) {
        let count = Math.ceil(this.playSpeed / 400);
        collection.forEach(this.historyList, (value, key) => {
          // 路书播放不完整bug，减少点数避免
          if (key % count == 0) temp.push({ lng: value.lng, lat: value.lat });
        });
        // 最后一点
        if ((length - 1) % count != 0) {
          temp.push({
            lng: this.historyList[length - 1].lng,
            lat: this.historyList[length - 1].lat
          });
        }
      }
      return temp;
    }
  }
};
</script>

<style scoped>
.bm-view {
  position: fixed;
  width: 100%;
  top: 63px;
  bottom: 0;
}
.point-span {
  font-size: 11px;
}
</style>