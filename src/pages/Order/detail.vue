<template>
    <div id="detail">

            <div  class="statushead" >
                <div  class="statuscircle" style="transform: scale(1); opacity: 1;">
                    <img  class="circleimage" src="//fuss10.elemecdn.com/2/e4/bff50bab2840cdfbffeaf13a20710png.png" />
                    <!---->
                </div>
              <div>
                <a href="javascript:" class="go_back" @click="$router.back()">
                  <i class="iconfont icon-jiantou2"></i>
                </a></div>
                <!---->
                <h1  class="statustext"> {{order.orderStatus | orderStatusName}} </h1>

                <div  class="buttons">
                    <button v-if="order.orderStatus == 0 && order.payStatus == 0" @click="pay(order.orderId)">去支付</button>
                    <button v-if="order.orderStatus == 0" @click="cancelOrder(order.orderId)">{{cancelOrderName}}</button>
                </div>
            </div>
            <div  class="restaurant-card" >
                <div  class="head listitem">
                    <div  class="name-wrap">
                        <img  class="avatar" src="//fuss10.elemecdn.com/2/e4/bff50bab2840cdfbffeaf13a20710png.png" />
                        <span  class="name">商品信息</span>
                    </div>
                </div>
              <div  class="product-list listitem">
                <ul  class="cart-item" v-for="orderDetail in orderDetailList">
                  <li  class="product-item">
                    <div  class="profile">
                      <p  class="name">{{orderDetail.productName}}</p>
                    </div>
                    <div  class="price-wrap">
                      <span  class="quantity">x{{orderDetail.productQuantity}}</span>
                      <span >&yen;{{orderDetail.productPrice * orderDetail.productQuantity}}</span>
                    </div>
                  </li>
                </ul>
              </div>
                <!---->
                <div  class="finalprice listitem">
                    实付 &yen;{{order.orderAmount}}
                </div>
            </div>
            <div  class="detailcard" >
                <!---->
                <div  class="detailcard-delivery card">
                    <div  class="title listitem">
                        配送信息
                    </div>
                    <ul  class="cardlist">
                      <li  class="listitem"><span >包间数量：</span>{{order.roomQuantity}}</li>
                      <li  class="listitem"><span >联系方式：</span>{{order.buyerPhone}}</li>
                      <li  class="listitem"><span >买家姓名：</span>{{order.buyerName}}</li>
                        <!---->
                    </ul>
                </div>
                <div  class="detailcard-order card">
                    <div  class="title listitem">
                        订单信息
                    </div>
                    <ul  class="cardlist">
                        <li  class="listitem"><span >订单号：</span>{{order.orderId}} </li>
                        <li  class="listitem"><span >支付方式：</span>{{order.payType | payName}} </li>
                        <li  class="listitem"><span >下单时间：</span>{{order.createTime | time}} </li>
                    </ul>
                </div>
            </div>
    </div>
</template>

<script>
var config = require('config')
config = process.env.NODE_ENV === 'development' ? config.dev : config.build
export default {
  data () {
    return {
      order: {},
      orderDetailList: [],
      cancelOrderName: '取消订单'
    }
  },
  created () {
    this.$http.get('http://localhost:8087/buyer/order/details', {
      params: {
        orderId: this.$route.params.orderId,
        openid: 'jerry'
      }
    }).then(function (response) {
      this.order = response.body.data
      this.orderDetailList = this.order.orderDetailList
    })
  },
  filters: {
    payName: function (value) {
      if (value == 0) {
        return '货到付款'
      } else {
        return '微信支付'
      }
      微信支付
    },
    time: function (value) {
      var date = new Date(value * 1000)
      return date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate() + ' ' +
                    date.getHours() + ':' +
                    date.getMinutes()
    },
    /**
             * 待接单: orderStatus = 0
             * 订单已完结: orderStatus = 1
             * 订单已取消: orderStatus = 2
             * @param value
             */
    orderStatusName: function (value) {
      if (value == 0) {
        return '待接单'
      } else if (value == 1) {
        return '订单已完结'
      } else if (value == 2) {
        return '订单已取消'
      } else {
        return ''
      }
    }
  },
  methods: {
    cancelOrder: function (orderId) {
      this.cancelOrderName = '取消中...'
      this.$http.post('http://localhost:8087/buyer/order/cancel', {
        orderId: orderId,
        openid: 'jerry'
      }).then(function (response) {
        response = response.body
        if (response.code == 0) {
          location.reload()
        } else {
          alert('取消订单失败:' + response.msg)
        }
      })
    },
    pay: function (orderId) {
      location.href = config.wechatPayUrl +
                    '?openid=' + getCookie('openid') +
                    '&orderId=' + orderId +
                    '&returnUrl=' + encodeURIComponent(config.sellUrl + '/#/order/' + orderId)
    }
  }
}
function getCookie (name) {
  var arr
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) { return unescape(arr[2]) } else { return null }
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
  html, body {
    height: 100%;
  }

  #detail {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    .statuscircle {
      margin-bottom: 10px;
      text-align: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }

    }

    .statushead {
      position: relative;
      padding-top: 20px;
      text-align: center;
      background-color: #fff;
      padding-bottom: 30px;
      margin-bottom: 10px;
      .statustext {
        img {
          width: 8px;
        }
      }
        .buttons button {
            height: 1.853333rem;
            width: 4.8rem;
            white-space: nowrap;
            border-radius: .08rem;
            font-size: 0.8rem;
            color: #666;
            margin: .4rem .133333rem 0;
            border: 1px solid #ccc;
            background-color: transparent;
        }
    }
    .restaurant-card {
      margin-bottom: 10px;
      background-color: #fff;
      img {
        width: 7px;
      }
      .name-wrap {
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .detailcard {
      .title {
        color: #333;
        font-weight: 700;
      }
    }
    .detailcard-delivery {
      margin-bottom: 10px;
    }
    .listitem {
      padding: 15px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      background-color: #fff;
    }
  }

</style>
