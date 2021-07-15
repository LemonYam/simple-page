// 编辑帖子
<template>
  <section>
    <div class="columns">
      <div class="column is-full">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span><i class="fa fa fa-book"> 帖子 / 更新帖子</i></span>
          </div>
          <div>
            <el-form :model="topic" ref="topic" class="demo-topic">
              <el-form-item prop="title">
                <el-input
                  v-model="topic.title"
                  placeholder="输入新的帖子名称"
                ></el-input>
              </el-form-item>

              <!--Markdown-->
              <div id="vditor"></div>

              <b-taginput
                v-model="tags"
                class="my-3"
                maxlength="15"
                maxtags="3"
                ellipsis
                placeholder="请输入帖子标签，限制为 15 个字符和 3 个标签"
              />
              <el-form-item class="mt-3">
                <el-button type="primary" @click="handleUpdate()"
                  >更新
                </el-button>
                <el-button @click="resetForm('topic')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </section>
</template>

<script>
import { getPost, update } from "@/api/post";
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
  name: "EditPost",
  components: {},
  data() {
    return {
      topic: {},
      tags: [],
    };
  },
  created() {
    this.fetchTopic();
  },
  methods: {
    renderMarkdown(md) {
      this.contentEditor = new Vditor("vditor", {
        height: 460,
        placeholder: "输入要更新的内容",
        preview: {
          hljs: { style: "monokai" },
        },
        mode: "sv",
        after: () => {
          this.contentEditor.setValue(md);
        },
      });
    },
    fetchTopic() {
      getPost(this.$route.params.id).then((value) => {
        this.topic = value.data.topic;
        this.tags = value.data.tags.map((tag) => tag.name);
        this.renderMarkdown(this.topic.content);
      });
    },
    handleUpdate: function () {
      this.topic.content = this.contentEditor.getValue();
      update(this.topic).then((response) => {
        const { data } = response;
        // console.log(data);
        this.$message.success("修改成功");
        setTimeout(() => {
          this.$router.push({
            name: "post-detail",
            params: { id: data.id },
          });
        }, 800);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.contentEditor.setValue("");
      this.tags = "";
    },
  },
};
</script>

<style>
.vditor-reset pre > code {
  font-size: 100%;
}
</style>