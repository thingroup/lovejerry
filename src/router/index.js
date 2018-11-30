import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/list.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import FoodieGroup from '../pages/FoodieGroup/FoodieGroup.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import Article from  '../pages/Article/Article.vue'
import ArticleInfo from '../pages/Article/ArticleInfo/ArticleInfo'
import Payment from '../pages/payment/Payment'
import orderDetail from '../pages/Order/detail';
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/msite',
      name: 'MSite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order/:orderId',
      component: orderDetail
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
    },
    {
      path: '/foodieGroup',
      name: 'FoodieGroup',
      component: FoodieGroup,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/article',
      name: 'Article',
      component: Article,
    },
    {
      path: '/articleinfo',
      name: 'ArticleInfo',
      component : ArticleInfo,
      children: [
        {
          path: '',
          component: ArticleInfo
        }
      ]
    },
    {
      path: '/',
      redirect: '/msite',
      meta: {
        showFooter: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        },
      ]
    },
  ]
})
