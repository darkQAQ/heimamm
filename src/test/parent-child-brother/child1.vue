<template>
  <div>
    子组件1
    <br />
    <br />
    <ul>
      <li v-for="(item, index) in godList" :key="index">我叫{{item.name}}家住{{item.address}}</li>
    </ul>
    <br />
    <br />
    <button @click="sendValueToParent">传值给父组件</button>
    <br />
    <button @click="sendValueToChild2">传值给兄弟组件</button>
  </div>
</template>

<script>
import bus from './bus';
export default {
  name: "Child1",
  // props:['godList'], 
  props: {
    // godList:Array,//限定传的值必须是对象
    godList: {
      //对象写法 控制更精细
      type: Array, //限定传的值必须是对象
      // required: true, //必须传值 
      default: function() {
        return [
          // 默认值
          { id: 4, name: "中分怪", address: "济宁" },
          { id: 5, name: "崽总", address: "济宁" }
        ];
      }
    }
  },
  data() {
    return {};
  },

  methods: {
    sendValueToParent(){
      //$emit 传值
      // this.$emit('food',{name:'红烧肉',price:18})
      //$parent 传值
      this.$parent.getFood({name:'回锅肉',price:28})
    },
    sendValueToChild2(){
      bus.$emit('drink',{name:'橙zei儿',price:8})
    },
  }
};
</script>