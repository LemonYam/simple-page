<template>
  <section class="box comments">
    <h3 class="title is-5" v-if="token">发表评论</h3>

    <lv-comments-form :slug="slug" v-if="token" @loadComments="fetchComments" /><br v-if="token"/>

    <h3 class="title is-5">评论列表</h3><hr />

    <lv-comments-item
      v-for="(comment, index) in comments"
      :key="index"
      :idx="index"
      :comment="comment"
      @reloadComments="reloadPage"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchCommentsByTopicId } from "@/api/comment";

import LvCommentsForm from "./CommentsForm";
import LvCommentsItem from "./CommentsItem";

export default {
  name: "LvComments",
  components: {
    LvCommentsForm,
    LvCommentsItem,
  },
  data() {
    return {
      comments: [],
      tmp: [],
    };
  },
  props: {
    slug: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["token"]),
  },
  async mounted() {
    await this.fetchComments(this.slug);
  },
  methods: {
    // 初始化
    async fetchComments(topic_id) {
      console.log("comment ", topic_id);
      fetchCommentsByTopicId(topic_id).then((response) => {
        const { data } = response;
        this.comments = data;
      });
    },
    reloadPage() {
      location.reload();
    }
  },
};
</script>