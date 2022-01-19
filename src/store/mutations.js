import { ADD_TO_CART,ADD_COUNTER,CHANGE_CHECK,CHANGE_ALL_CHECK } from "@/store/mutation_types";

export default{
  [ADD_TO_CART](state, payload){
    payload.count = 1;
    payload.checked = true;
    state.cartList.push(payload);
  },
  [ADD_COUNTER](state, payload){
    payload.count++;
  },
  [CHANGE_CHECK](state, payload){
    let product = state.cartList.find(item => item.iid === payload);
    product.checked = !product.checked;
  },
  [CHANGE_ALL_CHECK](state, payload){
    state.cartList.map(item => {
      item.checked = !payload
    })
  }
}
