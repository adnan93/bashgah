import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customerLogin',
    name: 'customerLogin',
    component: () => import('../views/customerLogin.vue')
  },
  
  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },

  {
    path: '/Update',
    name: 'Update',
    component: () => import('../views/Update.vue')
  },
  

  {
    path: '/Score',
    name: 'Score',
    component: () => import('../views/Score.vue')
  },


  {
    path: '/Programs',
    name: 'Programs',
    component: () => import('../views/Programs.vue')
  },

  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: () => import('../views/UserLogin.vue')
  },
  {
    path: '/ForgotPassword',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue')
  },



  
 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
