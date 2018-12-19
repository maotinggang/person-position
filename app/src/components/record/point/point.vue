
<template>
  <Table
    :columns="columns"
    :data="data"
    size="small"
    highlight-row
    @on-row-dblclick="deviceClick"
  ></Table>
</template>
<script>
import expandRow from "./expand.vue";
import dateTime from "date-time";
import { EventBus } from "@/lib/event";
import collection from "lodash/collection";
export default {
  components: { expandRow },
  data() {
    return {
      columns: [
        {
          type: "expand",
          width: 20,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "序号",
          key: "no",
          width: 60,
          align: "center"
        },
        {
          title: "时间",
          key: "time",
          align: "center"
        },
        {
          title: "定位",
          key: "qf",
          width: 60,
          align: "center"
        }
      ]
    };
  },
  computed: {
    data() {
      let data = this.$store.state.historyList;
      if (data[0]) {
        collection.forEach(data, (value, key) => {
          data[key].no = key + 1;
          data[key].time = dateTime({ date: new Date(value.time) });
        });
      }
      return data;
    }
  },
  methods: {
    deviceClick(value) {
      EventBus.$emit("history-clicked", value);
    }
  }
};
</script>

<style>
.ivu-table .table-cell {
  background-color: aqua;
}
.ivu-table th.table-column {
  background-color: aqua;
}
</style>