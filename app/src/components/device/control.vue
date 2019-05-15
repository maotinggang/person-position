<template>
  <!-- eslint-disable -->
  <div class="device-control">
    <Row>
      <Col span="8">
        <Poptip confirm title="是否确定修改信息?" @on-ok="toAdd" style="text-align: left;">
          <Button type="success" ghost icon="md-add">添加设备</Button>
        </Poptip>
      </Col>
      <Col span="8">
        <Poptip confirm title="是否确定修改信息?" @on-ok="toUpdate" style="text-align: left;">
          <Button type="warning" ghost icon="ios-create">修改参数</Button>
        </Poptip>
      </Col>
      <Col span="8">
        <Poptip confirm title="是否确定删除此设备?" @on-ok="toDelete" style="text-align: left;">
          <Button type="error" ghost icon="md-trash">删除设备</Button>
        </Poptip>
      </Col>
    </Row>
    <Spin size="large" fix v-if="loading"></Spin>
  </div>
</template>

<script>
import feathersClient from "@/api/feathersClient";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: mapState({
    selected: "selected"
  }),
  methods: {
    ...mapMutations(["listAdd", "listDelete", "listUpdate"]),
    toAdd() {
      if (
        this.selected.id &&
        this.selected.name &&
        this.selected.section &&
        this.selected.setup
      ) {
        this.loading = true;
        feathersClient
          .service("device")
          .create(this.selected)
          .then(() => {
            this.loading = false;
            this.listAdd(this.selected);
            this.$Message.success({
              content: "添加设备成功",
              duration: 3,
              closable: true
            });
          })
          .catch(err => {
            this.loading = false;
            this.$Message.error({
              content: "添加错误：" + err,
              duration: 10,
              closable: true
            });
          });
      } else {
        this.$Message.error({
          content: "添加设备参数不能有空",
          duration: 3,
          closable: true
        });
      }
    },
    toDelete() {
      if (this.selected.id) {
        feathersClient
          .service("device")
          .remove(this.selected.id)
          .then(() => {
            this.loading = false;
            this.listDelete(this.selected.id);
            this.$Message.success({
              content: "设备删除成功",
              duration: 3,
              closable: true
            });
          })
          .catch(err => {
            this.loading = false;
            this.$Message.error({
              content: "设备删除失败" + err,
              duration: 10,
              closable: true
            });
          });
      } else {
        this.$Message.error({
          content: "设备号不能为空",
          duration: 3,
          closable: true
        });
      }
    },
    toUpdate() {
      if (this.selected.id) {
        feathersClient
          .service("device")
          .patch(this.selected.id, this.selected)
          .then(() => {
            this.loading = false;
            this.listUpdate(this.selected);
            this.$Message.success({
              content: "修改成功",
              duration: 3,
              closable: true
            });
          })
          .catch(err => {
            this.loading = false;
            this.$Message.error({
              content: "修改失败" + err,
              duration: 10,
              closable: true
            });
          });
      } else {
        this.$Message.error({
          content: "设备号不能为空",
          duration: 3,
          closable: true
        });
      }
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