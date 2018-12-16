<template>
  <div class="layout">
    <Layout>
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
        <Content class="layout-content2">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import List from "@/components/list";
import MenuAll from "@/components/menu";
export default {
  components: {
    List,
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
.layout-content2 {
  padding: 0 0 0 200px;
}
.layout-header {
  position: fixed;
  background-color: white;
  width: 100%;
  padding: 0;
}
</style>