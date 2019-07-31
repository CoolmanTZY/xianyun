<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input type="text" v-model="form.username" placeholder="用户名/手机" name="username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password" name="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // 表单数据
      form: {
        username: "13800138000",
        password: "123456"
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
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "post",
            data: this.form
          }).then(res => {
            // const data = res.data;
            this.$store.commit("user/setUserInfo", res.data);
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
