<template>
  <div class="table">
    <Table
      :columns="columns"
      :data="historyListXYZ"
      size="small"
      ref="table"
      :height="tableheight"
      width="1100"
      highlight-row
    ></Table>
    <Button
      type="primary"
      @click="exportData"
      style="margin-top: 10px"
    >导出数据</Button>
  </div>
</template>
<script>
import { mapState } from "vuex";
import collection from "lodash/collection";
import { LBHtoXYZ } from "../lib/coords";
export default {
  data() {
    return {
      columns: [
        {
          title: "序号",
          key: "no",
          width: 100,
          align: "center"
        },
        {
          title: "时间",
          key: "time",
          width: 170,
          align: "center"
        },
        {
          title: "定位",
          key: "qf",
          width: 60,
          align: "center"
        },
        {
          title: "经度",
          key: "lng",
          width: 120,
          align: "center"
        },
        {
          title: "纬度",
          key: "lat",
          width: 120,
          align: "center"
        },
        {
          title: "高度",
          key: "alt",
          width: 100,
          align: "center"
        },
        {
          title: "X",
          key: "x",
          width: 120,
          align: "center"
        },
        {
          title: "Y",
          key: "y",
          width: 120,
          align: "center"
        },
        {
          title: "Z",
          key: "z",
          width: 120,
          align: "center"
        }
      ],
      tableheight: window.innerHeight - 120
    };
  },
  created() {
    window.onresize = () => {
      this.tableheight = window.innerHeight - 120;
    };
    window.onload = () => {
      this.tableheight = window.innerHeight - 120;
    };
  },
  computed: {
    ...mapState(["historyList"]),
    historyListXYZ() {
      let xyzList = [];
      collection.forEach(this.historyList, function(value) {
        let xyz = LBHtoXYZ({
          lng: Number(value.lng),
          lat: Number(value.lat),
          alt: Number(value.alt)
        });
        value.x = xyz.x;
        value.y = xyz.y;
        value.z = xyz.z;
        xyzList.push(value);
      });
      return xyzList;
    }
  },
  methods: {
    exportData() {
      this.$refs.table.exportCsv({
        filename: this.historyList.id
      });
    }
  }
};
</script>

<style>
.table {
  overflow: auto;
  margin-left: 5px;
}
</style>