
<template>
 <div>
   <!--<HeaderTop title="精彩点评"></HeaderTop>-->
   <div style="margin-top: 25px;font-size: 20px" align="center"><p>精彩点评</p></div>
  <ArticleList></ArticleList>
   <a href="javascript:" class="go_back" @click="$router.back()">
     <i class="iconfont icon-jiantou2"></i>
   </a></div>
</template>
<script>
  import ArticleList from '../../components/ArticleList/ArticleList'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  export default {
    components: {HeaderTop,  ArticleList},
    comments:{ ArticleList},
    name: 'Article'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
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
