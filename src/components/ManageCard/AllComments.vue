// 评论管理
<template>
  <div>
    <comments-item
      v-for="(comment, index) in comments"
      :key="`comment-${comment.id}`"
      :idx="index"
      :comment="comment"
    ></comments-item>

    <hr />
    <!--分页-->
    <pagination
      v-show="page.total > 0"
      :total="page.total"
      :page.sync="page.current"
      :limit.sync="page.size"
      @pagination="init"
    />
  </div>
</template>

<script>
import CommentsItem from "@/components/CommentCard/CommentsItem";
import Pagination from "@/components/Pagination";

import { fetchAllComments } from "@/api/comment";

export default {
  name: "AllComments",
  components: { CommentsItem, Pagination },
  data() {
    return {
      comments: [],

      articleList: [],
      page: {
        current: 1,
        size: 5,
        total: 0,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      fetchAllComments(this.page.current, this.page.size).then((response) => {
        const { data } = response;
        this.page.current = data.current;
        this.page.total = data.total;
        this.page.size = data.size;
        this.comments = data.records;
      });
    },
  },
};
</script>

<style scoped>
</style>