// 管理页
<template>
  <div>
    <el-card shadow="never">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="user">
          <div><all-users></all-users></div>
        </el-tab-pane>
        <el-tab-pane label="文章管理" name="artical">
          <div><all-post></all-post></div>
        </el-tab-pane>
        <el-tab-pane label="评论管理" name="comments">
          <all-comments></all-comments>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import AllUsers from "@/components/ManageCard/AllUsers";
import AllPost from "@/components/ManageCard/AllPosts";
import AllComments from "@/components/ManageCard/AllComments";

export default {
  name: "ManagePage",
  components: {
    AllUsers,
    AllPost,
    AllComments,
  },
  data() {
    return {
      activeName: "user",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName);
    },
  },
};
</script>

<style scoped>
</style>