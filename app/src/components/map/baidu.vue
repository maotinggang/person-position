<template>
  <div>
    <baidu-map
      class="bm-view"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
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
  data() {
    return {
      center: { lng: 116.404, lat: 39.915 },
      zoom: 12
    };
  }
};
</script>

<style scoped>
.bm-view {
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 63px 299px 0px 199px;
}
</style>