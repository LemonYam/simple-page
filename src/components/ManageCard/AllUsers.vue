// 用户管理
<template>
  <div>
    <article v-for="(author, index) in userList" :key="index" class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img
            :src="`https://cn.gravatar.com/avatar/${author.id}?s=164&d=monsterid`"
            style="border-radius: 50%"
          />
        </figure>
      </div>
      <div class="media-content has-text-grey">
        <router-link :to="{ path: `/member/${author.username}/home` }">
          {{ author.username }}
        </router-link>
        <div class="mr-1 mt-2" style="font-size: 10px">
          入驻于:{{ dayjs(author.createTime).format("YYYY/MM/DD") }}
          <code>积分:{{ author.score }}</code>
        </div>
      </div>
      <div class="mt-3">
        <router-link :to="{ path: '/member/' + author.username + '/setting' }">
          <span class="tag is-primary mr-3">编辑</span>
        </router-link>
        <a v-if="author.isMute" @click="undoMute(author)">
          <span class="tag is-warning">解禁</span>
        </a>
        <a v-else @click="doMute(author)">
          <span class="tag is-warning">禁言</span>
        </a>
        <a @click="deleteUser(author)">
          <span class="tag is-danger ml-3">删除</span>
        </a>
      </div>
    </article>

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
import { update, getAllUsers, deleteUserById } from "@/api/user";

import Pagination from "@/components/Pagination";

export default {
  name: "AllUsers",
  components: { Pagination },

  data() {
    return {
      userList: [],
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
      getAllUsers(this.page.current, this.page.size).then((response) => {
        const { data } = response;
        this.page.current = data.current;
        this.page.total = data.total;
        this.page.size = data.size;
        this.userList = data.records;
      });
    },
    doMute(user) {
      user.isMute = true;
      update(user).then((res) => {
        this.$message.success("禁言成功");
      });
    },
    undoMute(user) {
      user.isMute = false;
      update(user).then((res) => {
        this.$message.success("解禁成功");
      });
    },
    deleteUser(user) {
      deleteUserById(user.id).then((result) => {
        this.$message.success("删除用户成功");
        location.reload();
      });
    },
  },
};
</script>


<style scoped>
</style>