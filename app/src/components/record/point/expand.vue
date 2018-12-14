<template>
  <div>
    <Row class="expand-row">
      <Col span="12">
      <span class="expand-key">经度: </span>
      <span class="expand-value">{{ row.longtitude }}</span>
      </Col>
      <Col span="12">
      <span class="expand-key">纬度: </span>
      <span class="expand-value">{{ row.latitude }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <span class="expand-key">位置: </span>
      <span class="expand-value">{{ row.location }}</span>
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
  margin-bottom: 16px;
}
</style>