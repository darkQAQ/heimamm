<template>
  <div class="questionEdit">
    <el-dialog :visible.sync="dialogVisible" fullscreen>
      <div class="title">{{mode == 'add'?'添加试题':'编辑试题'}}</div>
      <el-form
        :rules="rules"
        class="form"
        label-position="left"
        :model="questionForm"
        ref="questionFormRef"
        label-width="120px"
      >
        <el-form-item label="学科" prop="subject">
          <el-select class="selectWidth" v-model="questionForm.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select class="selectWidth" v-model="questionForm.step" placeholder="请选择学科">
            <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select class="selectWidth" v-model="questionForm.enterprise" placeholder="请选择企业">
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            size="large"
            :props="{value:'label'}"
            :options="options"
            v-model="questionForm.city"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model=" questionForm.type">
            <el-radio v-for="(value,name) in typeObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model=" questionForm.difficulty">
            <el-radio v-for="(value,name) in difficultyObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template> 

<script>
import { regionData } from "element-china-area-data";
export default {
  name: "QuestionEdit",
  props: {
    subjectList: Array,
    enterpriseList: Array,
    stepObj: Object,
    typeObj: Object,
    difficultyObj: Object
  },
  created() {
    //   console.log(regionData);
  },
  data() {
    return {
      mode: "add",
      dialogVisible: false,
      options: regionData,
      questionForm: {
        subject: "", //学科
        step: "", //阶段
        enterprise: "", //企业
        type: "2", //题型
        difficulty: "", //难度
        city: [] //城市
      },
      rules: {}
    };
  }
};
</script>

<style lang="less">
.questionEdit {
  .title {
    color: #fff;
    padding-left: 15px;
    height: 54px;
    line-height: 54px;
    background-color: #04bcfa;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .form {
    width: 832px;
    margin: 20px auto;
  }
  .selectWidth {
    width: 300px;
  }
}
</style>