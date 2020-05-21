<template>
  <div class="userEdit">
    <el-dialog center :visible.sync="dialogVisible" width="600px">
      <div slot="title" class="title">{{mode == 'add'? '新增用户':'编辑用户'}}</div>
      <!-- form表单 开始 -->
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="userForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userForm.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="userForm.remark"></el-input>
        </el-form-item>
      </el-form>

      <!-- form表单 结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      mode: "",
      userForm: {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //手机号
        role_id: "", //角色
        status: "", //状态
        remark: "" //备注
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            validator: (relu, value, callback) => {
              if (!value) {
                callback(new Error("请输入邮箱!"));
              }
              const res = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (!res.test(value)) {
                callback(new Error("邮箱格式不正确!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            validator: (relu, value, callback) => {
              if (!value) {
                callback(new Error("请输入手机号!"));
              }
              const res = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (!res.test(value)) {
                callback(new Error("手机号格式不正确!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        role_id: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择角色状态", trigger: "change" }
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    subForm() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          const res = await this.$axios.post("/user/add", this.userForm);
          if (res.data.code == 200) {
            this.$message({
              message: this.mode == 'add'? '创建成功':'编辑成功',
              type: "success"
            });
            this.dialogVisible = false;
            this.$parent.search();
          }else{
              this.$message.error(res.data.message);
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.userEdit {
  .title {
    height: 53px;
    text-align: center;
    color: #fff;
    background-color: #0e9cfa;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>