<template>
  <div class="index">
    <Head></Head>

    <!-- 搜索栏 -->
    <div class="search">
      <el-input
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        class="input"
        @input="search"
      >
      </el-input>
      <router-link to="/mark">
        <el-button type="primary" icon="el-icon-edit" round>写博文</el-button>
      </router-link>
    </div>
    <div class="opt">
      <!-- 搜索选项 -->
      <div class="search_opt" v-if="searchValue != ''">
        <span
          @click="setSearch(4)"
          v-if="searchIndex == 4"
          style="background-color: #F0F0F0;"
          >标题</span
        >
        <span @click="setSearch(4)" v-if="searchIndex != 4">标题</span>
        <span
          @click="setSearch(5)"
          v-if="searchIndex == 5"
          style="background-color: #F0F0F0;"
          >内容</span
        >
        <span @click="setSearch(5)" v-if="searchIndex != 5">内容</span>
      </div>
      <!-- 排序列表 -->
      <Order
        class="order"
        :orderIndex="orderIndex"
        @change="addv($event)"
      ></Order>
    </div>

    <!-- 文章列表 -->
    <div class="list">
      <ul v-if="orderIndex == 0">
        <li v-for="(val, key) in list">
          <!-- 文章信息 -->
          <div class="info">
            <!-- 标题 -->
            <span class="title">{{ val.title }}</span>
            <!-- 描述 -->
            <span class="desc">{{ val.context }}</span>
          </div>
          <!-- 封面图片 -->
          <div class="img">
            <!-- <img
              style="width:180px"
              src="http://localhost:9091/blog-api/img/20200430150806img_34f9f763a6e67595c34b0ce0c0fcace7.jpg"
            /> -->
          </div>
        </li>
      </ul>
      <div v-if="orderIndex == 1">
        <div v-for="(val, key) in list">
          <span>{{ val.tagName }}</span>
          <ul v-for="(articleVal, key) in val.articleList">
            <li>
              <!-- 文章信息 -->
              <div class="info">
                <!-- 标题 -->
                <span class="title">{{ articleVal.title }}</span>
                <!-- 描述 -->
                <span class="desc">{{ articleVal.context }}</span>
              </div>
              <!-- 封面图片 -->
              <div class="img">
                <img
                  style="width:180px"
                  src="http://localhost:9091/blog-api/img/20200430150806img_34f9f763a6e67595c34b0ce0c0fcace7.jpg"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="orderIndex == 2">
        <div v-for="(val, key) in list">
          <span>{{ val.cateName }}</span>
          <ul v-for="(articleVal, key) in val.articleList">
            <li>
              <!-- 文章信息 -->
              <div class="info">
                <!-- 标题 -->
                <span class="title">{{ articleVal.title }}</span>
                <!-- 描述 -->
                <span class="desc">{{ articleVal.context }}</span>
              </div>
              <!-- 封面图片 -->
              <div class="img">
                <img
                  style="width:180px"
                  src="http://localhost:9091/blog-api/img/20200430150806img_34f9f763a6e67595c34b0ce0c0fcace7.jpg"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Order from "@/components/order";
import Head from "@/components/head";
export default {
  name: "mark",
  components: {
    Order,
    Head
  },
  data() {
    return {
      searchValue: "",
      list: [],
      searchIndex: 4,
      orderIndex: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get("/article/index_list").then(obj => {
        this.list = obj.list;
      });
    },
    search() {
      this.$http
        .get("/article/index_list", {
          val: this.searchValue,
          valType: this.searchIndex
        })
        .then(obj => {
          this.list = obj.list;
        });
    },
    setSearch(index) {
      this.searchIndex = index;
      this.$http
        .get("/article/index_list", {
          val: this.searchValue,
          valType: index
        })
        .then(obj => {
          this.list = obj.list;
        });
    },
    addv(type) {
      this.orderIndex = type;
      type += 1;
      let val = this.searchValue;
      let valType = this.searchIndex;
      this.$http
        .get("/article/index_list", { type, val, valType })
        .then(obj => {
          console.log(obj.list);

          this.list = obj.list;
        });
    }
  }
};
</script>
<style lang="less">
.index {
  padding: 20px 15%;
  // 搜索
  .search {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .input {
      width: 85%;
    }
  }
  .opt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    // 搜索选项
    .search_opt {
      display: flex;
      span {
        width: 100px;
        padding: 10px;
        margin: 5px;
        border-radius: 10px;
      }
    }
  }
  // 列表
  .list {
    padding-top: 20px;
    ul {
      li {
        list-style-type: none;
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #d9d9d9;
        .info {
          display: flex;
          flex-direction: column;
          width: 80%;
          padding-right: 30px;
          .title {
            font-size: 26px;
            color: rgb(15, 15, 15);
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .desc {
            color: rgb(80, 80, 80);
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
