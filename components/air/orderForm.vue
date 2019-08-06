<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input v-model="item.username" placeholder="姓名" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-input v-model="item.id" placeholder="证件号码" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>
      <!-- 添加乘机人 -->
      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>
    <!-- 保险 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            @change="handleChange(item)"
            :label="`${item.type}：￥${item.price}/份×${users.length}  
            -${item.compensation}`"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>
    <!-- 联系人 -->
    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <!-- 使其触发computed的计算属性 -->
    <input type="hidden" :value="allPrice" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [{ id: "", username: "" }], //乘机人信息
      insurances: [], //保险id
      contactName: "", //联系人
      contactPhone: "", //联系人电话
      invoice: false, //发票
      captcha: "",
      infoData: {} //机票信息
    };
  },
  computed: {
    allPrice() {
      let price = 0;

      // 默认是0
      if (!this.infoData.seat_infos) {
        return 0;
      }
      // 单价
      price += this.infoData.seat_infos.org_settle_price;
      // 燃油费
      price += this.infoData.airport_tax_audlet;
      // 保险
      price += this.insurances.length * 30;
      // 人数
      price *= this.users.length;
      // 把总价格返回给父组件
      this.$emit("setAllPrice", price);

      return price;
    }
  },
  methods: {
    //保险
    handleChange(item) {
      const index = this.insurances.indexOf(item.id);
      if (index > -1) {
        // 如果数组中存在即删除
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(item.id);
      }
    },
    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },
    // 添加乘机人
    handleAddUsers() {
      this.users.push({ id: "", username: "" });
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.contactPhone) {
        return this.$alert("请填写手机号", {
          type: "warning"
        });
      }
      this.$axios({
        url: "captchas",
        method: "post",
        data: { tel: this.contactPhone }
      }).then(res => {
        const { code } = res.data;
        this.$alert(`手机验证码为${code}`, "提示", {
          type: "warning"
        });
      });
    },

    // 提交订单
    handleSubmit() {
      const data = {
        users: this.users, //用户信息
        insurances: this.insurances,
        invoice: this.invoice,
        captcha: this.captcha,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };
      const {
        user: { userInfo }
      } = this.$store.state;
      //判断用户是否为空
      let fl = true;
      this.users.forEach(e => {
        if (!e.id || !e.username) {
          fl = false;
          return this.$alert("请填写乘机人信息", "温馨提示", {
            type: "warning"
          });
        }
      });
      if (!this.contactName || !this.contactPhone) {
        return this.$alert("请填写联系人信息", "温馨提示", { type: "warning" });
      }
      this.$axios({
        url: "airorders",
        method: "post",
        data,
        headers: {
          Authorization: `Bearer ${userInfo.token || "NO TOKEN"}`
        }
      }).then(res => {
        console.log(res);
        this.$message({
          type: "success",
          message: "您已成功提交订单"
        });
        //跳转至付款页
        // this.$router.push();
      });
    }
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: { seat_xid }
    }).then(res => {
      this.infoData = res.data;
      this.$emit("setInfoData", this.infoData);
    });
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>