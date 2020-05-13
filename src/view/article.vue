<template>
  <div class="article_index">
    <el-container>
      <el-header>
        <Head @keydown="search"></Head>
      </el-header>
      <el-container>
        <el-aside width="300px">Aside</el-aside>
        <el-main>
          <div class="body">
              <div class="title">
                  <span></span>
              </div>
              <div class="context">
                <vue-markdown>{{ item.context }}</vue-markdown>
              </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";
import Head from "@/components/head";
export default {
  name: "article",
  created(){
    if(this.$route.query.item != null){
      this.item = this.$route.query.item;
    }
  },
  components: {
    Head,
    VueMarkdown
  },
  data() {
    return {
      item:{
        articleId: 0,
        cateId: 0,
        title: '',
        context: '333',
        cateName: '',
        tagNames: [],
        createTime: new Date()
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
  .el-aside{
    border-right: 1px solid rgb(201, 201, 201);
  }
}
</style>
