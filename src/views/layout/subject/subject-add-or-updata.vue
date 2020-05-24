<template>
  <div class="subjectEdit">
    <el-dialog :visible.sync="dialogVisible" width="600px">
      <div class="title" slot="title">{{mode == 'add'?'新增学科':'编辑学科'}}</div>
      <el-form :rules="rules" :model="subjectForm" ref="subjectFormRef" label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="subjectForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="subjectForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="subjectForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="subjectForm.remark"></el-input>
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
      dialogVisible: false,
      mode: "add",
      subjectForm: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简介
        intro: "", //学科简称
        remark: "" //备注
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入学科简介", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入学科简称", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    subForm() {
      this.$refs.subjectFormRef.validate(async valid => {
        if (!valid) return;
        let res = null;
        if (this.mode == "add") {
          res = await this.$axios.post("/subject/add", this.subjectForm);
        } else {
          res = await this.$axios.post("/subject/edit", this.subjectForm);
        }
        if (res.data.code == 200) {
          this.$message({
            message: this.mode == 'add'?'新增成功':'编辑成功',
            type: "success"
          });
          this.dialogVisible =false;
          this.$parent.search();
        }
      });
    }
  },
  watch: {
    dialogVisible(newValue) {
      if (!newValue) {
        this.$refs.subjectFormRef.clearValidate();
      }
    }
  }
};
</script>

<style lang="less">
.subjectEdit {
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