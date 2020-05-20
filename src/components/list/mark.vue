<template>
  <div>
    <!-- 操作 -->
    <div class="options">
      <router-link to="/">
        <el-button type="primary" icon="el-icon-house">首页</el-button>
      </router-link>
      <el-button type="danger" icon="el-icon-plus" @click="add">添加</el-button>
    </div>
    <!-- 文章list -->
    <div class="text_list">
      <div class="text">
        <ul>
          <li
            v-for="(val, key) in list"
            :key="key"
            @click="setIndex(key)"
            :class="key == selectIndex ? 'selectLi' : ''"
          >
            <div
              class="select"
              v-if="key == selectIndex"
              style="background-color: #ec7259;"
            ></div>
            <div class="select" v-if="key != selectIndex"></div>
            <!-- 状态标识 -->
            <i
              class="el-icon-document"
              style="color: #909399;font-size:32px;"
              v-if="val.state == 'DRAFT'"
            ></i>
            <i
              class="el-icon-document-checked"
              style="color: #67C23A;font-size:32px;"
              v-if="val.state == 'RELEASE'"
            ></i>
            <!-- 信息 -->
            <div class="info">
              <!-- 标题 -->
              <span class="title">{{ val.title }}</span>
              <!-- 内容 -->
              <span class="desc">{{ val.context }}</span>
            </div>
            <!-- option -->
            <div class="option">
              <el-dropdown trigger="click" v-if="selectIndex == key">
                <span class="el-dropdown-link">
                  <i class="el-icon-setting el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    @click.native="release(val.articleId)"
                    v-if="val.state == 'DRAFT'"
                    icon="el-icon-s-promotion"
                    >发布</el-dropdown-item
                  >
                  <el-dropdown-item
                    v-if="val.state == 'RELEASE'"
                    icon="el-icon-circle-check"
                    >已发布</el-dropdown-item
                  >
                  <el-dropdown-item
                    icon="el-icon-collection-tag"
                    @click.native="cateTag = true"
                    >标签分类</el-dropdown-item
                  >
                  <!-- <el-dropdown-item icon="el-icon-s-tools"
                    >设置发布样式</el-dropdown-item
                  > -->
                  <el-dropdown-item
                    icon="el-icon-delete"
                    @click.native="del(val.articleId)"
                    >删除文章</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <el-drawer
      title="设置博文的标签和分类"
      :visible.sync="cateTag"
      direction="rtl"
      size="25%"
    >
      <el-form label-width="80px">
        <el-form-item label="标签选择">
          <el-select
            v-model="tagValue"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入文字搜索, Enter键入可添加自定义标签"
            @change="CTag"
            style="width:95%"
          >
            <el-option
              v-for="item in tagsList"
              :key="item.tagId"
              :label="item.label"
              :value="item.tagName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类选择">
          <el-select
            v-model="categoryValue"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入文字搜索, Enter键入可添加自定义分类"
            @change="CCate"
            style="width:95%"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.cateId"
              :label="item.label"
              :value="item.cateName"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      selectIndex: 0,
      cateTag: false,
      tagsList: [],
      tagValue: [],
      categoryList: [],
      categoryValue: []
    };
  },
  created() {
    this.getArticleList();
    this.getCategoryList();
    this.getTagsList();
  },
  methods: {
    /**
     * 获取文章列表
     */
    getArticleList() {
      this.$http.get("/article/list",{type: 'RD'}).then(obj => {
        this.list = obj.data;
        this.updateCommotData(0);
      });
    },
    /**
     * 获取分类集合
     */
    getCategoryList() {
      this.$http.get("/category/list").then(obj => {
        this.categoryList = obj.data;
      });
    },
    /**
     * 获取标签集合
     */
    getTagsList() {
      this.$http.get("/tags/list").then(obj => {
        this.tagsList = obj.data;
      });
    },

    /**
     * 贴标签
     */
    CTag() {
      if (this.tagValue.length == 0) {
        return false;
      }
      let articleId = this.list[this.selectIndex].articleId;
      this.$http
        .post("/article-tag/stick", {
          articleId,
          tagNames: this.tagValue.join(",")
        })
        .then(obj => {
          this.$notify({
            title: "提示",
            type: "success",
            message: "操作成功",
            duration: 500
          });
        });
    },
    /**
     * 选择分类
     */
    CCate() {
      if (this.categoryValue.length == 0) {
        return false;
      }
      if (this.categoryValue.length == 2) {
        this.categoryValue.splice(0, 1);
      }
      let articleId = this.list[this.selectIndex].articleId;
      let cateName = this.categoryValue[0];
      this.$http
        .post("/article/cate_save", {
          articleId,
          cateName
        })
        .then(obj => {
          this.$notify({
            title: "提示",
            message: "操作成功",
            type: "success",
            duration: 500
          });
        });
    },
    // 点击其他文章
    setIndex(index) {
      this.selectIndex = index;
      // 更换标题和内容显示
      this.updateCommotData(index);
    },
    // 添加
    add() {
      this.$http.post("/article/add").then(o => {
        this.selectIndex = 0;
        this.getArticleList();
      });
    },
    // 删除博文
    del(id) {
      let _this = this;
      if (confirm("确定要删除吗") == true) {
        this.$http
          .post("/article/save", {
            articleId: id,
            state: "RECOVERY"
          })
          .then(res => {
            _this.list.splice(_this.selectIndex, 1);
            _this.selectIndex = 0;
            //_this.updateCommotData(0);
            _this.$notify({
              title: "提示",
              message: "操作成功",
              type: "success",
              duration: 800
            });
          });
        return true;
      }
    },
    // 发布博文
    release(id) {
      let _this = this;
      this.$http
        .post("/article/save", {
          articleId: id,
          state: "RELEASE"
        })
        .then(res => {
          _this.list[_this.selectIndex].state = "RELEASE";
          _this.$notify({
            title: "提示",
            message: "操作成功",
            duration: 800
          });
        });
    },
    //更新基础数据
    updateCommotData(index) {
      this.title = this.list[index].title;
      this.context = this.list[index].context;
      this.$emit("change", this.list[index]);

      this.tagValue = [];
      this.list[index].tags.forEach(element => {
        this.tagValue.push(element.tagName);
      });
      this.categoryValue = [];
      if (this.list[index].cateName != null) {
        this.categoryValue = [this.list[index].cateName];
      }
    }
  }
};
</script>

<style lang="less">
.options{
  padding: 20px;
  border-bottom:1px solid rgb(212, 212, 212);
  display: flex;
  justify-content: space-evenly;
}
.text_warp .text_list .text ul {
  display: flex;
  flex-direction: column;
}
.text_warp .text_list .text ul li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  height: 100px;
  cursor: pointer;
}
.text_warp .text_list .text ul li:hover {
  background-color: #e6e6e6;
}
.text_warp .text_list .text ul li .select {
  height: 100%;
  width: 8px;
}
.text_warp .text_list .text ul li i {
  padding: 20px;
}
.text_warp .text_list .text ul li .option {
  width: 120px;
}
.text_warp .text_list .text ul li .info {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.text_warp .text_list .text ul li .info span {
  margin: 8px 0;
}
.text_warp .text_list .text ul li .info .title {
  font-size: 16px;
  color: rgb(15, 15, 15);
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.text_warp .text_list .text ul li .info .desc {
  font-size: 12px;
  color: rgb(80, 80, 80);
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text_warp .text_list .text ul li .option {
  display: flex;
  flex-direction: column;
  z-index: 99;
}
</style>
