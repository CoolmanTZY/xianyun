<template>
  <div class="hotel">
    <!-- 标题 -->
    <div class="hotel_index">
      <h2>缤纷四季优惠搜不停</h2>
      <span style="font-size:13px">从舒适的乡村民宿到时髦的都市公寓</span>
    </div>
    <!-- 搜素框 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 出行目的地 -->
      <el-form-item style="width:515px">
        <el-input width="300px" v-model="ruleForm.name" placeholder="出行目的地"></el-input>
      </el-form-item>

      <!-- 入住时间 -->
      <el-form-item label required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择离店时间"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- 离店时间 -->
      <el-form-item label required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择离店时间"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="我是出差" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>

      <!-- 提交表单信息 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">搜素</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style lang="less" scoped>
.hotel {
  width: 1000px;
  margin: 0 auto;
  position: relative;
  > .hotel_index {
    margin-top: 80px;
    margin-bottom: 20px;
    > h2 {
      margin-bottom: 10px;
    }
    span {
      color: #ccc;
    }
  }
  /deep/ .el-form {
    height: 150px;
    .el-form-item:nth-child(1):nth-child(2):nth-child(3) {
      float: left;
    }
  }
}
</style>
