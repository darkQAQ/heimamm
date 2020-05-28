<template>
  <div class="questionEdit">
    <el-dialog fullscreen :visible.sync="dialogVisible" center>
      <div class="title" slot="title">{{mode == 'add'?'新增试题':'编辑试题'}}</div>
      <el-form
        class="form"
        :rules="rules"
        :model="questionForm"
        ref="questionFormRef"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="学科" prop="subject">
          <el-select v-model="questionForm.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="questionForm.step" placeholder="请选择阶段">
            <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="questionForm.enterprise" placeholder="请选择企业">
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
          <el-radio-group v-model="questionForm.type">
            <el-radio v-for="(value, name) in typeObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="questionForm.difficulty">
            <el-radio v-for="(value, name) in difficultyObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="试题标题" class="setMargin" prop="title">
          <quill-editor v-model="questionForm.title" :options="{placeholder:'请在此输入试题标题...'}"></quill-editor>
        </el-form-item>
        <question-type :questionForm="questionForm"></question-type>
        <hr class="hrMargin" />
        <el-form-item label="答案解析" class="setMargin" prop="answer_analyze">
          <quill-editor
            v-model="questionForm.answer_analyze"
            :options="{placeholder:'请在此输入答案解析...'}"
          ></quill-editor>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="试题备注" prop="remark">
          <el-input v-model="questionForm.remark"></el-input>
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
import { regionData } from "element-china-area-data";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import QuestionType from "./question-type";
export default {
  name: "QuestionEdit",
  components: {
    quillEditor,
    QuestionType
  },
  props: {
    subjectList: Array,
    enterpriseList: Array,
    stepObj: Object,
    typeObj: Object,
    difficultyObj: Object
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
        city: "", //城市
        type: "", //题型
        difficulty: "", //难度
        title: "", //标题
        answer_analyze: "", //答案解析
        remark: "", //备注
        single_select_answer: "", //单选答案
        multiple_select_answer: [], //多选答案
        short_answer: "", //简答答案
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ] //选项，介绍，图片介绍
      },
      rules: {
        subject: [{ required: true, message: "请输入学科", trigger: "blur" }],
        step: [{ required: true, message: "请输入阶段", trigger: "blur" }],
        enterprise: [
          { required: true, message: "请输入企业", trigger: "blur" }
        ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        type: [{ required: true, message: "请输入题型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请输入难度", trigger: "change" }
        ],
        title: [
          { required: true, message: "请输入试题标题", trigger: "change" }
        ],
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "change" }
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    subForm() {
      this.$refs.questionFormRef.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
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
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .selectWidth {
    width: 300px;
  }
  .hrMargin {
    margin-bottom: 20px;
  }
  .setMargin {
    .el-form-item__content {
      margin-left: 0px !important;
      margin-top: 40px;
    }
  }
  .ql-editor {
    height: 100px;
  }
}
</style>