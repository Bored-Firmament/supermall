<template>
  <div class="cart-list">
    <cart-list-item v-for="item in cartList" :key="item.iid" :product="item"/>
  </div>
</template>

<script>
  import CartListItem from "@/views/shopcart/shopcartCpns/CartListItem";
  import { mapGetters } from "vuex";

  export default {
    name: "CartList",
    components: {CartListItem},
    computed: {
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>

</style>
