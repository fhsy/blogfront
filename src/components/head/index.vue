<template>
  <div class="head_index">
    <el-row :gutter="20">
      <el-col :span="5" align="center" Valign="middle"
        ><div class="grid-content bg-purple" Valign="middle">
          <router-link to="/"><span class="logo">白羊</span></router-link>
        </div></el-col>
      <el-col :span="7" v-if="$attrs.IsPC">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link" >
            <i class="el-icon-notebook-2"/>&nbsp;归档<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              实战项目
              <i class="el-icon-position"></i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="hover" style="padding-left:20px">
          <span class="el-dropdown-link" >
            <i class="el-icon-ship"/>&nbsp;Contact<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <span @click="See('https://cn.vuejs.org/')">
              <el-dropdown-item class="clearfix">
                <img src="../../assets/vue.png" style="width:12px">
                Vue
                <i class="el-icon-position"></i>
              </el-dropdown-item>
            </span>
            <span @click="See('https://www.jianshu.com/')">

              <el-dropdown-item class="clearfix">
                <img src="../../assets/jianshu.png" style="width:12px">
                简书
                <i class="el-icon-position"></i>
              </el-dropdown-item>
            </span>
            <span @click="See('https://element.eleme.cn/')">
              <el-dropdown-item class="clearfix">
                 <img src="../../assets/el.png" style="width:12px">
                Element
                <i class="el-icon-position"></i>
              </el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>
        
      
      </el-col>
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
      <el-col :span="6" v-if="$attrs.IsPC"
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
    },
    See(href){
      window.open(href, '_blank');
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
