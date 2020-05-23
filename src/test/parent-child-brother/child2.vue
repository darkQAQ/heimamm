<template>
  <div>
    子组件2
    <br />
    <p>child1传来的值</p>
    斌桑爱喝{{obj.name}},{{obj.price}}元,
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      obj: ""
    };
  },
  created() {
    bus.$on("drink", obj => {
      console.log(obj);
      this.obj = obj;
    });
  }
};
</script>

<style>
</style>