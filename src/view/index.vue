<template>
  <div class="index">
    <el-container>
      <el-header>
        <Head></Head>
      </el-header>
      <el-main class="body">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <Info @click="flushCom"></Info></div
          ></el-col>
          <el-col :span="18"
            ><div class="grid-content bg-purple">
              <List :cateId="cateId"></List></div
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
    let id = this.$route.query.cateId;
    console.log("id", id);
  },
  components: {
    Head,
    List,
    Info
  },
  data() {
    return {
      cateId: 0
    }
  },
  methods: {
    flushCom(cateId) {
      console.log(cateId);
      this.cateId = cateId;
    }
  }
};
</script>

<style lang="less">
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important ;
}
.index {
  width: 100%;
  .el-header {
    padding: 0;
  }
  .body {
    padding: 0px 20%;
  }
}
</style>
