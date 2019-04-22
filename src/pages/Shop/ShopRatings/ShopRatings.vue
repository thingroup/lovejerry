<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36" />
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36" />
            <span class="score">{{info.foodScore}}</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" :class="{active: selectType===2}" @click="setSelectType(2)">
            全部<span class="count">{{ratings.length}}</span>
          </span>
          <span class="block positive" :class="{active: selectType===0}" @click="setSelectType(0)">
            满意<span class="count">{{positiveSize}}</span>
          </span>
          <span class="block negative" :class="{active: selectType===1}" @click="setSelectType(1)">
            不满意<span class="count">{{ratings.length-positiveSize}}</span>
          </span>
        </div>
        <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(article, index) in articleList" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="article.id">
            </div>
            <div class="content">
              <h1 class="name">{{article.uname}}</h1>
              <div class="star-wrapper">
                <Star :score="article.score" :size="24" />
              </div>
              <br/>
              <p class="text" style="word-break: break-word">{{article.text}}</p>
              <div class="recommend">
                <span class="item" v-for="(item, i) in article.productNames" :key="i">{{item}}</span>
              </div>
              <div class="time">{{article.time | date-format}}</div>
              <table style="width: 100%">
                <tr>
                  <td>
                    <div @click="showComment(index)" class="reply">
                      <div v-if="article.comments.length>0">
                        <span style="color:cornflowerblue;font-size: 13px">追问（{{article.comments.length}}）</span>
                      </div>
                      <div v-else>
                        <span style="color: deepskyblue;font-size: 13px">追问</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style="color: cornflowerblue;font-size: 13px" class="reply_btn" @click="openMask(article.id,article.uid,article.uname)">
                      提问
                    </div>
                  </td>
                  <td>
                    <Likes :size="20" style="margin-left: 15%" :req="0" :articleId="article.id"
                           :status="article.status" :likes="article.likes" :dislikes="article.dislikes">
                    </Likes>
                  </td>
                </tr>
              </table>
              <div v-if="article.role==1">
                <hr style="width: 100%;color: #7e8c8d"/>
                <CommentList v-on:callback="setReply" :article-id="article.id" :canteen-id="canteenId" :comments="article.comments"></CommentList>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <dialog-bar :req="0" style="margin-top: 10%" v-show="isShow" v-model="sendVal" type="danger" :luname="luname" :luid="luid"
                  :articleId="articleId" :commentId="commentId"
                  v-on:cancel="clickCancel()"
                  @danger="clickDanger()" @confirm="clickConfirm()" >
      </dialog-bar>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState, mapGetters} from 'vuex'
import Star from '../../../components/Star/Star.vue'
import Likes from '../../../components/likes/Likes.vue'
import CommentList from '../../../components/CommentList/CommentList.vue'
import dialogBar from '../../../components/Reply/dialog.vue'
const ERR_OK = 0
export default {
  data () {
    return {
      onlyShowText: true, // 是否只显示有文本的
      selectType: 2, // 选择的评价类型: 0满意, 1不满意, 2全部
      articleList: [],
      showedIndex: Number,
      canteenId: '',
      reply: [],
      commentId: '',
      luname: '',
      luid: '',
      articleId: '',
      isShow: false
    }
  },
  created () {
    this.canteenId = this.$route.query.canteenId
    var url = 'http://localhost:8087/buyer/article/list?canteenId=' + this.$route.query.canteenId +
      '&userId= '
    if (this.userInfo.id != null) {
      url = url + this.userInfo.id
    }
    this.$http.get(url).then((response) => {
      response = response.body
      if (response.code === ERR_OK) {
        this.articleList = response.data
        this.showedIndex = -1
      }
    })
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
    ...mapState(['info', 'ratings', 'userInfo']),
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
    setReply (data) {
      this.commentId = data.commentId
      this.luid = data.uid
      this.luname = data.uname
      this.articleId = data.articleId
      this.isShow = true
    },
    openMask (aid, uid, uname) {
      this.commentId = '*'
      this.luid = uid
      this.luname = uname
      this.articleId = aid
      this.isShow = true
    },
    clickCancel () {
      this.isShow = false
    },
    setSelectType (selectType) {
      this.selectType = selectType
    },
    toggleOnlyShowText () {
      this.onlyShowText = !this.onlyShowText
    },
    showComment (index) {
      if (!this.articleList[index].role) {
        this.articleList[index].role = 1
        if (this.showedIndex >= 0) {
          this.articleList[this.showedIndex].role = 0
        }
        this.showedIndex = index
      } else {
        this.articleList[index].role = 0
        this.showedIndex = -1
      }
    }
  },

  components: {
    Star,
    Likes,
    CommentList,
    dialogBar
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

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
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
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
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .ratingselect
      .rating-type
        padding: 18px 0
        margin: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .block
          display: inline-block
          padding: 8px 12px
          margin-right: 8px
          line-height: 16px
          border-radius: 1px
          font-size: 12px
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: cornflowerblue
            color: #fff
          .count
            margin-left: 2px
            font-size: 8px
      .switch
        padding: 12px 18px
        line-height: 24px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        color: rgb(147, 153, 159)
        font-size: 0
        &.on
          .icon-check_circle
            color: cornflowerblue
        .icon-check_circle
          display: inline-block
          vertical-align: top
          margin-right: 4px
          font-size: 24px
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
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
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
