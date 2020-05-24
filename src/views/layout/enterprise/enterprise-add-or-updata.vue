<template>
  <div class="enterprise">
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div class="title" slot="title">{{mode == 'add'?'新增企业':'编辑企业'}}</div>
      <el-form :rules="rules" :model="enterpriseForm" ref="enterpriseFormRef" label-width="80px">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="enterpriseForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="enterpriseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="enterpriseForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="enterpriseForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="enterpriseForm.remark"></el-input>
        </el-form-item>
      </el-form>
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
      mode: "add",
      dialogVisible: false,
      enterpriseForm: {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //简称
        intro: "", //企业简介
        remark: "" //备注
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    subForm() {
      this.$refs.enterpriseFormRef.validate(async valid => {
        if (!valid) return;
        let res = null;
        if (this.mode == "add") {
          res = await this.$axios.post("/enterprise/add", this.enterpriseForm);
        } else {
          res = await this.$axios.post("/enterprise/edit", this.enterpriseForm);
        }
        if (res.data.code == 200) {
          this.$message({
            message: this.mode == 'add'?'新增成功':'编辑成功',
            type: "success"
          });
          this.$parent.search();
          this.dialogVisible = false;
        }
      });
    }
  },
  watch: {
    dialogVisible(newValue) {
      //   监听dialogVisible 窗口关闭口 清空校验
      if (!newValue) {
        this.$refs.enterpriseFormRef.clearValidate();
      }
    }
  }
};
</script>

<style lang="less">
.enterprise {
  .title {
    text-align: center;
    color: #fff;
    background-color: #0e9ff9;
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>