// 帖子详情页
<template>
  <div class="columns">
    <div class="column">
      <Author v-if="flag" :user="postOwner" :token="token" />
      <recommend v-if="flag" :topic-id="post.id" />
    </div>

    <div class="column is-three-quarters">
      <post-detail
        :token="token"
        :user="user"
        :post="post"
        :postOwner="postOwner"
        :tags="tags"
      ></post-detail>

      <lv-comments v-if="!user.isMute" :slug="post.id" />
    </div>
  </div>
</template>

<script>
// 接口引入
import { getPost } from "@/api/post";
import { mapGetters } from "vuex";

// 组件引入
import Author from "@/components/PostCard/Author";
import Recommend from "@/components/PostCard/Recommend";
import PostDetail from "@/components/PostCard/PostDetail";
import LvComments from "@/components/CommentCard/Comments";

export default {
  name: "Post",
  components: { Author, Recommend, PostDetail, LvComments },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  data() {
    return {
      flag: false,
      post: {
        content: "",
        id: this.$route.params.id,
      },
      tags: [],
      postOwner: {},
    };
  },
  mounted() {
    this.fetchTopic();
  },
  methods: {
    // 初始化
    async fetchTopic() {
      getPost(this.$route.params.id).then((response) => {
        const { data } = response;
        document.title = data.topic.title;
        this.post = data.topic;
        this.tags = data.tags;
        this.postOwner = data.user;
        this.flag = true;
      });
    },
  },
};
</script>

<style>
#preview {
  min-height: 300px;
}
</style>