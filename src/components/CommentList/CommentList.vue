<template>
  <div class="rating-wrapper">
    <ul>
      <li class="rating-item" v-for="(comment, index) in comments" :key="index">
        <div class="avatar">
          <img width="20" height="20" :src="comment.id">
        </div>
        <div class="content">
          <h1 class="name">{{comment.uname}}</h1>
          <p v-if="comment.lid==''" style="word-break: break-word" class="text">{{comment.text}}</p>
          <p v-else style="word-break: break-word" class="text">@{{comment.lname}} :<br/> {{comment.text}}</p>
          <div class="time">{{comment.time | date-format}}</div>
          <table width="100%">
            <tr>
              <td>
                <div style="color: cornflowerblue;font-size: 13px" class="reply_btn" @click="openMask(comment.id,comment.uid,comment.uname)">
                  回复
                </div>
              </td>
              <td>
                <Likes :size="18" :canteenId="canteenId" :req="0" style="margin-left: 30%;height:10px;width: auto" :commentId="comment.id" :articleId="articleId"
                       :status="comment.status" :likes="comment.likes" :dislikes="comment.dislikes">
                </Likes>
              </td>
            </tr>
          </table>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import Likes from '../../components/likes/Likes.vue'
export default {
  name: 'CommentList',
  props: {
    comments: [],
    canteenId: '',
    articleId: ''
  },
  methods: {
    openMask (cid, uid, uname) {
      this.$emit('callback', {
        commentId: cid,
        uid: uid,
        uname: uname,
        articleId: this.articleId
      })
    }
  },
  components: {
    Likes
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
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
