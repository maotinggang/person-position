<template>
  <div>
    <Tree
      ref="tree"
      :data="data"
      show-checkbox
      class="tree"
      @on-select-change="selected"
      @on-check-change="checked"
    ></Tree>
    <Spin
      size="large"
      fix
      v-if="loading"
    ></Spin>
  </div>
</template>
<script>
import feathersClient from "@/api/feathersClient";
import { mapMutations } from "vuex";
import { EventBus } from "@/event";
export default {
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.loading = true;
    feathersClient
      .service("device")
      .find()
      .then(res => {
        this.loading = false;
        this.listInit(res.data);
      })
      .catch(err => {
        this.loading = false;
        this.$Message.error({
          content: "获取列表错误：" + err,
          duration: 10,
          closable: true
        });
      });
  },
  methods: {
    ...mapMutations(["listInit", "deviceSelected", "deviceChecked"]),
    selected(device) {
      if (device[0]) {
        this.deviceSelected(device);
      }
      EventBus.$emit("device-selected", this.$store.state.selected);
    },
    checked(devices) {
      this.deviceChecked(devices);
    }
  },
  computed: {
    data() {
      let devices = this.$store.state.list;
      let children = [];
      devices.forEach(element => {
        children.push({ title: element.name });
      });
      return [
        {
          title: "",
          expand: true,
          children: children
        }
      ];
    }
  }
};
</script>

<style scoped>
.tree {
  text-align: left;
}
</style>
