<template>
  <div class="device-control">
    <Row>
      <Col span="6">
      <Button
        type="success"
        ghost
        icon="md-refresh"
        @click="toRefresh"
      >
        手动刷新
      </Button>
      </Col>
      <Col span="6">
      <Button
        type="primary"
        ghost
        icon="md-close"
        @click="toCancel"
      >
        取消操作
      </Button>
      </Col>
      <Col span="6">
      <Poptip
        confirm
        title="是否确定提交信息?"
        @on-ok="toSubmit"
        style="text-align: left;"
      >
        <Button
          type="warning"
          ghost
          icon="ios-create"
        >
          提交操作
        </Button>
      </Poptip>
      </Col>
      <Col span="6">
      <Poptip
        confirm
        title="是否确定删除此设备?"
        @on-ok="toDelete"
        style="text-align: left;"
      >
        <Button
          type="error"
          ghost
          icon="md-trash"
        >
          删除设备
        </Button>
      </Poptip>
      </Col>
    </Row>
    <Spin
      size="large"
      fix
      v-if="loading"
    ></Spin>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    toSubmit() {
      this.loading = true;
    },
    toDelete() {
      this.loading = true;
    },
    toRefresh() {
      this.loading = true;
    },
    toCancel() {
      this.loading = true;
    }
  }
};
</script>

<style scoped>
.device-control {
  padding: 4px;
  height: 40px;
  text-align: center;
}
</style>