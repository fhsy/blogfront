<template>
  <div class="list_index">
    <div class="warp" v-for="(item, index) in articleList" :key="index">
      <router-link to="/mark">
        <div class="item">
          <div class="title">{{ item.title }}</div>
          <span class="hengxian"></span>
          <div class="info">
            <span
              ><i class="el-icon-time"></i>&nbsp;{{
                item.createTime.substring(0, 10)
              }}</span
            >
            <span><i class="el-icon-menu"></i>&nbsp;励志文章</span>
            <span><i class="el-icon-collection-tag"></i>&nbsp;励志文章</span>
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
  props: ["cateId"],
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
      this.getArticleList()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getArticleList()
      console.log(`当前页: ${val}`);
    },
    getArticleList() {
      this.$http.get("/article/index_list",{
          page: this.page,
          size: this.size
      }).then(obj => {
        this.articleList = obj.data.records;
        this.total = obj.data.total;
      });
    }
  },
  watch: {
    cateIdVal(curVal, oldVal) {
       console.log(curVal);
       
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
