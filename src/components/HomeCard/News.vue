<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>☕ 每日资讯</span>
    </div>
    <div>
      <!-- <a class="has-text-left block" :href="news.link" target="_blank">
        {{ news.content }}
      </a>
      <div class="has-text-right mt-5 block">——{{ news.author }}</div> -->
      <a
        class="has-text-left block"
        href="https://stackoverflow.com/questions/56074595/vuejs-service-worker-js-is-ignored-in-my-pwa"
        target="_blank"
      >
        VueJS service-worker.js is ignored in my PWA?
      </a>
      <div class="has-text-right mt-5 block">——Stack Overflow</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "News",
  props: {
    news: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
</style>