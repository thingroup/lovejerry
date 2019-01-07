<template>
  <div>
    <HeaderTop title="聚出精彩"></HeaderTop>
    <form class="search_form" action="#">
      <input type="search" name="search" placeholder="请输入文章名称" class="search_input">
      <a href="javascript:;" class="guide_item" :class="{on: '/msite'==$route.path}" @click="goTo('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      </a>
    </form>
  <div class="swiper-container" style="margin-top: 5px">
    <div class="swiper-wrapper">
      <div class="swiper-slide" >
        <img src="./images/7.jpg" height="80" width="100%"/></div>
    <div class="swiper-pagination"></div>
  </div>
  </div>
  <nav class="msite_nav" style="margin-top: 0px">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a href="javascript:" class="link_to_food" @click="$router.push('/article')">
            <div class="food_container" >
              <img src="./images/5.png">
            </div>
            <span >饭圈点评</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/6.png">
            </div>
            <span>快来聚餐</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="./images/4.png">
            </div>
            <span>吃货交友</span>
          </a>
          <a href="javascript:" class="link_to_food" @click="$router.push('/createArticle')">
            <div class="food_container">
              <img src="./images/1.png">
            </div>
            <span>我要发帖</span>
          </a>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </nav>
    <div class="title">
      <span style="margin-left: 30%;font-size: 30px">我的文章</span>
    </div>
  <NewList></NewList>
  </div>
  <!--<router-view/>-->
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import NewList from '../../components/NewsList/NewsList'
export default {
  components: {NewList, HeaderTop},
  name: 'FoodieGroup',
  mounted () {
    //  创建一个swiper来实现轮播
    new Swiper('.swiper-container', {
      loop: true, // 循环轮播
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 100px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 30px
                  height 30px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
  .search_form
    clearFix()
    margin-top 45px
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #02a774
        font-size 16px
        color #fff
        background-color #02a774
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999
    &.on
      color #02a774
    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px
      .iconfont
        font-size 22px
</style>
