<template>
  <div class="question">
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subject">
              <el-select style="width:220px;" v-model="searchForm.subject" placeholder="请选择学科">
                <el-option
                  v-for="item in subjectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="阶段" prop="step">
              <el-select style="width:220px;" v-model="searchForm.step" placeholder="请选择阶段">
                <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="enterpri">
              <el-select style="width:220px;" v-model="searchForm.enterpri" placeholder="请选择企业">
                <el-option
                  v-for=" item in enterpriseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型" prop="type">
              <el-select style="width:220px;" v-model="searchForm.type" placeholder="请选择题型">
                <el-option
                  v-for=" (value,name) in typeObj"
                  :key="name"
                  :label="value"
                  :value="name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select style="width:220px;" v-model="searchForm.difficulty" placeholder="请选择难度">
                <el-option
                  v-for=" (value,name) in difficultyObj"
                  :key="name"
                  :label="value"
                  :value="name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" prop="username">
              <el-input style="width:220px;" v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select style="width:220px;" v-model="searchForm.status" placeholder="请选择难状态">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker
                style="width:220px;"
                v-model="searchForm.create_date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input style="width:700px;" v-model="searchForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clear">清除</el-button>
              <el-button type="primary" @click="addQuestion">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card style="margin-top:15px;">
      <el-table border :data="questionList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="题目" width="280px">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">
            <span>{{scope.row.subject_name}}.{{stepObj[scope.row.step]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            <span>{{typeObj[scope.row.type]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{color: scope.row.status == 1 ? '#6ac144':'red'}"
            >{{scope.row.status == 1?'启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作" width="260px">
          <template slot-scope="scope">
            <el-button type="primary" @click="editQusetion">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status == 1?'info':'success'"
            >{{scope.row.status == 1?'禁用':'启用'}}</el-button>
            <el-button type="danger" @click="deleteQuestion(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <question-edit
      ref="questionEditRef"
      :subjectList="subjectList"
      :enterpriseList="enterpriseList"
      :stepObj="stepObj"
      :typeObj="typeObj"
      :difficultyObj="difficultyObj"
    ></question-edit>
  </div>
</template>

<script>
import QuestionEdit from "./question-add-or-update";
export default {
  name: "question",
  components: {
    QuestionEdit
  },
  data() {
    return {
      subjectList: [], // 学科列表
      enterpriseList: [], // 企业列表
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //阶段
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //题型
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" }, //难度
      searchForm: {
        subject: "", //学科id
        step: "", //阶段
        enterpri: "", //企业
        type: "", //题型
        difficulty: "", //难度
        username: "", //作者
        status: "", //状态
        create_date: "", //日期
        title: "" //标题
      },
      questionList: []
    };
  },
  created() {
    // 获取学科列表
    this.getSubjectListData();
    // 获取企业列表
    this.getEnterpriseListData();
    // 获取题库列表
    this.getQuestionListData();
  },
  methods: {
    // 获取学科列表
    async getSubjectListData() {
      const res = await this.$axios.get("/subject/list");
      if (res.data.code == 200) {
        this.subjectList = res.data.data.items;
      }
    },
    // 获取企业列表
    async getEnterpriseListData() {
      const res = await this.$axios.get("/enterprise/list");
      if (res.data.code == 200) {
        this.enterpriseList = res.data.data.items;
      }
    },
    // 获取题库列表
    async getQuestionListData() {
      const res = await this.$axios.get("/question/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });
      if (res.data.code == 200) {
        this.questionList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 搜索
    search() {
      this.page = 1;
      this.getQuestionListData();
    },
    // 清空
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    // 新增试题
    addQuestion() {
      this.$refs.questionEditRef.dialogVisible = true;
    },
    // 编辑试题
    editQusetion() {},
    // 改变状态
    async changeStatus(id) {
      const res = await this.$axios.post("/question/status", { id });
      if (res.data.code == 200) {
        this.getQuestionListData();
      }
    },
    // 删除试题
    async deleteQuestion(id) {
      const res = await this.$axios.post("/question/remove", { id });
      if (res.data.code == 200) {
        this.getQuestionListData();
      }
    }
  }
};
</script>

<style>
</style>