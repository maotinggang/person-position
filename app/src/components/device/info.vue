<template>
  <div class="form-param">
    <Form
      :model="selected"
      label-position="left"
      :label-width="80"
      :rules="ruleValidate"
    >
      <FormItem
        label="设备号"
        prop="id"
        style="margin:0 0 20px 0;"
      >
        <Input
          v-model="selected.id"
          clearable
          type="text"
          placeholder="必须唯一，与设备对应，设备SN号"
        />
      </FormItem>
      <FormItem
        label="用户名"
        prop="name"
        style="margin:0 0 20px 0;"
      >
        <Input
          v-model="selected.name"
          clearable
          type="text"
          placeholder="设备人员名称，列表显示名称"
        />
      </FormItem>
      <FormItem
        label="用户单位"
        prop="section"
        style="margin:0 0 20px 0;"
      >
        <Input
          v-model="selected.section"
          clearable
          type="text"
          placeholder="用户所属单位或部门"
        />
      </FormItem>

      <FormItem
        label="操作时间"
        prop="setup"
        style="margin:0 0 20px 0;text-align: left;"
      >
        <Date-picker
          type="datetime"
          v-model="selected.setup"
          clearable
          :editable="false"
          format="yyyy/MM/dd HH:mm"
          placeholder="设备安装时间"
        ></Date-picker>
      </FormItem>
    </Form>
  </div>

</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      ruleValidate: {
        id: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        section: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        setup: [
          {
            required: true,
            type: "date",
            message: "不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: mapState({
    selected: "selected"
  })
};
</script>

<style scoped>
.form-param {
  padding: 10px;
}
</style>
