<template>
  <div class="info_index">
    <!-- 头部 -->
    <div class="top" align="center">
      <img
        class="img"
        src="https://fhs.faig.top/dist/img/202005121312501.jpg"
        style="width:80px"
      />
      <div class="name">fhs</div>
      <div class="info">
        <div>
          <span>{{ articleConut }}</span>
          <span class="text">文章</span>
        </div>
        <span class="shuxian"></span>
        <div>
          <span>{{ tagsConut }}</span>
          <span class="text">标签</span>
        </div>
      </div>
    </div>
    <!-- 分类 -->
    <div class="class" align="justify">
      <span class="title"
        ><i class="el-icon-menu" style="color: #888888;"></i>&nbsp;分类</span
      >
      <ul class="list">
        <li v-for="(item, index) in cateList" :key="index">
          <router-link
            to="/"
            @click.native="flushCom(item.cateId, 1, item.cateName)"
          >
            <div
              :class="
                item.cateName == selectCateValue ? 'item selectItem' : 'item'
              "
            >
              <div class="name">{{ item.cateName }}</div>
              <div class="count">{{ item.count }}</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 标签 -->
    <div class="class" align="justify">
      <span class="title"
        ><i class="el-icon-collection-tag" style="color: #888888;"></i
        >&nbsp;标签</span
      >
      <span class="tags">
        <router-link
          to="/"
          @click.native="flushCom(item.tagId, 2, item.tagName)"
          v-for="(item, index) in tagsList"
          :key="index"
        >
          <span
            :class="
              item.tagName == selectTagsValue ? 'text selectItem' : 'text'
            "
            >{{ item.tagName }}</span
          >
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 博文数量
      articleConut: 0,
      // 标签数量
      tagsConut: 0,
      // 分类集合
      cateList: [],
      // 标签集合
      tagsList: [],

      selectCateValue: "",
      selectTagsValue: ""
    };
  },
  created() {
    this.getInfo();
    this.getCateList();
    this.getTagsList();
  },
  methods: {
    flushCom(id, type, val) {
      if (type == 1) {
        if (this.selectCateValue == val) {
          id = 0;
          this.selectCateValue = 0;
        } else {
          this.selectCateValue = val;
        }
      }
      if (type == 2) {
        if (this.selectTagsValue == val) {
          id = 0;
          this.selectTagsValue = 0;
        } else {
          this.selectTagsValue = val;
        }
      }
      this.$emit("click", id, type);
    },
    getInfo() {
      this.$http.get("/base/info").then(obj => {
        this.articleConut = obj.data.articleConut;
        this.tagsConut = obj.data.tagsConut;
      });
    },
    getCateList() {
      this.$http.get("/category/class-count").then(obj => {
        this.cateList = obj.data;
      });
    },
    getTagsList() {
      this.$http.get("/tags/list").then(obj => {
        this.tagsList = obj.data;
      });
    }
  }
};
</script>

<style lang="less">
.info_index {
  background-color: white;
  box-shadow: 0px 0px 5px 0px rgb(168, 168, 168);
  border-radius: 2px;
  margin: 20px;
  padding: 15px;
}
.top {
  display: flex;
  flex-direction: column;
  color: #2c3e50;
  font-size: 18px;
  padding: 10px 0;
  border-bottom: 1px solid rgb(228, 228, 228);
  .img {
    border-radius: 50%;
  }
  .name {
    padding: 10px 0;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;
      padding: 0 30px;
      span {
        padding: 5px 0;
      }
      .text {
        font-size: 12px;
      }
    }
  }
}
.class {
  font-size: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgb(207, 207, 207);

  .tags {
    display: flex;
    padding-top: 15px;
    flex-wrap: wrap;
    .text {
      background-color: #f47e60;
      color: white;
      border-radius: 5px;
      box-shadow: 0px 1px 5px 0px rgb(168, 168, 168);
      padding: 5px;
      margin: 0 4px;
      line-height: 40px;
    }
    
  }
  .list {
    padding: 10px 0;
    li {
      list-style-type: none;
      padding: 5px 0;
      .item {
        background-color: white;
        box-shadow: 1px 1px 4px 0px rgb(168, 168, 168);
        border-radius: 2px;
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        .name {
          color: #409eff;
        }
        .count {
          background-color: #849b87;
          color: white;
          border-radius: 5px;
          padding: 2px 6px;
        }
      }
    }
  }
}
</style>
