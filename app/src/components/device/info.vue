<template>
  <div class="form-param">
    <Form
      ref="formValidate"
      :model="formValidate"
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
          v-model="formValidate.id"
          clearable
          type="text"
          placeholder="必须唯一，与设备对应"
          size="small"
        />
      </FormItem>
      <FormItem
        label="用户名"
        prop="name"
        style="margin:0 0 20px 0;"
      >
        <Input
          v-model="formValidate.name"
          clearable
          type="text"
          placeholder="列表显示名称"
          size="small"
        />
      </FormItem>
      <FormItem
        label="设备类型"
        prop="devType"
        style="margin:0 0 20px 0;"
      >
        <Select
          v-model="formValidate.devType"
          size="small"
        >
          <Option value="1">人员定位</Option>
        </Select>
      </FormItem>
      <FormItem
        label="安装时间"
        prop="setup"
        style="margin:0 0 20px 0;"
      >
        <Date-picker
          type="datetime"
          v-model="formValidate.setup"
          format="yyyy/MM/dd HH:mm"
          placeholder="设备安装时间"
        ></Date-picker>
      </FormItem>
    </Form>
  </div>

</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        id: "",
        name: "",
        devType: "",
        setup: ""
      },
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
        devType: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        lat: [
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
  components: {},
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped>
.form-param {
  padding: 10px;
}
</style>
