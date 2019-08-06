<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm @setInfoData="setInfoData" @setAllPrice="setAllPrice" />

      <!-- 侧边栏 -->
      <OrderAside :data="infoData" :allPrice="allPrice" />
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from "@/components/air/orderAside";
export default {
  methods: {
    // 接收子组件返回的数据
    setInfoData(data) {
      this.infoData = data;
    },
    // 接收子组件返回的总价格
    setAllPrice(price) {
      this.allPrice = price;
    }
  },
  data() {
    return {
      infoData: {
        seat_infos: {}
      },
      //总价格
      allPrice: 0
    };
  },
  components: {
    OrderForm,
    OrderAside
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>