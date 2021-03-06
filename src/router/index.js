import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router';
import { getToken } from '@/utils/token.js'

Vue.use(VueRouter);


import Login from '../views/login/index.vue';
import Layout from '../views/layout/layout.vue'
import Chart from '@/views/layout/chart'
import Enterprise from '@/views/layout/enterprise'
import Question from '@/views/layout/question'
import Subject from '@/views/layout/subject'
import User from '@/views/layout/user'
import Welcome from '@/views/layout/welcome'

//测试练习
import Parent from '@/test/parent-child-brother/parent'
import Slot1 from '@/test/slot1'
const router = new VueRouter({
    routes: [
        { path: '*', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/layout', component: Layout, children: [
                { path: 'chart', component: Chart },
                { path: 'enterprise', component: Enterprise },
                { path: 'question', component: Question },
                { path: 'subject', component: Subject },
                { path: 'user', component: User },
                { path: 'welcome', component: Welcome }
            ]
        },
        //测试练习
        { path: "/parent", component: Parent },
        { path: "/slot1", component: Slot1 },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.fullPath == '/login') {
        next();
    } else {
        const token = getToken();
        if (token) {
            next();
        } else {
            next('/login');
        }
    }
})

export default router;