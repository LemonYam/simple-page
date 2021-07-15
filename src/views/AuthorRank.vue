// 用户排行
<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>🏆 作者榜</span>
    </div>
    <div>
      <article v-for="(author, index) in infoList" :key="index" class="media">
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
        <div class="media-right">
          <!-- <div style="display: none" v-if="fetchInfo(author.id, index)">
            判断是否关注
          </div> -->
          <button
            v-if="hasFollow[index]"
            class="button is-success button-center is-fullwidth"
            @click="handleUnFollow(author.id, index)"
          >
            已关注
          </button>

          <button
            v-else
            class="button is-link button-center is-fullwidth"
            @click="handleFollow(author.id, index)"
          >
            关注
          </button>
        </div>
      </article>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import { getAllInfo } from "@/api/user";
import { follow, hasFollow, unFollow } from "@/api/follow";
import Vue from "vue";

export default {
  name: "AuthorRank",
  data() {
    return {
      infoList: [],
      hasFollow: [],
    };
  },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  created() {
    this.fetchUserList();
  },
  methods: {
    fetchUserList() {
      getAllInfo().then((response) => {
        const { data } = response;
        this.infoList = data;
        if (this.token != null && this.token !== "") {
          for (let i = 0; i < this.infoList.length; ++i) {
            hasFollow(this.infoList[i].id).then((value) => {
              const { data } = value;
              // this.hasFollow[index] = data.hasFollow;
              Vue.set(this.hasFollow, i, data.hasFollow);
            });
          }
        }
      });
    },
    handleFollow: function (id, index) {
      if (this.token != null && this.token !== "") {
        follow(id).then((response) => {
          const { message } = response;
          this.$message.success(message);
          // 数组更新需要主动触发响应
          Vue.set(this.hasFollow, index, !this.hasFollow[index]);
        });
      } else {
        this.$message.success("请先登录");
      }
    },
    handleUnFollow: function (id, index) {
      unFollow(id).then((response) => {
        const { message } = response;
        this.$message.success(message);
        Vue.set(this.hasFollow, index, !this.hasFollow[index]);
      });
    },
  },
};
</script>

<style scoped>
</style>