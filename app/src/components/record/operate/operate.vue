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
      <div style="margin:5px 0 5px 0;text-align: center;">
        <Button
          type="primary"
          size="small"
          ghost
          @click="select"
        >查询</Button>
        <Button
          style="margin-left: 20px"
          type="primary"
          size="small"
          ghost
          @click="play"
        >播放</Button>
        <Button
          style="margin-left: 20px"
          type="error"
          size="small"
          ghost
          @click="clear"
        >清除</Button>
      </div>
    </Form>
  </div>
</template>
<script>
import feathersClient from "@/api/feathersClient";
import { EventBus } from "@/lib/event";
import { mapMutations } from "vuex";
import dateTime from "date-time";
export default {
  data() {
    return {
      formItem: {
        datetime: { start: "", end: "" },
        slider: 1
      },
      trackData: []
    };
  },
  mounted() {
    this.$Message.config({
      top: 64,
      duration: 3
    });
  },
  methods: {
    ...mapMutations([
      "setHistoryList",
      "clearHistoryList",
      "setPolylineControlEnd",
      "setPolylineControlStart",
      "setPolylineControl"
    ]),
    select() {
      let checked = this.$store.state.checked;
      if (!checked[0]) {
        this.$Message.error({
          content: "请选择查询设备",
          closable: true
        });
      } else if (checked.length > 1) {
        this.$Message.error({
          content: "暂不支持多个设备查询",
          closable: true
        });
      } else {
        this.clear();
        let id = checked[0].id;
        //按时间60分钟进行分段查询，防止一次数据量过大
        let intervalTime = 60 * 60 * 1000;
        let startTime = new Date(this.formItem.datetime.start);
        let endTime = new Date(this.formItem.datetime.end);
        let startMill = startTime.getTime();
        let endMill = endTime.getTime();
        let count = Math.ceil((endMill - startMill) / intervalTime);
        this.setPolylineControlEnd(count);
        if (count > 24) {
          this.$Message.error({
            content: "暂支持查询24小时数据",
            closable: true
          });
          return;
        }
        for (let index = 0; index < count; index++) {
          let start = startMill + index * intervalTime;
          let end = startMill + (index + 1) * intervalTime;
          if (index == count - 1) {
            end = endMill;
          }
          start = dateTime({ date: new Date(start) });
          end = dateTime({ date: new Date(end) });
          this.getPosition(id, start, end);
        }
        this.$Message.loading({
          content: "查询轨迹中...",
          closable: true
        });
      }
    },
    clear() {
      this.clearHistoryList();
      EventBus.$emit("history-clear");
    },
    play() {
      EventBus.$emit("history-play");
    },
    getPosition(id, start, end) {
      feathersClient
        .service("position")
        .find({
          query: {
            id: id,
            time: {
              $lte: end,
              $gte: start
            }
          }
        })
        .then(res => {
          this.setPolylineControlStart();
          if (res.data[0]) this.setHistoryList(res.data);
          if (
            this.$store.state.polylineControl.start ==
            this.$store.state.polylineControl.end
          ) {
            this.setPolylineControl();
            EventBus.$emit("history-select-done");
          }
        })
        .catch(err => {
          this.loading = false;
          this.$Message.error({
            content: "查询轨迹失败" + err,
            closable: true
          });
        });
    }
  }
};
</script>


<style scoped>
</style>