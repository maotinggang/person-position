<template>
  <div>
    <div class="logo">
      <img
        class="img"
        src="@/assets/logo.png"
        alt="logo"
      >
    </div>
    <span class="name">人员位置监控跟踪系统</span>
    <div class="menu-set">
      <notification></notification>
      <fullscreen
        v-model="isFullscreen"
        style="margin-left: 50px"
      />
    </div>
  </div>
  </div>
</template>

<script>
import Fullscreen from "./fullscreen";
import Notification from "./notification";
export default {
  data() {
    return {
      isFullscreen: false
    };
  },
  components: {
    Fullscreen,
    Notification
  }
};
</script>

<style scoped>
.logo {
  position: relative;
  float: left;
}
.img {
  margin-top: 5px;
  height: 54px;
}
.menu-set {
  position: absolute;
  right: 100px;
}
.name {
  font-size: 18px;
  float: left;
  margin-left: 20px;
  font-weight: 500;
}
</style>