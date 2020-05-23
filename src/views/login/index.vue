<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/layout_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单开始 -->
      <el-form class="login-form" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入内容" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="24">
            <el-col :span="16">
              <el-input v-model="ruleForm.code" placeholder="请输入密码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" :src="codeUrl" @click="codeCLick" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isChecked">
          <el-checkbox v-model="ruleForm.isChecked"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginClick" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerClick" style="width:100%">注册</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
    <register ref="register"></register>
  </div>
</template>

<script>
import {setToken} from '@/utils/token.js'
// 导入子组件
import register from './register'
export default {
  name: "login",
  components:{
    register
  },
  data() {
    return {
      codeUrl: "http://134.175.59.248/heimamm/public/captcha?type=login",
      ruleForm: {
        phone: "18511111111",
        password: "12345678",
        code: "",
        isChecked: true
      },
      rules: {
        phone: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("请输入手机号"));
              }
              const req = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (!req.test(value)) {
                return callback(new Error("手机号格式不正确"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "必须输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须是4位", trigger: "blur" }
        ],
        isChecked: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("同意用户协议"));
              }
              callback();
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    codeCLick() {
      this.codeUrl =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=login&xxx=" +
        Math.random();
    },
    loginClick() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid == false) return;
        // async await  方法
        const res = await this.$axios.post("/login", this.ruleForm);
        if (res.data.code == 200) {
          this.$message({
            message: "登陆成功",
            type: "success"
          });
          setToken(res.data.data.token);
          this.$router.push("/layout/welcome");
          // 保存token
        } else {
          this.$message.error(res.data.message);
          this.codeUrl =
            process.env.VUE_APP_BASEURL +
            "/captcha?type=login&xxx=" +
            Math.random();
        }
      });
    },
    registerClick(){
      this.$refs.register.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>