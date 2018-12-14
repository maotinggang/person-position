<template>
  <Tree
    :data="data2"
    show-checkbox
    class="tree"
  ></Tree>
</template>
<script>
export default {
  data() {
    return {
      data2: [
        {
          title: "巡检部门",
          expand: true,
          children: [
            {
              title: "张三"
            },
            {
              title: "李四"
            },

            {
              title: "赵六"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.tree {
  text-align: left;
}
</style>
