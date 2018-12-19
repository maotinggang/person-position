<template>
  <div>
    <Row class="expand-row">
      <Col span="12">
      <p class="expand-key">经度 </p>
      <span class="expand-value">{{ row.lng }}</span>
      </Col>
      <Col span="12">
      <p class="expand-key">纬度 </p>
      <span class="expand-value">{{ row.lat }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
      <p class="expand-key">高度 </p>
      <span class="expand-value">{{ row.alt }}</span>
      </Col>
      <Col span="8">
      <p class="expand-key">速度 </p>
      <span class="expand-value">{{ row.speed }}</span>
      </Col>
      <Col span="8">
      <p class="expand-key">方向 </p>
      <span class="expand-value">{{ row.track_true }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
};
</script>
<style scoped>
.expand-row {
  margin-bottom: 5px;
}
</style>