import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import StudentSignIn from './views/StudentSignIn.vue'
import StudentSignUp from './views/StudentSignUp.vue'
import AdLanding from './views/AdLanding.vue'
import StLanding from './views/StLanding.vue'
import UserControl from './views/UserControl.vue'
import Addround from './views/Addround.vue'
import Root from './views/Root.vue'
import EditRound from './views/EditRound.vue'
import Audition from './views/Audition.vue'
import Result from './views/Audition.vue'
import Thanks from './views/Thanks.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'StudentSignIn',
      component: StudentSignIn
    },
    {
      path: '/register',
      name: 'StudentSignUp',
      component: StudentSignUp
    },
  
    {
      path: '/admin',
      name: 'AdLanding',
      component: AdLanding
    },
    {
      path: '/event',
      name: 'StLanding',
      component: StLanding
    },
    {
      path: '/user',
      name: 'UserControl',
      component: UserControl
    },
    {
      path: '/addround',
      name: 'Addround',
      component: Addround
    },
 
    {
      path: '/audition',
      name: 'Audition',
      component: Audition
    },
    {
      path: '/root',
      name: 'Root',
      component: Root
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: Thanks
    },
    {
      path: '/results',
      name: 'Result',
      component: Result
    },
    {
      path: '/edit',
      name: 'EditRound',
      component: EditRound
    }
    
  ]
})
