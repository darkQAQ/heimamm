<template>
  <div class="user">
    <el-card>
      <el-form :model="userForm" inline ref="userFormRef" label-width="80px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userForm.username" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="userForm.email" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select
            v-model="userForm.role_id"
            placeholder="请选择"
            style="width:150px;margin-right:30px"
          >
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="default" @click="resetForm">清除</el-button>
          <el-button type="primary" @click="addUser">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1" style="color:#6ac144">启用</span>
            <span v-if="scope.row.status == 0" style="color:red">禁用</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status == 1?'info':'success'"
            >{{scope.row.status == 1?'禁用':'启用'}}</el-button>
            <el-button type="primary" @click="removeUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      style="margin-top:15px;text-align:center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[2, 3, 4, 10]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <user-edit ref="userEdit" :mode='mode'></user-edit>
  </div>
</template>

<script>
import UserEdit from "./user-add-or-updata";
export default {
  name: "UserList",
  components: {
    UserEdit
  },
  data() {
    return {
      userForm: {
        username: "", //昵称
        email: "", //邮箱
        role_id: "" //角色
      },
      page: 1, //页码
      limit: 2, //一页显示多少
      userList: [], //用户列表
      total: 0, //总页数
      mode:'add'
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const res = await this.$axios.get("/user/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.userForm
        }
      });
      if (res.data.code == 200) {
        this.userList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    //清除
    resetForm() {
      this.$refs.userFormRef.resetFields();
    },
    //搜索
    search() {
      this.page = 1;
      this.getUserInfo();
    },
    //切换每页显示数量
    handleSizeChange(val) {
      this.limit = val;
      this.search();
      // console.log(`每页 ${val} 条`);
    },
    //切换页面
    handleCurrentChange(val) {
      this.page = val;
      this.getUserInfo();
      // console.log(`当前页: ${val}`);
    },
    //改变用户状态
    async changeStatus(id) {
      const res = await this.$axios.post("/user/status", { id });
      if (res.data.code == 200) {
        this.search();
      }
    },
    //删除用户
    removeUser(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/user/remove", { id });
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.search();
          }
        })
        .catch(() => {});
    },
    //新增用户
    addUser() {
      //每次打开之前清空数据
      (this.$refs.userEdit.userForm = {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //电话
        role_id: "", //角色
        status: "", //状态
        remark: "" //备注
      }),
        // 清除校验
        this.$nextTick(() => {
          //移除表单项的校验结果。
          // this.$refs.userEdit.$refs.userFormRef.clearValidate();

          //对整个表单进行重置，
          this.$refs.userEdit.$refs.userFormRef.resetFields();
        });

      this.$refs.userEdit.dialogVisible = true;
      this.$refs.userEdit.mode = "add";

      // this.$refs.userEdit.resetFields();
    },
    //编辑用户
    editUser(row) {
      //赋值
      this.$refs.userEdit.userForm = JSON.parse(JSON.stringify(row));
      this.$refs.userEdit.dialogVisible = true;
      this.mode = "edit";
      this.$nextTick(()=>{
        //移除表单项的校验结果。
        //不能调用重置  会把数据移出 
          this.$refs.userEdit.$refs.userFormRef.clearValidate();
      })
    }
  }
};
</script>

<style>
</style>