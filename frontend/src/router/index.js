import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import homeresults from '../views/homeresults.vue'
import top from '../views/top.vue'
import mostpopular from '../views/mostpopular.vue'
import register from '../views/Register.vue'
import login from '../views/Login.vue'
import recommendations from '../views/recommendations.vue'
import movieoverview from '../views/MovieOverview.vue'
import trailer from '../views/trailer.vue'
import watchlist from '../views/watchlist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mostpopular',
    name: 'mostpopular',
    component: mostpopular
  },
  {
    path: '/top',
    name: 'top',
    component: top
  },
  {
    path: '/homeresult',
    name: 'homeresults',
    component: homeresults
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/recommendations',
    name: 'recommendations',
    component: recommendations
  },
  {
    path: '/movieoverview',
    name: 'movieoverview',
    component: movieoverview
  },
  {
    path: '/trailer',
    name: 'trailer',
    component: trailer
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: watchlist
  },
]

const router = new VueRouter({
  routes
})

export default router
