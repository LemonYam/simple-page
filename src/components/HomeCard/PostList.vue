// 帖子列表
<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="最新帖子" name="latest">
            <article
              v-for="(item, index) in articleList"
              :key="index"
              class="media"
            >
              <div class="media-left">
                <figure class="image is-48x48">
                  <!-- <img
                    :src="`https://cn.gravatar.com/avatar/${item.userId}?s=164&d=monsterid`"
                    style="border-radius: 5px"
                  /> -->
                  <img
                    :src="item.avatar"
                    style="border-radius: 5px"
                  />
                </figure>
              </div>
              <div class="media-content">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.title"
                      placement="top"
                    >
                      <router-link
                        :to="{ name: 'post-detail', params: { id: item.id } }"
                      >
                        <span class="is-size-10">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link
                        class="level-item"
                        :to="{ path: `/member/${item.username}/home` }"
                      >
                        {{ item.alias }}
                      </router-link>

                      <span class="mr-1">
                        发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>

                      <span
                        v-for="(tag, index) in item.tags"
                        :key="index"
                        class="tag is-hidden-mobile is-success is-light mr-1"
                      >
                        <router-link
                          :to="{ name: 'tag', params: { name: tag.name } }"
                          ><i class="el-icon-price-tag"></i>
                          {{ tag.name }} &nbsp;
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile"
                        ><i class="el-icon-view"></i>&nbsp;{{ item.view }}</span
                      >
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
          <el-tab-pane label="热门帖子" name="hot">
            <article
              v-for="(item, index) in articleList"
              :key="index"
              class="media"
            >
              <div class="media-left">
                <figure class="image is-48x48">
                  <!-- <img
                    :src="`https://cn.gravatar.com/avatar/${item.userId}?s=164&d=monsterid`"
                    style="border-radius: 5px"
                  /> -->
                  <img :src="item.avatar" style="border-radius: 5px" />
                </figure>
              </div>
              <div class="media-content">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="item.title"
                      placement="top"
                    >
                      <router-link
                        :to="{ name: 'post-detail', params: { id: item.id } }"
                      >
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link
                        class="level-item"
                        :to="{ path: `/member/${item.username}/home` }"
                      >
                        {{ item.alias }}
                      </router-link>

                      <span class="mr-1">
                        发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>

                      <span
                        v-for="(tag, index) in item.tags"
                        :key="index"
                        class="tag is-hidden-mobile is-success is-light mr-1"
                      >
                        <router-link
                          :to="{ name: 'tag', params: { name: tag.name } }"
                          ><i class="el-icon-price-tag"></i>
                          {{ tag.name }} &nbsp;
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile"
                        ><i class="el-icon-view"></i>&nbsp;{{ item.view }}</span
                      >
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--分页-->
      <pagination
        v-show="page.total > 0"
        :total="page.total"
        :page.sync="page.current"
        :limit.sync="page.size"
        @pagination="init"
      />
    </el-card>
  </div>
</template>

<script>
import { getList } from "@/api/post";
import Pagination from "@/components/Pagination";

export default {
  name: "PostList",
  components: { Pagination },
  data() {
    return {
      activeName: "latest",
      articleList: [
        {
          avatar:
            "https://images.cnblogs.com/cnblogs_com/lemonyam/2000734/o_21071514325801.jpg",
          title: "test",
          alias: "lemon",
          createTime: "2021/6/16",
          tags: [{ name: "tmp" }, { name: "hhh" }],
          view: 37,
        },
        {
          avatar:
            "https://images.cnblogs.com/cnblogs_com/lemonyam/2000734/o_21071514330502.jpg",
          title: "test",
          alias: "steven",
          createTime: "2021/6/17",
          tags: [{ name: "tmp" }, { name: "hhh" }],
          view: 37,
        },
        {
          avatar:
            "https://images.cnblogs.com/cnblogs_com/lemonyam/2000734/o_21071514324703.jpg",
          title: "test",
          alias: "yam",
          createTime: "2021/6/16",
          tags: [{ name: "tmp" }, { name: "hhh" }],
          view: 37,
        },
      ],
      page: {
        current: 1,
        size: 10,
        total: 0,
        tab: "latest",
      },
    };
  },
  created() {
    // this.init(this.tab);
  },
  methods: {
    init(tab) {
      getList(this.page.current, this.page.size, tab).then((response) => {
        const { data } = response;
        this.page.current = data.current;
        this.page.total = data.total;
        this.page.size = data.size;
        this.articleList = data.records;
      });
    },
    handleClick(tab) {
      this.init(tab.name);
    },
  },
};
</script>