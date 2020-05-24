<template>
  <div class="subject">
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="searchForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="default" @click="clear">清除</el-button>
          <el-button type="primary" @click="addSubject">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top:15px;">
      <el-table :data="subjectList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="intro" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span
              :style="{color: scope.row.status == '0'?'red' : 'green'}"
            >{{scope.row.status === 0 ? '禁用' : '启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button type="primary" @click="editSubject(scope.row)">编辑</el-button>
            <el-button
              :type="scope.row.status == 0?'success':'info'"
              @click="changeStatus(scope.row.id)"
            >{{scope.row.status == 0?'启用':'禁用'}}</el-button>
            <el-button type="primary" @click="deleteSubject(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <subject-edit ref="subjectedit"></subject-edit>
  </div>
</template>

<script>
import SubjectEdit from "./subject-add-or-updata";
export default {
  name: "subject",
  components: {
    SubjectEdit
  },
  data() {
    return {
      searchForm: {
        name: "", //学科名称
        rid: "", //学科编号
        username: "", //创建者用户名
        status: "" //状态
      },
      page: 1, //页数
      limit: 2, //一页显示多少
      total: 0, //总页数
      subjectList: [] //学科列表
    };
  },
  created() {
    this.getSubjectInfo();
  },
  methods: {
    async getSubjectInfo() {
      const res = await this.$axios.get("/subject/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });
      if (res.data.code == 200) {
        this.subjectList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 搜索
    search() {
      this.page = 1;
      this.getSubjectInfo();
    },
    // 清空
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    // 添加学科
    addSubject() {
      this.$refs.subjectedit.subjectForm = {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简介
        intro: "", //学科简称
        remark: "" //备注
      };
      this.$refs.subjectedit.dialogVisible = true;
      this.$refs.subjectedit.mode = "add";
    },
    // 删除学科
    async deleteSubject(id) {
      const res = await this.$axios.post("/subject/remove", { id });
      if (res.data.code == 200) {
        this.search();
      }
    },
    // 改变状态
    async changeStatus(id) {
      const res = await this.$axios.post("/subject/status", { id });
      if (res.data.code == 200) {
        this.getSubjectInfo();
      }
    },
    // 编辑学科
    editSubject(row) {
      console.log(row);

      const { id, rid, name, short_name, intro, remark } = row;
      this.$refs.subjectedit.subjectForm = {
        id,
        rid,
        name,
        short_name,
        intro,
        remark
      };
      this.$refs.subjectedit.dialogVisible = true;
      this.$refs.subjectedit.mode = "edit";
    },
    //切换每页显示多少
    handleSizeChange(val) {
      this.limit = val;
      this.search();
      // console.log(`每页 ${val} 条`);
    },
    // 切换页码
    handleCurrentChange(val) {
      this.page = val;
      this.getSubjectInfo();
      // console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
</style>