<template>
<div>
  <a href="javascript:" class="go_back" @click="$router.back()">
    <i class="iconfont icon-jiantou2"></i>
  </a>
  <div style="margin-top: 25px;font-size: 20px" align="center"><p>{{detail.name}}</p></div>
  <div style="height: 600px ;margin-top: 25px">
    <span>{{detail.uname}}:</span>
    <br/>
    <span style="word-break: break-word">{{detail.text}}</span>
    <br/>
  </div>
  <ArticleRatings :id="detail.uid" :name="detail.uname" :canteenId="detail.canteenId" :articleId="detail.id" :status="detail.status" :likes="detail.likes" :dislikes="detail.dislikes" :comments="comments" :score="detail.score"></ArticleRatings>
</div>
</template>

<script>
import {mapState} from 'vuex'
import Star from '../../../components/Star/Star.vue'
import ArticleRatings from '../../../components/ArticleRatings/ArticleRatings'
const ERR_OK = 0
export default {
  inject: ['reload'],
  name: 'ArticleInfo',
  components: {ArticleRatings, Star},
  comments: {ArticleRatings, Star},
  data () {
    return {
      detail: '',
      comments: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      this.$http.get('http://localhost:8087/buyer/article/canteen/detail?articleId=' + this.$route.query.articleId).then((response) => {
        response = response.body
        if (response.code === ERR_OK) {
          this.detail = response.data.detail
          this.comments = response.data.commentList
        }
      })
    }
  }
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
