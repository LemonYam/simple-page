  <template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>📝 发帖</span>
    </div>
    <div v-if="token != null && token !== ''" class="has-text-centered">
      <b-button
        v-if="isMute == false"
        type="is-primary"
        tag="router-link"
        :to="{ path: '/post/create' }"
        outlined
        >✍ 发表想法</b-button
      >
      <b-button
        v-else
        type="is-danger"
        tag="router-link"
        :to="{ path: '/post/create' }"
        disabled
        outlined
        >✍ 发表想法</b-button
      >
    </div>

    <div v-else class="has-text-centered">
      <b-button
        type="is-primary"
        tag="router-link"
        :to="{ path: '/register' }"
        outlined
        >马上入驻</b-button
      >
      <b-button
        type="is-danger"
        tag="router-link"
        :to="{ path: '/login' }"
        outlined
        class="ml-2"
      >
        社区登入</b-button
      >
    </div>
  </el-card>
</template>

<script>
export default {
  name: "PostCard",

  props: {
    isMute: {
      // 是否禁言
      type: Boolean,
      default: false,
    },
    token: {
      // 是否有 token
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
</style>