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
      <bm-marker
        v-for="(point,index) in points"
        :key="index"
        :position="{lng:point.lng,lat:point.lat}"
        animation="BMAP_ANIMATION_DROP"
        :title="point.id"
        :icon="icon"
        @click="handleInfoWindow(point)"
      ></bm-marker>
      <bm-info-window
        :position="{lng: pointInfo.lng, lat: pointInfo.lat}"
        :show="show"
        @close="infoWindowClose"
        @open="infoWindowOpen"
        :title="'姓名：'+pointInfo.name"
        :offset="{width:3,height:-15}"
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
import collection from "lodash/collection";
import { EventBus } from "@/lib/event";
import feathersClient from "@/api/feathersClient";
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
      points: [],
      show: false,
      pointInfo: "",
      icon: {
        url: `http://${document.location.host}/img/online.png`,
        size: { width: 32, height: 32 }
      }
    };
  },
  computed: {},
  created() {
    //设置地图中心点
    feathersClient
      .service("position")
      .find({
        query: {
          $limit: 1,
          $sort: {
            time: -1
          }
        }
      })
      .then(res => {
        setTimeout(() => {
          this.center = { lng: res.data[0].lng, lat: res.data[0].lat };
        }, 1000);
      })
      .catch(err => {
        this.$Message.error({
          content: "获取位置错误：" + err,
          duration: 10,
          closable: true
        });
      });
  },
  mounted() {
    //监听列表点击事件
    EventBus.$on("device-selected", device => {
      let selectDevice = collection.find(this.points, { id: device.id });
      if (selectDevice) {
        this.center = { lng: selectDevice.lng, lat: selectDevice.lat };
        this.zoom = 19;
        this.handleInfoWindow(selectDevice);
      } else {
        this.$Message.error({
          content: "此用户无数据",
          duration: 3,
          closable: true
        });
      }
    });
    //自动刷新最新位置
    setInterval(() => {
      feathersClient
        .service("position")
        .find({
          query: {
            $limit: 10,
            $sort: {
              time: -1
            }
          }
        })
        .then(res => {
          // let now = new Date();
          // now.setMinutes(now.getMinutes() - 1);
          // now = dateTime({ date: new Date(now) });

          collection.forEach(res.data, value => {
            // if (value.time > now) {
            //   value.state = "online.png";
            // } else {
            //   value.state = "offline.png";
            // }
            let data = collection.find(this.points, { id: value.id });
            if (data) {
              if (value.time > data.time) {
                this.points = collection.reject(this.points, { id: value.id });
                let device = collection.find(this.$store.state.list, {
                  id: value.id
                });
                value.name = device.name;
                this.points.push(value);
                if (this.show) {
                  this.handleInfoWindow(value);
                }
              }
            } else {
              let device = collection.find(this.$store.state.list, {
                id: value.id
              });
              if (device) {
                value.name = device.name;
                this.points.push(value);
              }
            }
          });
        })
        .catch(err => {
          this.$Message.error({
            content: "刷新位置错误：" + err,
            duration: 10,
            closable: true
          });
        });
    }, 2000);
  },

  methods: {
    handleInfoWindow(point) {
      this.show = true;
      this.pointInfo = collection.find(this.points, { id: point.id });
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
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
  font-size: 10px;
}
</style>