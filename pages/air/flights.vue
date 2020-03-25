<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem
          v-for="(item, index) in dataList"
          :key="index"
          :data="item"
        />

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageInex"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
export default {
  data() {
    return {
      flightsData: {},
      currentPage4:1,
      pageInex:5,
      total:0,
      dataList:[]
    };
  },
 mounted () {
      this.$axios({
        url: `airs`,
        params: this.$route.query // 来自URL的5个参数
      }).then(res => {
        this.flightsData = res.data;   

        // 第一页
        this.dataList=this.flightsData.flights.slice(0,5);
        this.total=this.flightsData.total;
      });
 },
  components: {
    FlightsListHead,
    FlightsItem
  },
  methods:{
       handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      }
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
