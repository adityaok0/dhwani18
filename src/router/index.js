import Vue from 'vue'
import Router from 'vue-router'
import BohemianDhwani from '@/components/static/BohemianDhwani'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BohemianDhwani',
      component: BohemianDhwani
    }
  ]
})
