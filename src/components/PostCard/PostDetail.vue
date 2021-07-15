<template>
  <el-card class="box-card" shadow="never">
    <div slot="header" class="has-text-centered">
      <p class="is-size-5 has-text-weight-bold">{{ post.title }}</p>
      <div class="has-text-grey is-size-7 mt-3">
        <span>{{ dayjs(post.createTime).format("YYYY/MM/DD HH:mm:ss") }}</span>
        <el-divider direction="vertical" />
        <span>发布者：{{ postOwner.alias }}</span>
        <el-divider direction="vertical" />
        <span>查看：{{ post.view }}</span>
      </div>
    </div>

    <div id="preview" />

    <nav class="level has-text-grey is-size-7 mt-6">
      <div class="level-left">
        <p class="level-item">
          <b-taglist>
            <router-link
              v-for="(tag, index) in tags"
              :key="index"
              :to="{ name: 'tag', params: { name: tag.name } }"
            >
              <b-tag type="is-info is-light mr-1"
                ><i class="el-icon-price-tag"></i>
                {{ tag.name }}
              </b-tag>
            </router-link>
          </b-taglist>
        </p>
      </div>
      <div v-if="token && user.id === postOwner.id" class="level-right">
        <router-link
          class="level-item"
          :to="{ name: 'topic-edit', params: { id: post.id } }"
        >
          <span
            ><i class="el-icon-edit" style="color: blue; font-size: 2em"></i
          ></span>
        </router-link>
        <a class="level-item ml-3">
          <span @click="handleDelete(post.id)"
            ><i class="el-icon-delete" style="color: red; font-size: 2em"></i
          ></span>
        </a>
      </div>
    </nav>
  </el-card>
</template>

<script>
import { deletePost } from "@/api/post";

import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
  props: {
    token: { type: String, default: null },
    user: { type: Object, default: null },
    post: { type: Object, default: null },
    postOwner: { type: Object, default: null },
    tags: { type: Array, default: [] },
  },

  data() {
    return {};
  },

  created() {},

  watch: {
    // props 由需要时间从后端获取，而钩子函数会先执行，导致只能获取默认值，采用监听属性来渲染文章
    post: {
      handler(newVal, oldVal) {
        this.post = newVal;
        if (this.post) {
          this.renderMarkdown(this.post.content);
        }
      },
    },
  },

  methods: {
    // 初始化markdown
    renderMarkdown(md) {
      Vditor.preview(document.getElementById("preview"), md, {
        hljs: { style: "github" },
      });
    },

    // 删除帖子
    handleDelete(id) {
      deletePost(id).then((value) => {
        const { code, message } = value;
        if (code === 200) {
          this.$message.success(message);
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 500);
        } else {
          this.$message.error(message);
        }
      });
    },
  },
};
</script>