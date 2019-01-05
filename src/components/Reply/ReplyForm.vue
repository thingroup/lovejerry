<template>
  <div>
    <div class="reply_form">
      <div v-if="commentId=='*'">
        <p style="white-space: pre-line;">评论 :{{luname}} :</p>
        <textarea v-model="reply" placeholder="请输入..."></textarea>
      </div>
      <div v-else-if="commentId!='*'">
        <p style="white-space: pre-line;">回复 @:{{luname}} :</p>
        <textarea v-model="reply" placeholder="请输入..."></textarea>
      </div>
      {{reply}}
      <input type="submit" @click="sendReply" value="发送"/>
    </div>
    <div>
      <div @click="openMask">打开弹窗</div>
      <dialog-bar v-model="sendVal" type="danger"
                  title="我是标题" content="我是内容" v-on:cancel="clickCancel()"
                  @danger="clickDanger()" @confirm="clickConfirm()" dangerText="Delete">
      </dialog-bar>
    </div>
  </div>
</template>

<script>
import dialogBar from './dialog.vue'
export default {
  name: 'ReplyForm',
  props: {
    articleId: '',
    commentId: '',
    luname: '',
    luid: ''
  },
  data: function () {
    return {
      reply: '',
      sendVal: false
    }
  },
  methods: {
    sendReply: function () {
    },
    openMask () {
      this.sendVal = true
    },
    clickCancel () {
      console.log('点击了取消')
    },
    clickDanger () {
      console.log('这里是danger回调')
    },
    clickConfirm () {
      console.log('点击了confirm')
    }
  },
  components: {
    dialogBar
  }
}
</script>

<style scoped>
textarea{
  width: 90%;
  height: 35px;
}
</style>
