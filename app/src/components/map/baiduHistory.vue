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
        v-if="clear"
        :path="polylinePath"
        stroke-color="red"
        :stroke-opacity="0.5"
        :stroke-weight="3"
      ></bm-polyline>
      <bm-marker
        v-for="(point,index) in polylinePath"
        :key="index"
        :position="{lng:point.lng,lat:point.lat}"
        :title="point.id"
        :icon="{url: 'http://localhost:3030/point.png',size: {width: 32, height: 32}}"
        @click="handleInfoWindow(point)"
      >
      </bm-marker>
      <bm-marker
        v-if="clear"
        :position="polyStartEnd.end"
        :rotation=-35
        :zIndex=-1
        :icon="{url: 'http://localhost:3030/end.png',size: {width: 48, height: 48},opts:{anchor:{width: 35, height: 40}}}"
      >
        <bm-marker
          v-if="clear"
          :position="polyStartEnd.start"
          :rotation=35
          :zIndex=-1
          :icon="{url: 'http://localhost:3030/start.png',size: {width: 48, height: 48},opts:{anchor:{width: 15, height: 40}}}"
        >
        </bm-marker>
      </bm-marker>
      <bm-info-window
        :position="{lng: pointInfo.lng, lat: pointInfo.lat}"
        :show="show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
        :title="'设备号：'+pointInfo.id"
        :offset="{width:3,height:-3}"
      ><span class="point-span">
          <Row>
            <Col span="18">
            时间：{{pointInfo.time}}
            </Col>
            <Col span="6">
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
      clear: true
    };
  },
  mounted() {
    EventBus.$on("history-clicked", value => {
      this.center = { lng: value.lng, lat: value.lat };
      this.handleInfoWindow(value);
    });
    EventBus.$on("history-clear", () => {
      this.clear = false;
      this.show = false;
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
    polylinePath() {
      let polyline = this.$store.state.historyList;
      if (polyline[0]) {
        this.clear = true;
        this.polyStartEnd.end = polyline[0];
        this.center = { lng: polyline[0].lng, lat: polyline[0].lat };
        let length = polyline.length;
        this.polyStartEnd.start = polyline[length - 1];
      }
      return polyline;
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