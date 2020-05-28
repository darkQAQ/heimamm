<template>
  <div class="questionType">
    <div v-if="questionForm.type == 1">
      <div class="item" v-for="(item) in questionForm.select_options" :key="item.label">
        <el-radio style="margin-right:0px;" v-model="questionForm.single_select_answer" :label="item.label">{{item.label}}</el-radio>
        <el-input style="margin-left:15px;" disabled v-model="item.text"></el-input>
      </div>
    </div>
    <div v-if="questionForm.type == 2">
      <div class="item" v-for="(item) in questionForm.select_options" :key="item.label">
        <el-checkbox v-model="questionForm.multiple_select_answer" :label="item.label"></el-checkbox>
        <el-input disabled style="margin-left:15px;" v-model="item.text"></el-input>
      </div>
    </div>
    <div v-if="questionForm.type == 3">
      <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="questionForm.short_answer"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionType",
  props: ["questionForm"],
  data() {
    return {};
  }
};
</script>

<style lang="less">
.questionType {
  .item {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
}
</style>