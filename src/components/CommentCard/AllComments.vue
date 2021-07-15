<template>
  <div>
    <comments-item
      v-for="(comment, index) in comments"
      :key="`comment-${comment.id}`"
      :idx="index"
      :comment="comment"
      @reloadComments="reloadPage"
    ></comments-item>
  </div>
</template>

<script>
import CommentsItem from "@/components/CommentCard/CommentsItem";

import { fetchAllComments } from "@/api/comment";

export default {
  components: {
    CommentsItem,
  },
  data() {
    return {
      comments: [],
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    fetchComments() {
      fetchAllComments().then((response) => {
        const { data } = response;
        this.comments = data;
        // console.log(this.comments);
      });
    },
    reloadPage() {
      console.log("fjiwq");
      location.reload();
    },
  },
};
</script>

<style scoped>
</style>