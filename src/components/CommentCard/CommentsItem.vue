<template>
  <article class="media">
    <figure class="media-left image is-48x48">
      <img
        :src="`https://cn.gravatar.com/avatar/${comment.userId}?s=164&d=monsterid`"
      />
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.username }}</strong>
          <small class="ml-2">{{ comment.createTime | date }}</small>
          <br />
          {{ comment.content }}
        </p>
      </div>
    </div>
    <a
      class="mt-4"
      v-if="comment.username == user.username || user.username == 'root'"
      @click="deleteComment(comment.id)"
      ><span class="tag is-danger">删除</span></a
    >
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteCommentById } from "@/api/comment";

export default {
  name: "LvCommentsItem",
  props: {
    comment: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  methods: {
    deleteComment(id) {
      deleteCommentById(id);
      // 子组件使用 $emit 触发父组件的自定义事件
      // console.log("delete");
      this.$emit("reloadComments", this.comment.topicId);
      this.$message.success("成功删除留言");
    },
  },
};
</script>