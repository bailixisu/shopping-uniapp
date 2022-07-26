
import {createStore} from 'vuex'



//创建store的实例对象

const store = createStore({
	
	state : ()=>({
		cart : [] ,
		address : {},
		token :''
	}),
	
	mutations : {
		addToCart(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++;
			}
		},
		increaseCount(state,index){
			state.cart[index].goods_count++;
		},
		decreaseCount(state,index){
			state.cart[index].goods_count--;
			if(state.cart[index].goods_count === 0){
				state.cart.splice(index,1);
			}
		},
		
		changeGoodsState(state,index){
			state.cart[index].goods_state = ! (state.cart[index].goods_state);
		},
		deleteCartItem(state,index){
			state.cart.splice(index,1);
		},
		changeAllItemsState(state,totalSelect){
			if(totalSelect){
				state.cart.forEach(value => {value.goods_state = false});
			}else{
				state.cart.forEach(value => {value.goods_state = true});
			}
		},
		updateAddress(state,address){
			state.address = address;
		}
	},
	
	getters : {
		total(state){
			let count = 0;
			 state.cart.forEach(goods => count += goods.goods_count);
			 return count;
		},
		totalPrice(state){
			let sum = 0;
			state.cart.forEach(value => {
				if(value.goods_state){
					sum += value.goods_count * value.goods_price;
				}
			})
			return sum;
		},
		totalSelectItem(state){
			let sum = 0;
			state.cart.forEach(value => {
				if(value.goods_state){
					sum += value.goods_count;
				}
			})
			return sum;
		}
	}
});

export default store