<template>
  <div class="layout">
    <Layout>
      <baidu></baidu>
      <Header class="layout-header">
        <menu-all></menu-all>
      </Header>
      <Layout class="layout-content">
        <Sider
          :style="{ left: 0}"
          class="layout-sider"
        >
          <Card
            :padding=0
            :bordered=false
          >
            <p slot="title">用户列表</p>
            <list></list>
          </Card>
        </Sider>
        <Sider
          :style="{right: 0}"
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
    </Layout>
  </div>
</template>
<script>
import Baidu from "@/components/map";
import List from "@/components/list";
import Record from "@/components/record";
import MenuAll from "@/components/menu";
export default {
  components: {
    Baidu,
    List,
    Record,
    MenuAll
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-sider {
  position: fixed;
  background: white;
  height: 100vh;
  overflow: auto;
}
.layout-card {
  padding: 0px;
}
.layout-content {
  position: relative;
  top: 64px;
}
.layout-header {
  position: fixed;
  background-color: rgb(133, 241, 245);
  width: 100%;
  padding: 0 10px;
}
</style>