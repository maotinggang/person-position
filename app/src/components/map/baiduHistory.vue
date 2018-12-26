<template>
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
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <bm-panorama></bm-panorama>
      <bm-polyline
        :path="historyList"
        v-if="showLine"
        stroke-color="red"
        :stroke-opacity="1"
        :stroke-weight="5"
      ></bm-polyline>
      <bm-polyline
        :path="polylinePlay"
        v-if="showPlay"
        stroke-color="blue"
        :stroke-opacity="0.5"
        :stroke-weight="3"
      ></bm-polyline>
      <!-- <bm-marker
        v-if="showLine"
        :position="polyStartEnd.end"
        :rotation=-35
        :zIndex=-1
        :icon="{url: config.url +'/img/end.png',size: {width: 48, height: 48},opts:{anchor:{width: 35, height: 40}}}"
      >
      </bm-marker>
      <bm-marker
        v-if="showLine"
        :position="polyStartEnd.start"
        :rotation=35
        :zIndex=-1
        :icon="{url:config.url + '/img/start.png',size: {width: 48, height: 48},opts:{anchor:{width: 15, height: 40}}}"
      >
      </bm-marker> -->
      <bm-info-window
        :position="{lng: pointInfo.lng, lat: pointInfo.lat}"
        :show="show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
        :title="'姓名：'+pointInfo.name"
        :offset="{width:3,height:-3}"
      ><span class="point-span">
          <Row>
            <Col>
            时间：{{pointInfo.time}}
            </Col>
          </Row>
          <Row>
            <Col span="16">
            设备号：{{pointInfo.id}}
            </Col>
            <Col span="8">
            定位：{{pointInfo.qf}}
            </Col>
          </Row>
          <Row>
            <Col span="12">
            经度：{{pointInfo.lng}}
            </Col>
            <Col span="12">
            纬度：{{pointInfo.lat}}
            </Col>
          </Row>
          <Row>
            <Col span="8">
            高度：{{pointInfo.alt}}
            </Col>
            <Col span="8">
            速度：{{pointInfo.speed}}
            </Col>
            <Col span="8">
            方向：{{pointInfo.track_true}}
            </Col>
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

export default {
  props: {
    paddingRight: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15,
      show: false,
      pointInfo: "",
      polyStartEnd: { start: "", end: "" },
      showLine: false,
      showPlay: false,
      // config: config,
      polylinePlay: []
    };
  },
  mounted() {
    EventBus.$on("history-clicked", value => {
      this.center = { lng: value.lng, lat: value.lat };
      this.zoom = 19;
      let device = collection.find(this.$store.state.list, {
        id: value.id
      });
      value.name = device.name;
      this.handleInfoWindow(value);
    });
    EventBus.$on("history-clear", () => {
      this.showLine = false;
      this.show = false;
    });
    EventBus.$on("history-select-done", () => {
      if (this.historyList[0]) {
        this.showLine = true;
        // this.polyStartEnd.start = this.historyList[0];
        this.center = {
          lng: this.historyList[0].lng,
          lat: this.historyList[0].lat
        };
        this.zoom = 19;
        // let length = this.historyList.length;
        // this.polyStartEnd.end = this.historyList[length - 1];
      }
    });
    EventBus.$on("history-play", () => {
      this.showPlay = true;
      let index = 0;
      let count = this.historyList.length;
      this.polylinePlay = [];
      let play = setInterval(
        () => {
          if (index < count) {
            this.polylinePlay.push({
              lng: this.historyList[index].lng,
              lat: this.historyList[index].lat
            });
            this.polylinePlay.push({
              lng: this.historyList[index + 1].lng,
              lat: this.historyList[index + 1].lat
            });
            this.polylinePlay.push({
              lng: this.historyList[index + 2].lng,
              lat: this.historyList[index + 2].lat
            });
            this.polylinePlay.push({
              lng: this.historyList[index + 3].lng,
              lat: this.historyList[index + 3].lat
            });
            this.polylinePlay.push({
              lng: this.historyList[index + 4].lng,
              lat: this.historyList[index + 4].lat
            });
            index += 5;
          } else {
            clearInterval(play);
          }
        },
        5,
        play,
        index,
        count
      );
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
    }
  },
  computed: {
    ...mapState(["historyList"])
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