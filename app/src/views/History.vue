<template>
  <div class="layout">
    <baidu-history paddingRight="530px"></baidu-history>
    <Layout>
      <Sider
        class="layout-sider"
        :width=330
      >
        <Card
          :padding=0
          :bordered=false
        >
          <p slot="title">轨迹查询</p>
          <record></record>
        </Card>
      </Sider>
    </Layout>
  </div>
</template>
<script>
import { BaiduHistory } from "@/components/map";
import Record from "@/components/record";
export default {
  components: {
    BaiduHistory,
    Record
  }
};
</script>
<style scoped>
.layout-sider {
  position: fixed;
  right: 0;
  top: 64px;
  background: white;
  height: 100vh;
  overflow: auto;
}
</style>