<template>
  <div class="table">
    <Table
      :columns="columns"
      :data="historyList"
      size="small"
      :height="tableheight"
      highlight-row
      @on-row-dblclick="deviceClick"
    ></Table>
  </div>
</template>
<script>
// import expandRow from "./expand.vue";
import { mapState } from "vuex";
import { EventBus } from "@/lib/event";
// import collection from "lodash/collection";
export default {
  // components: { expandRow },
  data() {
    return {
      columns: [
        // {
        //   type: "expand",
        //   width: 20,
        //   render: (h, params) => {
        //     return h(expandRow, {
        //       props: {
        //         row: params.row
        //       }
        //     });
        //   }
        // },
        {
          title: "序号",
          key: "no",
          width: 80,
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
      ],
      tableheight: 0
    };
  },
  created() {
    window.onresize = () => {
      this.tableheight = window.innerHeight - 225;
    };
    window.onload = () => {
      this.tableheight = window.innerHeight - 225;
    };
  },
  computed: {
    ...mapState(["historyList"])
  },
  methods: {
    deviceClick(value) {
      EventBus.$emit("history-clicked", value);
    }
  }
};
</script>

<style>
/* .ivu-table .table-cell {
  background-color: #ff6600;
  color: #fff;
} */
.table {
  overflow: auto;
}
</style>