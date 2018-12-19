<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header">
        <menu-all></menu-all>
      </Header>
      <Sider class="layout-sider">
        <Card
          :padding=0
          :bordered=false
        >
          <p slot="title">用户列表</p>
          <list></list>
        </Card>
      </Sider>
      <Content class="layout-content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </Content>
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
  },
  mounted() {}
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
  top: 64px;
}
.layout-content {
  position: fixed;
  width: 100%;
  top: 64px;
  bottom: 0px;
  margin-left: 199px;
  border: 1px solid #d7dde4;
  background-color: white;
}
.layout-header {
  position: fixed;
  background-color: white;
  width: 100%;
  padding: 0;
}
</style>