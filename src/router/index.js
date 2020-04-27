import Vue from 'vue'
import Router from 'vue-router'
import PublicMenuManagement from '@/components/PublicMenuManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PublicMenuManagement',
      component: PublicMenuManagement
    }

  ]
})
