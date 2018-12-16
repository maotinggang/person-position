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
    </baidu-map>
  </div>
</template>

<script>
export default {
  props: {
    paddingRight: {
      type: String,
      default: "0px"
    }
  },
  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      zoom: 16
    };
  }
};
</script>

<style scoped>
.bm-view {
  position: fixed;
  width: 100%;
  top: 63px;
  bottom: 0;
  padding-left: 198px;
}
</style>