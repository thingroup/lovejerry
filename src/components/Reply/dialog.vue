<template>
  <div>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <div v-if="commentId=='*'">
              <div class="dialog-title">评论 : {{luname}}:</div>
            </div>
          <div v-else>
            <div class="dialog-title">回复 @ : {{luname}}:</div>
          </div>
            <textarea class="content" v-model="text"></textarea>
            <div class="btns">
                <div v-if="type != 'confirm'" class="default-btn" @click="closeBtn">
                    {{cancelText}}
                </div>
                <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
                    {{dangerText}}
                </div>
            </div>
        </div>
    </div>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
    </div>
</template>
<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {mapState} from 'vuex'
export default {
  components: {
    AlertTip
  },
  props: {
    articleId: Number,
    commentId: '',
    luname: '',
    luid: '',
    text: '',
    req: '',
    value: {},
    // 类型包括 defalut 默认， danger 危险， confirm 确认，
    type: {
      type: String,
      default: 'default'
    },
    title: '',
    cancelText: {
      type: String,
      default: '取消'
    },
    dangerText: {
      type: String,
      default: '发送'
    }
  },
  data () {
    return {
      showMask: false,
      alertText: '', // 提示文本
      alertShow: false // 是否显示警告框
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    showAlert: function (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    // 关闭警告框
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },
    closeMask () {
      this.showMask = false
    },
    closeBtn () {
      this.$emit('cancel')
      this.closeMask()
    },
    dangerBtn () {
      if (this.userInfo.id == null) {
        this.closeMask()
        this.showAlert('您尚未登录')
        return
      }
      this.$emit('danger')
      if (this.req === 1) {
        if (this.commentId !== '*') {
          var url = 'http://localhost:8087/buyer/article/canteen/createComment?' +
            'articleId=' + this.articleId +
            '&commentText=' + this.text +
            '&lastUid=' + this.luid +
            '&lastUname=' + encodeURI(this.luname) +
            '&userId=' + this.userInfo.id +
            '&userName=' + encodeURI(this.userInfo.name)
          this.$http.post(url).then(function (response) {
          })
        } else {
          var url1 = 'http://localhost:8087/buyer/article/canteen/createComment?' +
            'articleId=' + this.articleId +
            '&commentText=' + this.text +
            '&userId=' + this.userInfo.id +
            '&userName=' + encodeURI(this.userInfo.name)
          this.$http.post(url1).then(function (response) {
          })
        }
      } else if (this.req === 0) {
        if (this.commentId !== '*') {
          var url = 'http://localhost:8087/buyer/article/createComment?' +
            'articleId=' + this.articleId +
            '&commentText=' + this.text +
            '&lastUid=' + this.luid +
            '&lastUname=' + encodeURI(this.luname) +
            '&userId=' + this.userInfo.id +
            '&userName=' + encodeURI(this.userInfo.name)
          this.$http.post(url).then(function (response) {
          })
        } else {
          var url1 = 'http://localhost:8087/buyer/article/createComment?' +
            'articleId=' + this.articleId +
            '&commentText=' + this.text +
            '&userId=' + this.userInfo.id +
            '&userName=' + encodeURI(this.userInfo.name)
          this.$http.post(url1).then(function (response) {
          })
        }
      }
      this.closeMask()
      location.reload()
    }
  },
  mounted () {
    this.showMask = this.value
  },
  watch: {
    value (newVal, oldVal) {
      this.showMask = newVal
    },
    showMask (val) {
      this.$emit('input', val)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
    .dialog{
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        background: rgba(0, 0, 0, 0.6)
        z-index: 999
        .dialog-container{
            width: 100%
            height: 220px
            background: lightblue
            top: 200px
            left: 50%
            transform: translate(-50%, -50%)
            border-radius: 8px
            position: relative
            .dialog-title{
                width: 100%;
                height: 60px;
                font-size: 18px;
                color: #696969;
                font-weight: 600;
                padding: 16px 50px 0 20px;
                box-sizing: border-box;
            }
            .content{
                border-radius: 0
                width: 100%
                height:100px
                font-size:20px
                color: #797979;
                line-height: 26px;
                padding: 0 20px;
                box-sizing: border-box;
            }
            .inp{
                margin: 10px 0 0 20px;
                width: 40%;
                height: 8%;
                padding-left: 4px;
                border-radius: 4px;
                border: none;
                background: #efefef;
                outline: none;
                &:focus{
                    border: 1px solid #509EE3;
                }
            }
            .btns{
                width: 100%;
                height: 60px;
                // line-height: 60px;
                position: absolute;
                bottom: 0;
                left: 0;
                text-align: right;
                padding: 0 16px;
                box-sizing: border-box;
                & > div{
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 14px;
                    color: #ffffff;
                    background: #f1f1f1;
                    border-radius: 8px;
                    margin-right: 12px;
                    cursor: pointer;
                }
                .default-btn{
                    color: #787878;
                    &:hover{
                        color: #509EE3;
                    }
                }
                .danger-btn{
                    background: #EF8C8C;
                    &:hover{
                        background: rgb(224, 135, 135);
                    }
                    &:active{
                        background: #EF8C8C;
                    }
                }
            }
        }
    }
</style>
