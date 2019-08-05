<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->

      <div class="flights-content">
        <!-- 过滤条件 -->
        <!--此时的  copyFlightsData 为copy的总数据-->
        <FlightsTop :data="copyFlightsData" @getDataList="getDataList" />

        <!-- 航班头部布局 -->
        <FlightsHeader />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- 分页部署 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsHeader from "@/components/air/flightsHeader";
import FlightsItem from "@/components/air/flightsItem";
import FlightsTop from "@/components/air/flightsTop";
import FlightsAside from "@/components/air/flightsAside";

export default {
  components: {
    FlightsHeader,
    FlightsItem,
    FlightsTop,
    FlightsAside
  },
  data() {
    return {
      copyFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      dataList: [],
      //当前页数
      pageIndex: 1,
      //显示的条数
      pageSize: 2,
      //总数
      total: 0
    };
  },
  methods: {
    // 修改分页条数时候触发
    handleSizeChange(value) {
      // 修改分页条数
      this.pageSize = value;
      // 获取分页的数据
      this.getDataList();
    },
    // 切换页数时候触发
    handleCurrentChange(value) {
      // 修改页数
      this.pageIndex = value;
      // 获取分页的数据
      this.getDataList();
    },
    // 获取分页的数据
    getDataList(arr) {
      // 修改dataList的数据 0  2 2 4
      if (arr) {
        this.flightsData.flights = arr;
        this.total = arr.length;
        this.pageIndex = 1;
      }
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      );
    },

    getData() {
      this.$axios({
        url: "/airs",
        method: "get",
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        // copy 一份数据留于保存,后期作用
        this.copyFlightsData = { ...res.data };
        this.total = this.flightsData.flights.length;
        this.dataList = this.flightsData.flights.slice(0, 2);
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>