<template>
  <div class="list_index">
    <div class="warp" v-for="(item, index) in articleList" :key="index">
      <router-link :to="{path: `/article/${item.articleId}`}">
        <div class="item">
          <div class="title">{{ item.title }}</div>
          <span class="hengxian"></span>
          <div class="info">
            <span
              ><i class="el-icon-time"></i>&nbsp;{{
                item.createTime.substring(0, 10)
              }}</span
            >
            <span><i class="el-icon-menu"></i>&nbsp;{{item.cateName}}</span>
            <span><i class="el-icon-collection-tag"></i>&nbsp;
            <span v-for="(item, index) in item.tagNames" :key="index">{{item}}</span>
            </span>
          </div>
        </div>
      </router-link>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[8, 15, 30, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: ["cateId", "tagId", "searchValue"],
  data() {
    return {
      articleList: [],
      page: 1,
      size: 8,
      total: 0
    };
  },
  created() {
    this.getArticleList();
    console.log(this.cateId);
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.getArticleList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getArticleList();
      console.log(`当前页: ${val}`);
    },
    getArticleList() {
      let data = {};
      data.page = this.page;
      data.size = this.size;
      if (this.cateId != 0) {
        data.cateId = this.cateId;
      }
      if (this.tagId != 0) {
        data.tagId = this.tagId;
      }
      if (this.searchValue != "") {
        data.searchValue = this.searchValue;
      }
      this.$http.get("/article/index_list", data).then(obj => {
        console.log(obj.data.records);
        
        this.articleList = obj.data.records;
        this.total = obj.data.total;
      });
    }
  },
  watch: {
    cateId: function() {
      this.getArticleList();
    },
    tagId: function() {
      this.getArticleList();
    },
    searchValue: function() {
      this.getArticleList();
    }
  }
};
</script>
<style lang="less">
.list_index {
  padding: 5px;
}
.warp {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px rgb(168, 168, 168);
  margin: 15px 0;
  .item {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    div {
      padding: 10px 0;
    }
    .title {
      color: #409eff;
      font-size: 18px;
    }
    .info {
      color: #888888;
      font-size: 12px;
      span {
        padding-right: 20px;
      }
    }
  }
}
</style>
