<template>
  <div class="article_index">
    <el-container>
      <el-header>
        <Head :IsPC="$attrs.IsPC" @keydown="search"></Head>
      </el-header>
      <el-container>
        <el-aside width="300px" v-if="$attrs.IsPC">目录</el-aside>
        <el-main>
          <div :class="$attrs.IsPC ? 'body pc20' : 'body'">
            <div class="title">
              <span class="til">{{ item.title }}</span>
              <span class="hengxian"></span>
              <div class="info">
                <span
                  ><i class="el-icon-time"></i>&nbsp;{{
                    item.createTime.substring(0, 10)
                  }}</span
                >
                <span
                  ><i class="el-icon-menu"></i>&nbsp;{{ item.cateName }}</span
                >
                <span
                  ><i class="el-icon-collection-tag"></i>&nbsp;
                  <span v-for="(item, index) in item.tags" :key="index">{{
                    item.tagName
                  }}</span>
                </span>
              </div>
            </div>
            <div class="context">
              <MarkdownPreview
                :height="400"
                :initialValue="item.context"
                theme="oneDark"
              />
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import MarkdownPreview from "@/components/markdown/components/preview";
import Head from "@/components/head";
export default {
  name: "article",
  created() {
    let _this = this;
    if (this.$route.query.id != null) {
      this.$http.get(`/article/get/${this.$route.query.id}`).then(obj => {
        if (obj) {
          _this.item = obj;
        } else {
          _this.item = {
            articleId: 0,
            cateId: 0,
            title: "文章不存在",
            context: "文章不存在",
            cateName: "",
            tagNames: [],
            createTime: "2020-01-01"
          };
        }
      });
    }
  },
  components: {
    Head,
    MarkdownPreview
  },
  data() {
    return {
      item: {
        articleId: 0,
        cateId: 0,
        title: "加载中...",
        context: "",
        cateName: "",
        tagNames: [],
        createTime: "2020-01-01"
      }
    };
  },
  methods: {
    search(val) {
      // 点击事件里面写
      this.$router.push({
        path: "/",
        query: { searchValue: val }
      });
    }
  }
};
</script>
<style lang="less">
.article_index {
  width: 100%;
  .el-header {
    padding: 0;
  }
  .el-aside {
    border-right: 1px solid rgb(201, 201, 201);
  }
  .body {
    .title {
      display: flex;
      flex-direction: column;
      .til {
        font-size: 32px;
        margin-bottom: 15px;
      }
      .info {
        margin-top: 10px;
        color: #888888;
        font-size: 12px;
        span {
          padding-right: 20px;
        }
      }
    }
    .context {
      margin-top: 30px;
    }
  }
}
</style>
