<!--suppress ALL -->
<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-right">
          <div class="score-wrapper">
            <span style="font-size: 25px" class="title">作者评分</span>
            <Star style="margin-left: 0%" :score="score" :size="48" />
          </div>
          <Likes style="margin-left: 65%" :articleId="articleId" :canteenId="canteenId"
                 :status="status" :likes="likes" :dislikes="dislikes"></Likes>
        </div>
      </div>
      <div style="text-align: center" class="split">
        评论/回复
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(comment, index) in comments" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="comment.id">
            </div>
            <div class="content">
              <h1 class="name">{{comment.uname}}</h1>
              <p style="word-break: break-word" class="text">{{comment.text}}</p>
              <div class="time">{{comment.time | date-format}}</div>
              <br/>
              <div style="font-size: 15px" class="reply_btn" @click="showReplyform(comment.id,comment.uname,comment.uid)">回复
              </div>
              <Likes  style="margin-left: 65%" :commentId="comment.id" :articleId="articleId"
                      :status="comment.status" :likes="comment.likes" :dislikes="comment.dislikes"></Likes>
            </div>
          </li>
        </ul>
      </div>
      <replyForm v-show="isActive" :article-id="articleId" :comment-id="commentId" :luname="luname" :luid="luid"></replyForm>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState, mapGetters} from 'vuex'
import Star from '../../components/Star/Star.vue'
import Likes from '../../components/likes/Likes.vue'
import replyForm from '../../components/Reply/ReplyForm.vue'
export default {
  props: {
    comments: [],
    score: '',
    likes: '',
    dislikes: '',
    status: '',
    articleId: '',
    canteenId: ''
  },
  data () {
    return {
      onlyShowText: true, // 是否只显示有文本的
      selectType: 2, // 选择的评价类型: 0满意, 1不满意, 2全部
      commentId: '',
      luid: '',
      luname: '',
      isActive:false
    }
  },
  mounted () {
    this.$store.dispatch('getShopRatings', () => {
      this.$nextTick(() => {
        new BScroll(this.$refs.ratings, {
          click: true
        })
      })
    })
  },
  computed: {
    ...mapState(['info', 'ratings']),
    ...mapGetters(['positiveSize']),

    filterRatings () {
      // 得到相关的数据
      const {ratings, onlyShowText, selectType} = this

      // 产生一个过滤新数组
      return ratings.filter(rating => {
        const {rateType, text} = rating
        /*
            条件1:
                selectType: 0/1/2
                rateType: 0/1
                selectType===2 || selectType===rateType
            条件2
                onlyShowText: true/false
                text: 有值/没值
                !onlyShowText || text.length>0
           */
        return (selectType === 2 || selectType === rateType) && (!onlyShowText || text.length > 0)
      })
    }
  },
  methods: {
    setSelectType (selectType) {
      this.selectType = selectType
    },
    toggleOnlyShowText () {
      this.onlyShowText = !this.onlyShowText
    },
    showReplyform: function (cid, lname, lid) {
      if(this.isActive){
        if(this.commentId==cid){
          this.isActive=false
        }else{
          this.commentId = cid
          this.luname = lname
          this.luid = lid
        }
      }else{
        this.commentId = cid
        this.luname = lname
        this.luid = lid
        this.isActive=true
      }
    }
  },
  components: {
    Star,
    Likes,
    replyForm
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .ratings
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
