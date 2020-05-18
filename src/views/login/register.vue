<template>
  <div class="register">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="600px" center>
      <div slot="title" class="title">注册</div>
      <el-form :model="ruleForm" label-width="100px" :rules="rules" ref="rules">
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="action"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="rcode">
          <el-row>
            <el-col :span="17">
              <el-input v-model="ruleForm.rcode"></el-input>
            </el-col>
            <el-col :span="6" style="margin-left:10px">
              <img class="captcha" @click="rcodeClick" :src="rcodeUrl" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="6" style="margin-left:10px">
              <el-button @click="codeClick">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      dialogVisible: false,
      rcodeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms", //验证码地址
      imageUrl: "", //上传头像地址
      action: process.env.VUE_APP_BASEURL + "/uploads", //头像上传地址
      ruleForm: {
        username: "", //昵称
        phone: "", //电话
        email: "", //邮箱
        avatar: "", //头像地址
        password: "", //密码
        rcode: "", //图形码
        code: "" //验证码
      },
      rules: {
        avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }
              const res = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (!res.test(value)) {
                return callback(new Error("手机号格式不对!"));
              }
              callback();
            }
          }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("邮箱不能为空"));
              }
              const res = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (!res.test(value)) {
                return callback(new Error("邮箱格式不对!"));
              }
              callback();
            }
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少6个字符", trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "图形码为4个字符", trigger: "blur" }
        ],
        code: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("验证码不能为空"));
              }
              if (!Number.isInteger(value)) {
                callback(new Error("请输入数字值"));
              }
              callback();
            }
          }
        ]
      }
    };
  },
  methods: {
    rcodeClick() {
      this.rcodeUrl =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&xxx=" +
        Math.random();
    },
    async codeClick() {
      const res = await this.$axios.post("/sendsms", {
        code: this.ruleForm.rcode,
        phone: this.ruleForm.phone
      });
      if (res.data.code == 200) {
        this.ruleForm.code = res.data.data.captcha;
      } else {
        this.$message({
          message: res.data.message,
          type: "warning"
        });
        this.rcodeClick();
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = process.env.VUE_APP_BASEURL+ '/'+ res.data.file_path;
      this.ruleForm.avatar = res.data.file_path;
    },
    beforeAvatarUpload(file) {
      const isImages = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImages) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImages && isLt2M;
    },
    submit(){
         this.$refs.rules.validate(async(valid) => {
          if (!valid) {
            return;
          } 
        const res = await this.$axios.post('/register',this.ruleForm);
        console.log(res);
        if(res.data.code == 200){
            this.dialogVisible = false;
            this.$message({
          message: '注册成功',
          type: 'success'
        });
        }else{
             this.$message.error(res.data.message);
        }
        });
    }
  }
};
</script>
<style lang="less">
.register {
  .title {
    height: 53px;
    background: #03c0f9;
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .captcha {
    width: 100%;
    height: 40px;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style> 