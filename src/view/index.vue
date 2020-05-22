<template>
  <div class="index_index">
    <el-container>
      <el-header>
        <Head :IsPC="$attrs.IsPC" :searchValue="searchValue" @keydown="search"></Head>
      </el-header>
      <el-main :class="$attrs.IsPC?'body pc20':'body'">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8" v-if="$attrs.IsPC"
            ><div class="grid-content bg-purple">
              <Info @click="flushCom"></Info></div
          ></el-col>
          <el-col :span="18"
            ><div class="grid-content bg-purple">
              <List :cateId="cateId" :tagId="tagId" :searchValue="searchValue" ></List></div
          ></el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Head from "@/components/head";
import List from "@/components/list";
import Info from "@/components/info";
export default {
  created() {
    if(this.$route.query.searchValue != null){
      this.searchValue = this.$route.query.searchValue;
    }
  },
  components: {
    Head,
    List,
    Info
  },
  data() {
    return {
      cateId: 0,
      tagId: 0,
      searchValue: ''
    }
  },
  methods: {
    flushCom(id, type) {
      if(type == 1){
        this.cateId = id;
      }
      if(type == 2){
        this.tagId = id;
      }
    },
    search(val){
      this.searchValue = val;
    }
  }
};
</script>

<style lang="less">
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important ;
}
.index_index {
  width: 100%;
  .el-header {
    padding: 0;
  }
}
</style>
