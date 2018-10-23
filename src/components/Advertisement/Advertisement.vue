<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <table width="100%" style="border-style:none">
          <tr>
            <td >
              <a href="javascript:" class="food_adv">
                <img src="./images/nav2/1.jpg" height="130px" width="180px">
              </a>
            </td>
            <td >
              <a href="javascript:" class="food_adv">
                <img src="./images/nav2/2.jpg" height="130px" width="180px">
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="javascript:" class="food_adv">
                <img src="./images/nav2/3.jpg" height="130px" width="180px">
              </a>
            </td>
            <td >
              <a href="javascript:" class="food_adv">
                <img src="./images/nav2/6.jpg" height="130px" width="180px">
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default {
    mounted ()  {
      //  创建一个swiper来实现轮播
      new Swiper('.swiper-container',{
        loop: true,//循环轮播
        pagination: {
          el: '.swiper-pagination',
        },
      })
    },
    name: 'Advertisement'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
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
</style>
