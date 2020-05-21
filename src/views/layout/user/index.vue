<template>
  <div class="user">
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-form-item label="用户名称" prop="username">
          <el-input style="width:150px;" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input style="width:150px;" v-model="searchForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="searchForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="addUser">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color:red;">禁用</span>
            <span v-if="scope.row.status == 1" style="color:#6ac144;">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>
            <el-button @click="changeStatus(scope.row.id)"
              :type="scope.row.status == 0 ? 'success' : 'info'"
            >{{scope.row.status == 0 ?'启用':'禁用'}}</el-button>

            <el-button type="primary" @click="deleteUser(scope.row.id,scope.row.username)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2,4,6]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <user-edit ref="userEdit"></user-edit>
  </div>
</template>

<script>
import UserEdit from './user-add-or-updata'
export default {
  name: "user",
  data() {
    return {
      searchForm: {
        username: "", // 昵称
        email: "", // 邮箱
        role_id: "" // 角色数字 1、超级管理员 2管理员、3老师、 4学生
      },
      page: 1, // 查询时候的页码
      limit: 2, // 查询时候的页容量(每页查询多少条)
      userList: [], //用户列表
      total: 0 //总条数
    };
  },
  created() {
    this.getUserListInfo();
  },
  methods: {
    async getUserListInfo() {
      const res = await this.$axios.get("/user/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });
      if (res.data.code == 200) {
        this.userList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    search() {
      this.page = 1;
      this.getUserListInfo();
    },
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUserListInfo();
      // console.log(`当前页: ${val}`);
    },
    deleteUser(id, username) {
      // alert(id);
      this.$confirm(`确认删除${username}？`)
        .then(async _ => {
          const res = await this.$axios.post("/user/remove", { id });
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success"
            });
            this.search();
          }
        })
        .catch(_ => {});
    },
    addUser(){
      this.$refs.userEdit.dialogVisible = true;
      this.$refs.userEdit.mode = 'add';
    },
    async changeStatus(id){
      const res = await this.$axios.post('/user/status',{id});
      if(res.data.code == 200){
        this.search();
      }
    }
    
  },
  components:{
    UserEdit
  }
};
</script>

<style>
</style>