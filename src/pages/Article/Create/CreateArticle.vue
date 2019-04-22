<template>
  <div class="dialog">
    <a style="position: absolute;top:5px;left: 5px;width: 30px;height: 30px" href="javascript:" class="go_back" @click="$router.back()">
      <i class="iconfont icon-jiantou2" style="font-size: 20px;color: #999"></i>
    </a>
    <div class="dialog-container">
        <div class="dialog-title">
          {{uname}}<span style="white-space:pre">   想说 :</span>
        </div>
      <div>
        <table width="100%">
          <tr>
            <td>
              选择餐厅:
            </td>
          <td>
            <select v-model="canteenId" v-if="canteenlist.length">
              <option v-bind:value="canteen.canteenId" v-for="(canteen,index) in canteenlist":key="index">
                <span>{{canteen.canteenName}}</span>
              </option>
            </select>
          </td>
        </tr>
          <tr>
            <td>服务评分:</td>
            <td><AddScore v-on:callback="callBackScore1" :size="48"></AddScore></td>
          </tr>
          <tr>
            <td>味道评分:</td>
            <td><AddScore v-on:callback="callBackScore2" :size="48"></AddScore></td>
          </tr>
        </table>
      </div>
      <input placeholder="请输入标题:" style="width: 100%;height: 25px" v-model="title"/>
      <textarea placeholder="请输入内容:" class="content" v-model="text"></textarea>
      <div class="btns">
        <div class="default-btn" @click="clearBtn">
          {{cancelText}}
        </div>
        <div class="danger-btn" @click="sendrBtn">
          {{dangerText}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddScore from '../../../components/Score/AddScore.vue'
import {mapState} from 'vuex'
var saved = ''
var isClear = false
export default {
  name: 'CreateArticle',
  props: {
    text: '',
    img: '',
    title: '',
    canteenId: '',
    value: {},
    // 类型包括 defalut 默认， danger 危险， confirm 确认，
    type: {
      type: String,
      default: 'default'
    },
    cancelText: {
      type: String,
      default: '清空'
    },
    dangerText: {
      type: String,
      default: '发送'
    }
  },
  data () {
    return {
      uname: '',
      uid: '',
      canteenlist: [],
      score: '',
      score1: '',
      score2: ''
    }
  },
  created () {
    this.uname = this.userInfo.name
    this.uid = this.userInfo.id
    this.$http.get('http://localhost:8087/canteens/canteenslist').then((response) => {
      response = response.body
      if (response.code === 0) {
        this.canteenlist = response.data
      }
    })
  },
  computed: {
    ...mapState(['userInfo']),
    finalScore () {
      this.score = (this.score1 + this.score2) / 2
    }
  },
  methods: {
    callBackScore1: function (s) {
      this.score1 = s
      this.finalScore()
    },
    callBackScore2: function (s) {
      this.score2 = s
      this.finalScore()
    },
    clearBtn () {
      if (!isClear) {
        if (this.text != null) {
          saved = this.text
          this.text = ''
          this.cancelText = '恢复'
          isClear = true
        }
      } else {
        this.text = saved
        saved = ''
        isClear = false
        this.cancelText = '清空'
      }
    },
    sendrBtn () {
      if (this.text != null) {
        this.img = ''
        var url = 'http://localhost:8087/buyer/article/canteen/createArticle?' +
          'articleImg=' + this.img +
          '&articleName=' + this.title +
          '&articleText=' + this.text +
          '&score=' + this.score +
          '&canteenId=' + this.canteenId +
          '&userId=' + this.userInfo.id +
          '&userName=' + encodeURI(this.userInfo.name)
        this.$http.post(url).then((response) => {
          response = response.body
          if (response.code === 0) {
            alert('发送成功')
            this.$router.push('/foodiegroup')
          } else {
            alert('您已写过该餐厅文章')
          }
        })
      }
    }
  },
  components: {
    AddScore
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .dialog{
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: rgba(0, 0, 0, 0.6)
    z-index: 9999
    .dialog-container{
      width: 100%
      height: 90%
      background: #ffffff
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      border-radius: 8px
      position: relative
      .dialog-title{
        width: 100%;
        height: 27%;
        font-size: 18px;
        color: #696969;
        font-weight: 600;
        padding: 16px 50px 0 20px;
        box-sizing: border-box;
      }
      .content{
        border-radius: 0
        width: 100%
        height:25%
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
        height: 27%;
        // line-height: 60px;
        position: absolute;
        bottom: 0;
        left: 0;
        margin :20px 0 0 20px;
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
