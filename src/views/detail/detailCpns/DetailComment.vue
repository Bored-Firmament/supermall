<template>
  <div class="detail-comment" v-if="comments.length !== 0">
    <div class="comment-header">
      <div>用户评价</div>
      <div>
        <span>更多</span>
        <i></i>
      </div>
    </div>
    <div class="comment-box" v-for="comment in comments">
      <div class="comment-user">
        <img :src="comment.user.avatar"/>
        <span>{{ comment.user.uname }}</span>
      </div>
      <div class="comment-info">
        <div class="comment-desc">{{ comment.content }}</div>
        <div class="comment-goods">
          <span>{{ comment.created | showDate }}</span>
          <span>{{ comment.style }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "common/utils";

  export default {
    name: "DetailComment",
    props: {
      comments: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters:{
      showDate(value) {
        let date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style scoped>
  .detail-comment{
    color: #333;
    border-bottom: 3px solid #f2f5f8;
  }

  .comment-header{
    padding: 0 10px;
    display: flex;
    justify-content: space-between;

    height: 50px;
    line-height: 50px;
    vertical-align: top;
    border-bottom: 1px solid #f2f5f8;
  }
  .comment-header span{
    display: inline-block;
    height: 100%;
    vertical-align: top;
  }
  .comment-header i{
    display: inline-block;
    width: 15px;
    height: 100%;
    background: url("~assets/img/common/back.svg") no-repeat 0px 16.5px/15px 15px;
    transform: rotate(180deg);
  }

  .comment-box{
    padding: 10px;
  }
  .comment-user img{
    border-radius: 50%;
    width: 40px;
    vertical-align: top;
    margin-right: 10px;
  }
  .comment-user span{
    line-height: 40px;
  }

  .comment-info{
    padding-top: 10px;
  }
  .comment-desc{
    font-size: 12px;
    color: #666;
    line-height: 20px;
  }
  .comment-goods{
    font-size: 12px;
    color: #999;
    line-height: 30px;
  }
  .comment-goods span:first-child{
    margin-right: 10px;
  }
</style>
