<template>
  <div class="question">
    <el-card>
      <el-form inline :model="questionForm" ref="questionFormRef" label-width="120px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subject">
              <el-select style="width:200px" v-model="questionForm.subject" placeholder="请选择学科">
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
              <el-select style="width:200px" v-model="questionForm.step" placeholder="请选择阶段">
                <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="enterprise">
              <el-select style="width:200px" v-model="questionForm.enterprise" placeholder="请选择企业">
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型" prop="type">
              <el-select style="width:200px" v-model="questionForm.type" placeholder="请选择题型">
                <el-option v-for="(value,name) in typeObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select style="width:200px" v-model="questionForm.difficulty" placeholder="请选择难度">
                <el-option
                  v-for="(value,name) in difficultyObj"
                  :key="name"
                  :label="value"
                  :value="name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" prop="username">
              <el-input style="width:200px" v-model="questionForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select style="width:200px" v-model="questionForm.status" placeholder="请选择状态">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker
                style="width:200px"
                v-model="questionForm.create_date"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input style="width:650px" v-model="questionForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="claer">清除</el-button>
              <el-button type="primary" @click="addQuestion">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card style="margin-top:30px">
      <el-table :data="questionList" style="width: 100%">
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
              :style="{color:scope.row.status == 0?'red':'#6ac144'}"
            >{{scope.row.status == 0 ?'禁用':'启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column width="280px" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="editQuestion(scope.row.id)">编辑</el-button>
            <el-button
              :type="scope.row.status == 0 ?'success':'info'"
              @click="changeStatus(scope.row.id)"
            >{{scope.row.status == 0?'启用':'禁用'}}</el-button>
            <el-button type="danger" @click="deleteQuestion(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:30px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
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
      subjectList: [], //学科列表
      enterpriseList: [], //企业列表
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //阶段
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //题型
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" }, //难度
      questionForm: {
        subject: "", //学科
        step: "", //阶段
        enterprise: "", //企业
        type: "", //题型
        difficulty: "", //难度
        username: "", //作者
        status: "", //状态
        create_date: "", //日期
        title: "" //标题
      },
      page: 1, //页码
      limit: 2, //一页显示多少
      total: 0, //总页数
      questionList: [] //题库列表
    };
  },
  created() {
    this.getSubjectListData();
    this.getEnterpriseListData();
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
    // 获取学科列表
    async getEnterpriseListData() {
      const res = await this.$axios.get("/enterprise/list");
      if (res.data.code == 200) {
        this.enterpriseList = res.data.data.items;
      }
    },
    // 获取学科列表
    async getQuestionListData() {
      const res = await this.$axios.get("/question/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.questionForm
        }
      });
      if (res.data.code == 200) {
        this.questionList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 搜索
    async search() {
      this.page = 1;
      this.getQuestionListData();
    },
    // 清除
    claer() {
      this.$refs.questionFormRef.resetFields();
      this.search();
    },
    // 改变状态
    async changeStatus(id) {
      const res = await this.$axios.post("/question/status", { id });
      if (res.data.code == 200) {
        this.getQuestionListData();
      }
    },
    // 删除试题
    deleteQuestion(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/question/remove", { id });
          if (res.data.code == 200) {
            this.getQuestionListData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 切换显示数
    handleSizeChange(val) {
      this.limit = val;
      this.search();
      // console.log(`每页 ${val} 条`);
    },
    // 切换页码
    handleCurrentChange(val) {
      this.page = val;
      this.getQuestionListData();
      // console.log(`当前页: ${val}`);
    },
    // 新增试题
    addQuestion() {
      this.$refs.questionEditRef.dialogVisible = true;
      this.$refs.questionEditRef.mode = "add";
    },
    // 编辑试题
    editQuestion() {
      this.$refs.questionEditRef.dialogVisible = true;
      this.$refs.questionEditRef.mode = "edit";
    }
  }
};
</script>

<style>
</style>