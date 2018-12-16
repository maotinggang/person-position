<template>
  <div class="layout">
    <baidu paddingRight="299px"></baidu>
    <Layout>
      <Sider
        class="layout-sider"
        :width=300
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
import Baidu from "@/components/map";
import Record from "@/components/record";
export default {
  components: {
    Baidu,
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