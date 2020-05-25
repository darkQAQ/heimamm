<template>
  <div>
    父组件
    <br />
    <my-table :stuList="list">
      <template slot-scope="scope">
        <td
          style="text-align:center;width:200px"
          :style="{color:scope.row.lv == '1'?'black':'red'}"
        >{{scope.row.lv==1?'心悦1遍地都是':'心悦2是大佬'}}</td>
      </template>
    </my-table>

    <!-- <template slot-scope="scope">
                  <td style="text-align:center" :style="{color:scope.row.lv == '1'?'black':'red'}">{{item.lv==1?'心悦1遍地都是':'心悦2是大佬'}}</td>
    </template>-->
  </div>
</template>

<script>
import myTable from "./myTable";
export default {
  components: {
    myTable
  },
  data() {
    return {
      list: [
        { id: "230", name: "李建辉", class: "计网2--前端菜逼", lv: "1" },
        { id: "2231", name: "王斌", class: "计网2--java架构师", lv: "2" },
        { id: "233", name: "周猛", class: "计网2--SEO", lv: "1" }
      ]
    };
  }
};
</script>

<style>
</style>