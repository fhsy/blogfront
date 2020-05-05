<template>
  <div class="markdown">
    <!-- 文章列表 -->
    <div class="text_warp">
      <!-- 操作 -->
      <div class="options">
        <router-link to="/"
          ><el-button type="primary">回首页</el-button></router-link
        >
        <el-button type="primary" @click="add">新建文章</el-button>
      </div>
      <!-- 文章list -->
      <div class="text_list">
        <div class="text">
          <ul>
            <li
              v-for="(val, key) in list"
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
                <span
                  @click="release(val.articleId)"
                  v-if="val.state != 'RELEASE'"
                  style="color: #909399;"
                  class="icon_warp"
                  ><i class="el-icon-s-promotion"></i>发布</span
                >
                <div v-if="val.state == 'RELEASE'" style="color: #67C23A;">
                  <i class="el-icon-circle-check"></i>已发布
                </div>
                <span
                  @click="del(val.articleId)"
                  style="color: #909399;"
                  class="icon_warp"
                  ><i class="el-icon-delete"></i>删除</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 编辑区 -->
    <div class="edit">
      <div class="top">
        <input type="text" v-model="title" @input="titleInput(index)" />
        <el-select
          v-model="tagValue"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="贴标签"
          @change="CTag"
        >
          <el-option
            v-for="item in tagsList"
            :key="item.tagId"
            :label="item.label"
            :value="item.tagName"
          >
          </el-option>
        </el-select>
        <el-select
          @change="CCate(key)"
          v-model="categoryValue"
          placeholder="请选择分类"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.cateId"
            :label="item.label"
            :value="item.cateName"
          >
          </el-option>
        </el-select>
        <div :class="tips == '已保存' ? 'lv' : 'hong'">{{ tips }}</div>
      </div>
      <MarkdownPro
        v-model="context"
        style="height: 100%"
        v-on:input2="contextInput"
      />
    </div>
  </div>
</template>
<script>
import MarkdownPro from "@/components/markdown/components/pro";
export default {
  name: "mark",
  components: {
    MarkdownPro
  },
  data() {
    return {
      // 文档内容
      context: "",
      title: "",
      list: [],
      selectIndex: 0,
      contextTimeObj: null,
      titleTimeObj: null,
      tips: "已保存",
      tagsList: [],
      tagValue: [],
      categoryList: [],
      categoryValue: ""
    };
  },
  created() {
    this.getCategoryList();
    this.getTagsList();
    this.getArticleList();
  },
  methods: {
    /**
     * 获取文章列表
     */
    getArticleList() {
      this.$http.get("/article/list").then(obj => {
        this.list = obj.list;
        this.updateCommotData(0);
      });
    },
    /**
     * 获取分类集合
     */
    getCategoryList() {
      this.$http.get("/category/list").then(obj => {
        this.categoryList = obj.list;
      });
    },
    /**
     * 获取标签集合
     */
    getTagsList() {
      this.$http.get("/tags/list").then(obj => {
        this.tagsList = obj.list;
      });
    },

    /**
     * 贴标签
     */
    CTag() {
      let articleId = this.list[this.selectIndex].articleId;
      let tagIds = [];
      this.tagsList.forEach(element => {
        this.tagValue.forEach(e2 => {
          if (element.tagName == e2) {
            let tagId = element.tagId;
            tagIds.push(tagId);
          }
        });
      });
      this.$http
        .post("/article-tag/stick", { articleId, tagIds: tagIds.join(",") })
        .then(obj => {
          this.$notify({
            title: "提示",
            message: "操作成功",
            duration: 500
          });
        });
    },
    /**
     * 选择分类
     */
    CCate() {
      let articleId = this.list[this.selectIndex].articleId;
      console.log(articleId);
      this.categoryList.forEach(e => {
        if (e.cateName == this.categoryValue) {
          let cateId = e.cateId;
          this.$http.post("/article/save", { articleId, cateId }).then(obj => {
            this.list[this.selectIndex].cateId = cateId;
            this.$notify({
              title: "提示",
              message: "操作成功",
              duration: 500
            });
          });
        }
      });
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
            _this.updateCommotData(0);
            _this.$notify({
              title: "提示",
              message: "操作成功",
              duration: 800
            });
          });
        return true;
      }
    },

    // 添加
    add() {
      this.$http.post("/article/add").then(o => {
        this.selectIndex = 0;
        this.getArticleList();
      });
    },
    // 点击其他文章
    setIndex(index) {
      this.selectIndex = index;
      // 更换标题和内容显示
      this.updateCommotData(index);
    },

    //更新基础数据
    updateCommotData(index) {
      this.title = this.list[index].title;
      this.context = this.list[index].context;

      // 更换文章变更分类、标签
      // 初始化数据
      this.tagValue = [];
      this.categoryValue = "";
      // 变更分类
      let selectCate = this.categoryList.filter(
        e => e.cateId == this.list[index].cateId
      );
      if (selectCate.length > 0) {
        this.categoryValue = selectCate[0].cateName;
      }
      // 变更标签
      this.$http
        .get("/article-tag/getTagsByArticleId", {
          articleId: this.list[index].articleId
        })
        .then(obj => {
          obj.list.forEach(e => {
            this.tagValue.push(
              this.tagsList.filter(e2 => e2.tagId == e.tagId)[0].tagName
            );
          });
        });
    },

    /**
     * 内容1秒自动保存
     */
    contextAutoSave(val, id, selectIndex) {
      if (this.contextTimeObj) {
        clearTimeout(this.contextTimeObj);
      }
      let _this = this;
      this.contextTimeObj = setTimeout(() => {
        this.$http
          .post("/article/save", {
            articleId: id,
            context: val
          })
          .then(function name(params) {
            _this.list[selectIndex].context = val; //内容回显
            _this.tips = "已保存";
          });
      }, 1000);
    },
    /**
     * 标题1秒自动保存
     */
    titleAutoSave(val, id, selectIndex) {
      if (this.titleTimeObj) {
        clearTimeout(this.titleTimeObj);
      }
      let _this = this;
      this.titleTimeObj = setTimeout(() => {
        this.$http
          .post("/article/save", {
            articleId: id,
            title: val
          })
          .then(function name(params) {
            _this.list[selectIndex].title = val; //标题回显
            _this.tips = "已保存";
          });
      }, 1000);
    },
    titleInput() {
      //监听内容变化
      this.tips = "保存中..";
      this.titleAutoSave(
        this.title,
        this.list[this.selectIndex].articleId,
        this.selectIndex
      );
    },
    contextInput() {
      //监听内容变化
      this.tips = "保存中..";
      this.contextAutoSave(
        this.context,
        this.list[this.selectIndex].articleId,
        this.selectIndex
      );
    }
  }
};
</script>

<style scoped>
.selectLi {
  background-color: #e6e6e6;
}
.markdown {
  display: flex;
  width: 100%;
  height: 100%;
}
/* 编辑区 */
.edit {
  width: 75%;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.edit .top {
  height: 60px;
  display: flex;
}
.edit .top input {
  width: 40%;
  height: 100%;
  padding: 0px 30px;
  font-size: 36px;
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
/* 右侧  */
.text_warp {
  width: 25%;
  height: 100%;
  border-right: 1px solid #d9d9d9;
  overflow-y: scroll;
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
  width: 40%;
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
}
.lv{
  color: #67C23A;
  font-size: 24px;
}
.hong{
  color: red;
  font-size: 24px;

}
</style>
