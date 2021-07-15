<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>🥂 推广</span>
    </div>
    <div>
      <article v-for="(item, index) in list" :key="index" class="media">
        <a :href="item.link" target="_blank">{{ item.title }}</a>
      </article>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Promotion",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
</style>