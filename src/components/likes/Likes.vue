<!--suppress ALL -->
<template>
    <div id="likes">
      <div v-if="status=='0'">
        {{likes}}<img @click="addlike" :style="{width:size+'px'}" src="./images/like.png"> {{dislikes}}<img @click="addhate" :style="{width:size+'px'}" src="./images/unlike.png">
      </div>
      <div v-else-if="status=='1'">
        {{likes}}<img @click="addlike" :style="{width:size+'px'}" src="./images/islike.png"> {{dislikes}}<img @click="addhate" :style="{width:size+'px'}" src="./images/unlike.png">
      </div>
      <div v-else-if="status=='-1'">
        {{likes}}<img @click="addlike" :style="{width:size+'px'}" src="./images/like.png"> {{dislikes}}<img @click="addhate" :style="{width:size+'px'}" src="./images/unliked.png">
      </div>
    </div>
</template>

<script type="text/javascript">
var type = 0
export default {
  props: {
    status: '',
    likes: '',
    dislikes: '',
    articleId: '',
    commentId: '',
    canteenId: '',
    req: '',
    size: ''
  },
  name: 'Likes',
  methods: {
    addlike: function () {
      this.type = 1
      var url
      if(this.req){
        url='http://localhost:8087/buyer/article/canteen/addlikes?articleId=' +
          this.articleId + '&status=' +
          this.status + '&type=' +
          this.type + '&canteenId='+this.canteenId
        if(this.commentId!=null){
          url+= '&articleCommentId=' + this.commentId
        }
      }else if(this.req==0){
        url='http://localhost:8087/buyer/article/addlikes?articleId=' +
          this.articleId + '&status=' +
          this.status + '&type=' +
          this.type + '&canteenId='+this.canteenId
        if(this.commentId!=null){
          url+= '&articleCommentId=' + this.commentId
        }
      }
      this.$http.post(url).then(function (response) {
        if(this.status!=this.type){
          this.likes=this.likes+1
          if(this.status==-1){
            this.dislikes=this.dislikes-1
          }
          this.status=1
        }else{
          this.likes=this.likes-1
          this.status=0
        }
      })
    },
    addhate: function () {
      this.type = -1
      if(this.req){
        var url='http://localhost:8087/buyer/article/canteen/addlikes?articleId=' +
          this.articleId + '&status=' +
          this.status + '&type=' +
          this.type + '&canteenId='+this.canteenId
        if(this.commentId!=null){
          url+= '&articleCommentId=' + this.commentId
        }
      }else if(this.req==0){
        var url='http://localhost:8087/buyer/article/addlikes?articleId=' +
          this.articleId + '&status=' +
          this.status + '&type=' +
          this.type + '&canteenId='+this.canteenId
        if(this.commentId!=null){
          url+= '&articleCommentId=' + this.commentId
        }
      }
      this.$http.post(url).then(function (response) {
        if(this.status!=this.type){
          this.dislikes=this.dislikes+1
          if(this.status==1){
            this.likes=this.likes-1
          }
          this.status=-1
        }else{
          this.status=0
          this.dislikes=this.dislikes-1
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
    img {
      width 25px;
      height auto;
    }

</style>
