<template>
  <div class="cart-list-item">
    <div class="product-check-box">
      <check-button @click.native="clickCheck(product.iid)" :is-check="product.checked"></check-button>
    </div>
    <div class="product-img">
      <img :src="product.image">
    </div>
    <div class="product-message">
      <div class="product-title">{{product.title}}</div>
      <div class="product-desc">{{product.desc}}</div>
      <div class="product-bottom">
        <div class="product-price">¥{{product.price}}</div>
        <div class="product-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import { CHANGE_CHECK } from "store/mutation_types";

  export default {
    name: "CartListItem",
    components: {CheckButton},
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      clickCheck(iid){
        this.$store.commit(CHANGE_CHECK, iid);
      }
    }
  }
</script>

<style scoped>
  .cart-list-item{
    display: flex;

    padding: 5px;
    border-bottom: 1px solid #ddd;
  }

  .product-check-box{
    width: 40px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-img{
    padding: 5px;
  }
  .product-img img{
    width: 70px;
    border-radius: 5px;
    vertical-align: top;
  }

  .product-message{
    flex: 1;
    padding: 5px 10px;
    overflow: hidden;

    position: relative;
  }
  .product-title,.product-desc{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    width: 100%;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
  .product-title{
    color: #000;
  }
  .product-desc{
    color: var(--color-text);
  }

  .product-bottom{
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;

    margin-bottom: 10px;
  }
  .product-price{
    float: left;
    font-size: 12px;
    color: var(--color-high-text);
  }
  .product-count{
    float: right;
    font-size: 12px;
  }
</style>
