<template>
<div>
  <a href="javascript:" class="go_back" @click="$router.back()">
    <i class="iconfont icon-jiantou2"></i>
  </a>
  <div style="margin-top: 25px;font-size: 20px" align="center"><p>文章详情</p></div>
  <div style="height: 600px ;margin-top: 25px">
    <span>甜食是人类最简单最初始的美食体验，蜂蜜的主要成分是果糖和葡萄糖，
      作为早期人类唯一的甜食，蜂蜜能快速产生热量，补充体力，这对我们的祖先至关重要，
      和人工提炼的蔗糖不同，蜂蜜中的糖，不经过水解，就可以直接被人体吸收。在中国的厨房，无论制作菜肴还是甜点，蜂蜜都是其他糖类无法替代的。当然，白马甲最喜欢的是酥油蜂蜜</span>
  </div>
  <ArticleRatings></ArticleRatings>
  <div></div>
</div>
</template>

<script>
  import ArticleRatings from '../../../components/ArticleRatings/ArticleRatings'
  export default {
    name: 'ArticleInfo',
    components: {ArticleRatings},
    comments: {ArticleRatings}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .go_back
    position absolute
    top 5px
    left 5px
    width 30px
    height 30px
    >.iconfont
      font-size 20px
      color #999
</style>
