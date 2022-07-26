export default {
	namespaced : true,
	
	state : ()=>({
		cart : []
	}),
	
	mutations : {
		addToCart(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(!index){
				state.cart.push(goods)
			}else{
				findResult.goods_count++;
			}
		}
	},
	
	getters : {
		total(state){
			let count = 0;
			 state.cart.forEach(goods => count += goods.goods_count);
			 return count;
		}
	}
}