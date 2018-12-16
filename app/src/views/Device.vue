<template>
  <div>
    <Row class="device">

      <Col span="24">
      <dev-info></dev-info>
      <dev-control></dev-control>

      </Col>

    </Row>
  </div>
</template>

<script>
import { Info, Control } from "@/components/device";
export default {
  components: {
    "dev-info": Info,
    "dev-control": Control
  }
};
</script>

<style scoped>
.device {
  text-align: center;
}
</style>