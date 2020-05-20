<template>
  <!-- 排序列表 -->
  <div class="order">
    <span>展示方式</span>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{ showList[orderIndex]
        }}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          class="clearfix"
          @click.native="setIndex(key)"
          v-for="(val, key) in showList"
          :key="key"
        >
          {{ val }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: "Order",
  props: ["orderIndex"],
  data() {
    return {
      showList: ["时间顺序", "标签展示", "分类展示"]
    };
  },
  methods: {
    setIndex(key) {
      this.$emit("change", key);
    }
  }
};
</script>
<style lang="less">
.order {
  display: flex;
  padding: 10px 0;
  list-style-type: none;
  padding: 0 10px;
  font-size: 16px;
  color: rgb(15, 15, 15);
  .el-dropdown-link {
    padding: 0 10px;
    font-size: 16px;
    color: rgb(167, 167, 167);
  }
}
</style>
