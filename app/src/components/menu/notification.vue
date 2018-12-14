<template>
  <div>
    <div class="notification-btn-con">
      <Tooltip
        content="报警通知"
        placement="bottom"
      >
        <Badge
          :count=1
          type="warning"
          :offset=[15,0]
        >
          <Icon
            type="md-notifications-outline"
            size="28"
          ></Icon>
        </Badge>
      </Tooltip>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {}
  }
};
</script>

<style scoped>
.notification-btn-con {
  position: absolute;
}
i {
  cursor: pointer;
}
</style>