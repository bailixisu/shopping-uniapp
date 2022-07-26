<template>
	<view class="scroll-view-container">
		购物车
	</view>
	<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'" @click="clickAddAddress">
		<button type="primary" size="mini">请选择收货地址+</button>
	</view>
	<view class="address-info-box" v-if="JSON.stringify(address) !== '{}'" @click="clickAddAddress">
		<view class="row1">
			<view class="row1-left">
				<view class="username">
					收货人：{{address.userName}}
				</view>
			</view>
			<view class="row1-right">
				<view class="phone">
					电话 ： {{address.telNumber}}
				</view>
				<uni-icons type="arrowright" size='16'></uni-icons>
			</view>
		</view>
		<view class="row2">
			<view class="row2-left">
				收货地址 ：
			</view>
			<view class="row2-right">
				{{addressString}}
			</view>
		</view>
	</view>
	
	<view class="cart-title">
		<uni-icons type="shop" size="22"></uni-icons>
		<text class="cart-title-text">购物车</text>
	</view>
	
	<uni-swipe-action>
		<view class="cart-list">
			<uni-swipe-action-item  v-for="(item, index) in cart" :key="item.goods_id" :right-options=options @click='clickSwipeItem'>
				<view class="cart-list-item">
					<view class="selected-radio" >
						<radio :checked="item.goods_state" @click="clickRadio(index)"></radio>
					</view>
					<view class="cart-right">
						<view class="goods-item-left">
							<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
						</view>				
						<view class="goods-item-right">
							<view class="item-title">
								{{item.goods_name}}
							</view>
							<view class="item-info">
								<view class="item-price">￥{{priceToFixed(item.goods_price)}}</view>
								<view class="item-button">
									<button size="mini" class="button" @click="decreaseClick(index)">-</button>
									<text class="text">{{item.goods_count}}</text>
									<button size="mini" class="button" @click="increaseClick(index)">+</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</uni-swipe-action-item>
		</view>
	</uni-swipe-action>
	
	<view class="total-price-bar">
		<view class="total-selected">			
			<radio :checked="totalSelect" @click="clickTotalSelect"></radio>
			<text> 全选</text>
		</view>
		<view class="total-price">
			<text>合计 ： ￥{{priceToFixed(totalPrice)}}</text>
		</view>
		<view class="text-buy">
			结算({{totalSelectItem}})
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'

	export default {
		data (){
			return {
				options : [
					{
						text: '删除',
						style: {
							backgroundColor: '#ff0000'
						}
					}
				],
				
				totalSelect:true,
				isAddress : true,
				
			}
		},
		watch :{
			totalSelectItem : {
				handler(newVal,oldVal){
					this.setTabberBadge()
				},
				immediate:true
			}
		},
		computed :{
			...mapState(['cart','address']),
			priceToFixed(){
				return function(num){
					return Number(num).toFixed(2)
				}
			},
			...mapGetters(['totalPrice','totalSelectItem']),
			addressString(){
				return this.address.provinceName+this.address.cityName+this.address.countyName
				+this.address.detailInfo
			}
		},
		methods: {
			...mapMutations(['decreaseCount','increaseCount','changeGoodsState','deleteCartItem','changeAllItemsState','updateAddress']),
			decreaseClick(index){
				this.decreaseCount(index);
			},
			increaseClick(index){
				this.increaseCount(index);
			},
			clickRadio(index){
				this.changeGoodsState(index);
			},
			clickSwipeItem(e){
				this.deleteCartItem(e.index);
			},
			clickTotalSelect(){
				this.changeAllItemsState(this.totalSelect);
				this.totalSelect = !this.totalSelect;
			},
			async clickAddAddress(){
				const res = await uni.chooseAddress();
				this.updateAddress(res);
			},
			setTabberBadge(){
				const routes = getCurrentPages()
				if(routes[routes.length-1].route === 'pages/cart/cart'){
					uni.setTabBarBadge({
						index:2,
						text:this.totalSelectItem+'',
					})
				}
			}
		},
		onLoad() {
			uni.setTabBarBadge({
				index:2,
				text:this.totalSelectItem+'',
			})
		}
	}
	
	
</script>

<style lang="scss">
.cart-list-item {
	display: flex;
	
	.selected-radio {
		margin-top: 40px;
	}
}
.cart-title {
	height: 40px;
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid lightskyblue;
	
	.cart-title-text {
		margin-left: 10px;
	}
}
.cart-right {
	display: flex;
	padding: 5px;
	border-bottom: 1px solid #efefef;
	
	.goods-item-left {
		margin-right: 5px;
		
		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	
	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		.item-title {
			font-size: 13px;
			
		}
		
		.item-info {
			display: flex;
			position: relative;
			.item-price {
				color: #c00000;
				font-size: 16px;
			}
			
			.item-button {
				display: flex;
				position: absolute;
				right: 10px;
				
				.button {
					margin: 0 5px;
				}
				
				.text {
					font-weight: 400;
					margin-top: 5px;
				}
				
			}
		}
	}
	
}
.total-price-bar {
	display: flex;
	height: 40px;
	align-items: center;
	justify-content :space-between;
	position: fixed;
	width: 100%;
	bottom: 0;
	border: 1px solid gray;
	.total-price {
		display: flex;
		align-items: center;
		color: #c00000;
	}
	
	.text-buy {
		width: 70px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		background-color: #c00000;
	}
}
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
	
	
}
.address-info-box {
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	border-bottom: 2px solid skyblue;		
	.row1 {
		display: flex;
		justify-content: space-between;
		
	
		.row1-right {
			display: flex;
			justify-content: space-between;
		}
	}
	
	
	.row2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		
		.row2-left {
			white-space: nowrap;
		}
		
	}
}

</style>
