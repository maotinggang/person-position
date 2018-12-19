<template>
  <div>
    <Card
      class="device"
      :bordered="false"
    >
      <dev-info></dev-info>
      <dev-control></dev-control>
    </Card>
  </div>
</template>

<script>
import { Info, Control } from "@/components/device";
export default {
  data() {
    return {};
  },
  components: {
    "dev-info": Info,
    "dev-control": Control
  }
};
</script>

<style scoped>
.device {
  width: 500px;
}
</style>