// 帖子管理
<template>
  <div>
    <div class="mb-5">
      <article v-for="(item, index) in articleList" :key="index" class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              :src="`https://cn.gravatar.com/avatar/${item.userId}?s=164&d=monsterid`"
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
                  >
                    {{ "#" + tag.name }}
                  </router-link>
                </span>

                <span class="is-hidden-mobile">浏览:{{ item.view }}</span>
              </div>
            </div>
          </nav>
        </div>
        <div class="mt-3">
          <router-link :to="{ name: 'topic-edit', params: { id: item.id } }">
            <span class="tag is-warning">编辑</span>
          </router-link>
          <a>
            <span class="tag is-danger ml-3" @click="handleDelete(item.id)"
              >删除</span
            >
          </a>
        </div>
      </article>
    </div>
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
import { getList, deletePost } from "@/api/post";
import Pagination from "@/components/Pagination";

export default {
  name: "AllPosts",
  components: { Pagination },
  data() {
    return {
      articleList: [],
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
      getList(this.page.current, this.page.size).then((response) => {
        const { data } = response;
        this.page.current = data.current;
        this.page.total = data.total;
        this.page.size = data.size;
        this.articleList = data.records;
      });
    },
    handleDelete(id) {
      deletePost(id).then((value) => {
        const { code, message } = value;
        if (code === 200) {
          this.$message.success(message);
          location.reload();
        } else {
          this.$message.error(message);
        }
      });
    },
  },
};
</script>