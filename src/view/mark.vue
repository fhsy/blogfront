<template>
  <div class="markdown">
    <!-- 文章列表 -->
    <div class="text_warp">
      <!-- 操作 -->
      <div class="options">
        <el-button type="primary">回首页</el-button>
        <el-button type="primary" @click="add">新建文章</el-button>
      </div>
      <!-- 文章list -->
      <div class="text_list">
        <div class="text">
          <ul>
            <li v-for="(val, key) in list" @click="setIndex(key)">
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
                <span><i class="el-icon-s-promotion"></i>发布</span>
                <span><i class="el-icon-delete"></i>删除</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 编辑区 -->
    <div class="edit">
      <div class="top">
        <input type="text" v-model="title" />
        <div>{{tips}}</div>
      </div>
      <MarkdownPro v-model="context" style="height: 100%" />
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
      tips: "已保存"
    };
  },
  created() {
    this.$http
      .get("/article/list")
      .then(obj => {
        this.list = obj.list;
        this.context = obj.list[0].context;
        this.title = obj.list[0].title;
      })
      .catch(obj => {
        console.log("obj", obj);
      });
  },
  methods: {
    add() {
      this.$http.post("/article/add");
      this.$http.get("/article/list").then(obj => {
        this.list = obj.list;
        this.context = obj.list[0].context;
        this.title = obj.list[0].title;
         this.selectIndex = 0;
      });
    },
    // 点击其他文章
    setIndex(index) {
      this.selectIndex = index;
      this.context = this.list[index].context;
      this.title = this.list[index].title;
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
        this.$http.post('/article/save',{
          articleId: id,
          context: val
        }).then(function name(params) {
          _this.list[selectIndex].context=val; //内容回显
           _this.tips="已保存";
        })
      }, 1000);
    },

    /**
     * 标题3秒自动保存
     */
    titleAutoSave(val, id, selectIndex) {
      if (this.titleTimeObj) {
        clearTimeout(this.titleTimeObj);
      }
      let _this = this;
      this.titleTimeObj = setTimeout(() => {
        this.$http.post('/article/save',{
          articleId: id,
          title: val
        }).then(function name(params) {
           _this.list[selectIndex].title=val; //标题回显
           _this.tips="已保存";
        })
      }, 1000);
    }
  },
  watch:{
        context(val){ //监听内容变化
          this.tips="保存中..";
          this.contextAutoSave(val,this.list[this.selectIndex].articleId,this.selectIndex);
        },
        title(val){ //监听内容变化
        this.tips="保存中..";
          this.titleAutoSave(val,this.list[this.selectIndex].articleId,this.selectIndex);
        }
  }
};
</script>

<style scoped>
.markdown {
  display: flex;
  width: 100%;
  height: 100%;
}
/* 编辑区 */
.edit {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.edit .top {
  height: 60px;
  display: flex;
}
.edit .top input {
  width: 85%;
  height: 100%;
  padding: 0px 30px;
  font-size: 36px;
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
/* 右侧  */
.text_warp {
  width: 30%;
  height: 100%;
  border-right: 1px solid #d9d9d9;
  overflow-y: scroll;
}
.text_warp .options {
}
.text_warp .text_list {
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
}
.text_warp .text_list .text ul li .select {
  height: 100%;
  width: 8px;
}
.text_warp .text_list .text ul li i {
  padding: 20px;
}
.text_warp .text_list .text ul li .info {
  display: flex;
  flex-direction: column;
  width: 45%;
}
.text_warp .text_list .text ul li .info span {
  padding: 8px 0;
}
.text_warp .text_list .text ul li .info .title {
  font-size: 16px;
  color: rgb(15, 15, 15);
}
.text_warp .text_list .text ul li .info .desc {
  font-size: 12px;
  color: rgb(80, 80, 80);
}

.text_warp .text_list .text ul li .option {
  display: flex;
  flex-direction: column;
}
</style>
