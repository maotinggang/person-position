<template>
  <div>
    <Menu
      mode="horizontal"
      active-name="1"
    >
      <div class="logo">
        <img
          class="img"
          src="@/assets/logo.png"
          alt="logo"
        >
      </div>
      <span class="name">人员位置监控跟踪系统</span>
      <div>
        <MenuItem
          name="1"
          to="real-time"
        >
        <Icon type="md-videocam" />
        实时监控
        </MenuItem>
        <MenuItem
          name="2"
          to="history"
        >
        <Icon type="md-time" />
        历史查询
        </MenuItem>
        <MenuItem
          name="3"
          to="exportData"
        >
        <Icon type="md-document" />
        数据导出
        </MenuItem>
        <MenuItem
          name="4"
          to="device"
        >
        <Icon type="md-construct" />
        设备管理
        </MenuItem>
      </div>
      <div class="menu-set">
        <!-- <notification></notification> -->
        <fullscreen
          v-model="isFullscreen"
          style="margin-left: 50px"
        />
      </div>
    </Menu>
  </div>
</template>

<script>
import Fullscreen from "./fullscreen";
// import Notification from "./notification";
export default {
  data() {
    return {
      isFullscreen: false
    };
  },
  components: {
    Fullscreen
    // Notification
  }
};
</script>

<style scoped>
.logo {
  position: relative;
  float: left;
  margin-left: 10px;
}
.img {
  margin-top: 5px;
  height: 50px;
}
.menu-set {
  position: absolute;
  right: 100px;
}
.name {
  font-size: 18px;
  float: left;
  margin-left: 10px;
  margin-right: 20px;
  font-weight: 500;
}
</style>