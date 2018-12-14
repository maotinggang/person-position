
<template>
  <Table
    :columns="columns10"
    :data="data9"
    size="small"
  ></Table>
</template>
<script>
import expandRow from "./expand.vue";
export default {
  components: { expandRow },
  data() {
    return {
      columns10: [
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
          title: "状态",
          key: "state",
          width: 60,
          align: "center"
        }
      ],
      data9: [
        {
          no: 1,
          time: "20180502 12:05:30",
          state: "正常",
          longtitude: 112.123,
          latitude: 39.236,
          location: "北京海淀区"
        },
        {
          no: 1,
          time: "20180502 12:05:30",
          state: "正常",
          longtitude: 112.123,
          latitude: 39.236,
          location: "北京海淀区"
        },
        {
          no: 1,
          time: "20180502 12:05:30",
          state: "正常",
          longtitude: 112.123,
          latitude: 39.236,
          location: "北京海淀区"
        },
        {
          no: 1,
          time: "20180502 12:05:30",
          state: "正常",
          longtitude: 112.123,
          latitude: 39.236,
          location: "北京海淀区"
        }
      ]
    };
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