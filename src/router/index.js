import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/HolloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/task',
      name: 'Task',
      component: () => import('@/components/task.vue'),

    },

    {
      path: '/edit',
      name: 'edit',
      component: () => import('@/components/table/edit.vue')
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('@/components/login.vue')
    },

    {
      path: '/main',
      name: 'main',
      component: () => import('@/components/main.vue'),
      children: [{
          path: '/student',
          name: 'student',
          component: () => import('@/views/student.vue')
        },
        {
          path: '/teacherTable',
          name: 'teacherTable',
          component: () => import('@/views/teacherTable.vue')
        },
        {
          path: '/course',
          name: 'course',
          component: () => import('@/views/course.vue')
        },
        {
          path: '/banji',
          name: 'banji',
          component: () => import('@/views/banji.vue')
        },
        {
          path: '/bjlrcj',
          name: 'bjlrcj',
          component: () => import('@/views/bjlrcj.vue')
        },
        {
          path: '/grcjlr',
          name: 'grcjlr',
          component: () => import('@/views/grcjlr.vue')
        },
        {
          path: '/cjcx',
          name: 'cjcx',
          component: () => import('@/views/cjcx.vue')
        },
        {
          path: '/bjcj',
          name: 'bjcj',
          component: () => import('@/views/bjcj.vue')
        },
        {
          path: '/xscj',
          name: 'xscj',
          component: () => import('@/views/xscj.vue')
        },
        {
          path: '/password',
          name: 'password',
          component: () => import('@/views/password.vue')
        },
        {
          path: '/select',
          name: 'select',
          component: () => import('@/views/select.vue')
        },
      ]
    },
  ]
})
