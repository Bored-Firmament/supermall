<template>
  <div class="cart-bottom-bar">
    <div class="check-box">
      <check-button ref="allCheck" :is-check="isAllCheck" @click.native="clickAllCheck()"></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">
      <span>合计: {{checkedProductPriceTotal | priceDecoration}}</span>
    </div>
    <div class="settlement" @click="$toast.show('目前不支持该功能')">
      <span>去结算({{checkedProductCountTotal}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters } from "vuex";

  import { CHANGE_ALL_CHECK } from "store/mutation_types";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      checkedProductPriceTotal(){
        return this.$store.getters.cartList
          .filter(item => item.checked)
          .reduce((result,item) => result + item.price*item.count, 0)
          .toFixed(2)
      },
      checkedProductCountTotal(){
        return this.cartList.filter(item => item.checked).length
      },
      isAllCheck(){
        return this.cartList.every(item => item.checked)
      }
    },
    filters: {
      priceDecoration(price) {
        return "￥" + price
      }
    },
    methods: {
      clickAllCheck() {
        let currentAllCheck = this.isAllCheck;
        this.$store.commit(CHANGE_ALL_CHECK, currentAllCheck);
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    height: 30px;
    background-color: #ededed;

    display: flex;
  }

  .cart-bottom-bar span{
    font-size: 12px;
  }

  .check-box{
    width: 70px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .check-box span{
    margin-left: 5px;
  }
  .totalPrice{
    flex: 1;

    display: flex;
    align-items: center;
  }
  .settlement{
    width: 100px;
    background-color: var(--color-high-text);
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
