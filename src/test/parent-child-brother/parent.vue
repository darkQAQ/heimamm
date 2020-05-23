<template>
    <div style="width:1200px;height:600px;border:1px solid red;">
        我是父组件<br/><br/>
        子组件传来的{{foodInfo.name}},{{foodInfo.price}}
        <br/><br/>
        <div style="margin-left:20px;float:left;width:400px;height:500px;border:1px solid green;">
            <child1></child1>
            <!-- <child1></child1> -->
        </div>
        <div style="margin-right:20px;float:right;width:400px;height:500px;border:1px solid blue;">
            <child2></child2>  
        </div>
    </div>
</template>

<script>
import child1 from './child1'
import child2 from './child2'
export default {
    name: 'Parent',
    components: {
        child1,
        child2
    },
    data() {
        return {
            dashenList: [
                {id:1,name:'壮熊',address:'枣庄'},
                {id:2,name:'篮球跪族',address:'济南'},
                {id:3,name:'胖熊',address:'青岛'},
            ],
            foodInfo:'',
        }
    },
    methods: {
        getFood(val){
            this.foodInfo = val;
         }
    }
}
</script>