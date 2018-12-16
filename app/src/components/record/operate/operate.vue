<template>
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
        v-model="formItem.datetime.start"
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
</template>
<script>
export default {
  data() {
    return {
      formItem: {
        // checkbox: [],
        // switch: true,
        datetime: { start: "", end: "" },
        slider: 1
      },
      trackData: [""]
    };
  },
  methods: {
    select() {},
    clear() {
      this.trackData = [""];
    }
  }
};
</script>


<style scoped>
</style>