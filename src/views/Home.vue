// 论坛主页
<template>
  <div>
    <div class="box">📢&nbsp;{{ billboard.content }}</div>
    <div class="columns">
      <div class="column">
        <post-card :isMute="user.isMute" :token="token"></post-card>
        <author-rank :userList="userList"></author-rank>
        <news :news="news"></news>
        <promotion :list="list"></promotion>
      </div>
      <div class="column is-three-quarters">
        <post-list></post-list>
      </div>
    </div>
  </div>
</template>

<script>
// 请求接口引入
import { mapGetters } from "vuex";
import { getBillboard } from "@/api/billboard";
import { getAllInfo } from "@/api/user";
import { getNews } from "@/api/tip";
import { getList } from "@/api/promote";

// 组件引入
import PostCard from "@/components/HomeCard/PostCard";
import AuthorRank from "@/components/HomeCard/AuthorRank";
import Promotion from "@/components/HomeCard/Promotion";
import News from "@/components/HomeCard/News";
import PostList from "@/components/HomeCard/PostList";

export default {
  name: "Home",

  components: { PostList, PostCard, AuthorRank, Promotion, News },

  computed: {
    ...mapGetters(["token", "user"]),
  },

  data() {
    return {
      billboard: { content: "测试页面" },
      isMute: false,
      userList: [
        {
          avatar: "https://images.cnblogs.com/cnblogs_com/lemonyam/2000734/o_21071514325801.jpg",
          username: "Lemon",
          createTime: "2021/6/12",
          score: 3,
        },
        {
          avatar: "https://images.cnblogs.com/cnblogs_com/lemonyam/2000734/o_21071514330502.jpg",
          username: "steven",
          createTime: "2021/6/13",
          score: 2,
        },
        {
          avatar: "https://images.cnblogs.com/cnblogs_com/lemonyam/2000734/o_21071514324703.jpg",
          username: "yam",
          createTime: "2021/6/15",
          score: 1,
        },
      ],
      news: {},
      list: [
        { title: "CSDN", link: "https://www.csdn.net" },
        { title: "博客园", link: "https://www.cnblogs.com" },
        { title: "Github", link: "https://www.github.com" },
      ],
    };
  },

  created() {
    // this.fetchBillboard();
    // this.fetchUserList();
    // this.fetchNews();
    // this.fetchList();
  },
  methods: {
    // // 获取公告板信息
    // async fetchBillboard() {
    //   getBillboard().then((value) => {
    //     const { data } = value;
    //     this.billboard = data;
    //   });
    // },
    // // 获取用户排行信息
    // async fetchUserList() {
    //   getAllInfo().then((response) => {
    //     const { data } = response;
    //     this.userList = data;
    //   });
    // },
    // // 获取今日资讯
    // async fetchNews() {
    //   getNews().then((value) => {
    //     const { data } = value;
    //     this.news = data;
    //   });
    // },
    // // 获取帖子列表
    // async fetchList() {
    //   getList().then((response) => {
    //     const { data } = response;
    //     this.list = data;
    //   });
    // },
  },
};
</script>