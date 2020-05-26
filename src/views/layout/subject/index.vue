<template>
  <div>
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
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="addSubject">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top:20px">
      <el-table :data="subjectList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.status == 0 ?'red':'#6ac144'}"
            >{{scope.row.status == 0?'禁用':'启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button type="primary" @click="editSubject(scope.row)">编辑</el-button>
            <el-button
              type="scope.row.status == 1 ?'success':'info'"
              @click="changeStatus(scope.row.id)"
            >{{scope.row.status==1?'禁用':'启用'}}</el-button>
            <el-button type="primary" @click="deleteSubject">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center">
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
    <subject-edit ref="subjectEdit"></subject-edit>
  </div>
</template>

<script>
import subjectEdit from "./subject-add-or-updata";
export default {
  components: {
    subjectEdit
  },
  data() {
    return {
      searchForm: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者用户名
        status: "" //状态
      },
      page: 1, //页码
      limit: 2, //一页显示多少条
      total: 0, //总页数
      subjectList: []
    };
  },
  created() {
    this.search();
  },
  methods: {
    // 搜索
    search() {
      this.page = 1;
      this.getSubjectList();
    },
    async getSubjectList() {
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
    // 清除
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    // 新增学科
    addSubject() {
      this.$refs.subjectEdit.mode = "add";
      this.$refs.subjectEdit.dialogVisible = true;
      this.$refs.subjectEdit.subjectForm = {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
      };
    },
    // 编辑学科
    editSubject(row) {
      const { id, rid, name, short_name, intro, remark } = row;
      this.$refs.subjectEdit.subjectForm = {
        id,
        rid,
        name,
        short_name,
        intro,
        remark
      };
      this.$refs.subjectEdit.mode = "edit";
      this.$refs.subjectEdit.dialogVisible = true;
    },
    // 改变状态
    async changeStatus(id) {
      const res = await this.$axios.post("/subject/status", { id });

      if (res.data.code == 200) {
        this.getSubjectList();
      }
    },
    // 删除学科
    deleteSubject() {},
    // 切换每页显示多少条
    handleSizeChange(val) {
      this.limit = val;
      this.search();
    },
    // 切换页码
    handleCurrentChange(val) {
      this.page = val;
      this.getSubjectList();
    }
  }
};
</script>

<style>
</style>