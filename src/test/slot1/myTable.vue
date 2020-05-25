<template>
  <div>
      <table>
          <tr ><th style="width:100px">学号</th><th style="width:100px">姓名</th><th style="width:200px">头衔</th><th style="width:80px">心悦等级</th></tr>
          <tr style="width:80px" v-for="(item, index) in stuList" :key="index">
              <td style="text-align:center">{{item.id}}</td>
              <td style="text-align:center">{{item.name}}</td>
              <td style="text-align:center">{{item.class}}</td>
              <slot :row="item" />
          </tr>
      </table>
  </div>
</template>

<script>
export default {
    props:{
        stuList:{
            type:Array,
            default:()=>{
                return [];
            }
        }
    }

}
</script>

<style>

</style>