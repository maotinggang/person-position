<template>
  <div>
    <Form
      :model="formItem"
      :label-width="60"
      label-position="left"
    >
      <FormItem
        label="开始时间"
        style="margin:2px 2px;"
      >
        <DatePicker
          size="small"
          type="datetime"
          placeholder="选择查询开始时间"
          v-model="formItem.datetime.start"
        ></DatePicker>
      </FormItem>
      <FormItem
        label="结束时间"
        style="margin:2px 2px;"
      >
        <DatePicker
          size="small"
          type="datetime"
          placeholder="选择查询结束时间"
          v-model="formItem.datetime.end"
        ></DatePicker>
      </FormItem>

      <!-- <FormItem
      label="电子围栏"
      style="margin:2px 2px;"
    >
      <i-switch
        v-model="formItem.switch"
        size="large"
      >
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
      </i-switch>
    </FormItem> -->
      <!-- <FormItem
      label="播放速度"
      style="margin:2px 2px;"
    >
      <Slider
        v-model="formItem.slider"
        :step="1"
        show-stops
        show-input
        input-size="small"
        :min=1
        :max=10
      ></Slider>
    </FormItem> -->
      <div style="margin:5px 0 5px 0;text-align: center;">
        <Button
          type="primary"
          size="small"
          ghost
          @click="select"
        >查询</Button>
        <Button
          style="margin-left: 20px"
          type="error"
          size="small"
          ghost
          @click="clear"
        >清除</Button>
        <!-- <Button
        style="margin-left: 40px"
        type="success"
        size="small"
        ghost
      >播放</Button>
      <Button
        style="margin-left: 10px"
        type="warning"
        size="small"
        ghost
      >暂停</Button> -->
      </div>
    </Form>
    <Spin
      size="large"
      fix
      v-if="loading"
    ></Spin>
  </div>
</template>
<script>
import feathersClient from "@/api/feathersClient";
import { EventBus } from "@/event";
import { mapMutations } from "vuex";
import dateTime from "date-time";
export default {
  data() {
    return {
      formItem: {
        // checkbox: [],
        // switch: true,
        datetime: { start: "", end: "" },
        slider: 1
      },
      trackData: [],
      loading: false
    };
  },
  methods: {
    ...mapMutations(["getHistoryList", "clearHistoryList"]),
    select() {
      let checked = this.$store.state.checked;
      if (!checked[0]) {
        this.$Message.error({
          content: "请选择查询设备",
          duration: 3,
          closable: true
        });
      } else if (checked.length > 1) {
        this.$Message.error({
          content: "暂不支持多个设备查询",
          duration: 3,
          closable: true
        });
      } else {
        feathersClient
          .service("position")
          .find({
            query: {
              id: checked[0].id,
              time: {
                $lte: dateTime({ date: new Date(this.formItem.datetime.end) }),
                $gte: dateTime({ date: new Date(this.formItem.datetime.start) })
              }
            }
          })
          .then(res => {
            this.loading = false;
            this.getHistoryList(res.data);
            EventBus.$emit("history-clear", true);
            this.$Message.success({
              content: "查询轨迹成功",
              duration: 3,
              closable: true
            });
          })
          .catch(err => {
            this.loading = false;
            this.$Message.error({
              content: "查询轨迹失败" + err,
              duration: 0,
              closable: true
            });
          });
      }
    },
    clear() {
      this.clearHistoryList();
      EventBus.$emit("history-clear", false);
    }
  }
};
</script>


<style scoped>
</style>