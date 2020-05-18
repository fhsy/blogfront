<template>
  <div class="markdown_index">
    <!-- 文章列表 -->
    <div class="text_warp">
      <List @change="changeList"></List>
    </div>
    <!-- 编辑区 -->
    <div class="edit">
      <el-row class="tou">
        <el-col class="inp" :span="20">
          <input type="text" v-model="obj.title" @input="titleInput" placeholder="请输入标题" />
        </el-col>
        <el-col :span="4"
          ><div class="tips">
            <span
              v-if="tips == '已保存'"
              style="color: #67c23a;font-size: 24px;"
            >
              <i class="el-icon-check"></i>{{ tips }}
            </span>
            <span
              v-if="tips == '输入中..'"
              style="color: #E6A23C;font-size: 24px;"
            >
              <i class="el-icon-edit"></i>{{ tips }}
            </span>
            <span
              v-if="tips == '保存中..'"
              style="color: #F56C6C;font-size: 24px;"
            >
              <i class="el-icon-loading"></i>{{ tips }}
            </span>
          </div></el-col
        >
      </el-row>
      <MarkdownPro
        v-model="obj.context"
        style="height: 100%"
        v-on:input2="contextInput"
      />
    </div>
  </div>
</template>
<script>
import MarkdownPro from "@/components/markdown/components/pro";
import List from "../components/list/mark";
export default {
  name: "mark",
  components: {
    MarkdownPro,
    List
  },
  data() {
    return {
      // 文档内容
      obj: {
        title: "",
        context: ""
      },
      contextTimeObj: null,
      titleTimeObj: null,
      tips: "已保存"
    };
  },
  methods: {
    changeList(obj) {
      this.obj = obj;
    },
    /**
     * 内容1秒自动保存
     */
    contextAutoSave(val, id) {
      if (this.contextTimeObj) {
        clearTimeout(this.contextTimeObj);
      }
      let _this = this;
      this.contextTimeObj = setTimeout(() => {
        this.tips = "保存中..";
        this.$http
          .post("/article/save", {
            articleId: id,
            context: val
          })
          .then(function name(params) {
            //_this.list[selectIndex].context = val; //内容回显
            _this.tips = "已保存";
          });
      }, 1000);
    },
    /**
     * 标题1秒自动保存
     */
    titleAutoSave(val, id) {
      if (this.titleTimeObj) {
        clearTimeout(this.titleTimeObj);
      }
      let _this = this;
      this.titleTimeObj = setTimeout(() => {
        this.tips = "保存中..";
        this.$http
          .post("/article/save", {
            articleId: id,
            title: val
          })
          .then(function name(params) {
            //_this.list[selectIndex].title = val; //标题回显
            _this.tips = "已保存";
          });
      }, 1000);
    },
    titleInput() {
      //监听内容变化
      this.tips = "输入中..";
      this.titleAutoSave(this.obj.title, this.obj.articleId);
    },
    contextInput() {
      //监听内容变化
      this.tips = "输入中..";
      this.contextAutoSave(this.obj.context, this.obj.articleId);
    }
  }
};
</script>

<style scoped>
.markdown_index {
  display: flex;
  width: 100%;
  height: 100%;
}
.selectLi {
  background-color: #e6e6e6;
}
/* 左侧  */
.text_warp {
  width: 380px;
  height: 100%;
  border-right: 1px solid #d9d9d9;
  overflow-y: scroll;
}
/* 编辑区 */
.edit {
  width: 80%;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.edit .tou {
  height: 60px;
  line-height: 60px;
}
.edit .tou .inp {
  line-height: 78px;
}
.edit .tou input {
  width: 800px;
  height: 100%;
  padding: 0px 30px;
  font-size: 36px;
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
.edit .tou .tips {
  width: 200px;
}
</style>
