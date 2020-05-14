<template>
  <div class="head_index">
    <el-row :gutter="20">
      <el-col :span="6" align="center" Valign="middle"
        ><div class="grid-content bg-purple" Valign="middle">
          <span class="logo">LOGO</span>
        </div></el-col
      >
      <el-col :span="6"><router-link to="/"><div class="grid-content bg-purple" style="color: #409EFF">首页</div></router-link></el-col>
      <el-col :span="6" Valign="middle"
        ><div class="grid-content bg-purple" Valign="middle">
          <el-input
            placeholder="搜索"
            prefix-icon="el-icon-search"
            v-model="searchValue"
            class="input"
            @keydown.enter.native="search"
          ></el-input></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <router-link to="/mark">
            <el-button type="primary" icon="el-icon-edit" round
              >写博文</el-button
            >
          </router-link>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  props:['searchValue'],
  methods: {
    search() {
     this.$emit("keydown", this.searchValue);
    }
  }
};
</script>

<style lang="less">
.head_index {
  background-color: white;
  height: 54px;
  line-height: 50px;
  box-shadow: 0px 1px 5px 0px rgb(168, 168, 168);
  // logo
  .logo {
    font-size: 24px;
    color: #409eff;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
}
</style>
