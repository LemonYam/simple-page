<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>🏆 作者榜</span>
    </div>
    <div>
      <article
        v-for="(author, index) in userList.slice(0, 3)"
        :key="index"
        class="media"
      >
        <div class="media-left">
          <figure class="image is-48x48">
            <!-- <img
              :src="`https://cn.gravatar.com/avatar/${author.id}?s=164&d=monsterid`"
              style="border-radius: 50%"
            /> -->
            <img
              :src="author.avatar"
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
      </article>
    </div>
    <hr />
    <router-link
      :to="{ path: `/rank` }"
      style="height: 30px; background-color: red"
    >
      <div style="text-align: center">
        <el-button style="padding: 0px" type="text"
          >查看完整榜单<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </div>
    </router-link>
  </el-card>
</template>

<script>
export default {
  name: "AuthorRank",
  props: {
    userList: {
      type: Array,
      default: null,
    },
  },
};
</script>

<style scoped>
</style>