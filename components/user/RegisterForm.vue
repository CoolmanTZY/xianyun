<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="affirmPassword">
      <el-input v-model="form.affirmPassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: "",
        nickname: "",
        captcha: "",
        affirmPassword: ""
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        affirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      //判断长度是否符合标准
      if (this.form.username.length !== 11) {
        return this.$message.warning("手机号码不符合");
      }

      this.$axios({
        url: "captchas",
        method: "post",
        data: { tel: this.form.username }
      }).then(res => {
        const data = res.data;
        console.log(data);
        this.$alert(`验证码为${data.code}`, "提示", {
          type: "warning"
        });
      });
    },

    // 注册
    handleRegSubmit() {
      // console.log(this.form);
      this.$refs.form.validate(valid => {
        if (valid) {
          // 将表单中的affirmPassword提取出舍弃
          const { affirmPassword, ...props } = this.form;
          //调用注册的接口
          this.$axios({
            url: "/accounts/register",
            method: "post",
            data: props
          }).then(res => {
            this.$store.commit("user/setUserInfo", res.data);
            this.$router.push("/");
            this.$message({
              type: "success",
              message: "您已成功注册~~~"
            });
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>