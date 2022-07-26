<template>
	<view class="goods-detail-container">
		<swiper
		:indicator-dots="true"
		:autoplay="true"
		:interval="3000"
		:duration="1000"
		:circular="true">
			<swiper-item v-for="(item,index) in goodsDetail.pics" :key="item.pics_id" @click="preview(index)">
				<image :src="item.pics_big" ></image>
			</swiper-item>
		</swiper>
		<view class="goods-info">
			<view class="goods-price">￥{{priceToFixed(goodsDetail.goods_price)}}</view>
			<view class="goods-info-body">
				<view class="goods-name">{{goodsDetail.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递，免运费</view>
		</view>		
		
		<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
		<view class="goods-nav">
			<uni-goods-nav :options="options" :buttonGroup="buttonGroup" :fill="true"
			@click="leftButtonClick" @buttonClick="rightButtonClick"
			></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters,useStore} from 'vuex'
	export default {
		data() {
			return {
				//商品详细信息
				goodsDetail:{},
				
				//商品导航栏左侧按钮
				options:[
					{
						icon : 'shop',
						text : '店铺'
					},
					{
						icon : 'cart',
						text : '购物车',
						info : 0
					},
					
				],
				//商品导航栏右侧按钮
				
				buttonGroup:[
					{
						text:'加入购物车',
						backgroundColor:'#ff0000',
						color:'#fff'
					},
					{
						text:'立即购买',
						backgroundColor:'#ffa200',
						color:'#fff'
					},
				],
			}
		},
		watch : {
			total : {
				handler(newVal,oldVal){
					console.log(newVal,oldVal,'val in watch');
					this.options[1].info=newVal
				},
				immediate: true
			}
		},
		computed:{
			priceToFixed(){
				return function(num){
					return Number(num).toFixed(2)
				}
			},
			...mapGetters(['total']),
		},
		methods: {
			async getGoodsDetail(goods_id){
				const res= await uni.request({
					url:'https://api-ugo-web.itheima.net/api/public/v1/goods/detail',
					method:"GET",
					data:{
						goods_id:goods_id
					}
				})
				if(res.data.meta.status!==200){
					return uni.showToast({
						title:title,
						duration:duration,
						icon:"none"
					})
				}
				console.log(res,'detail');
				this.goodsDetail = res.data.message;
			},
			preview(index){
				//图片预览的api
				uni.previewImage({
					current:index,
					urls:this.goodsDetail.pics.map(x => x.pics_big)
				})
			},
			leftButtonClick(e){
				switch(e.content.text){
					case "购物车":
						uni.switchTab({
							url:'/pages/cart/cart'
						});
						break;
					case "店铺":break;
					default:break;
				}
			},
			rightButtonClick(e){
				switch(e.content.text){
					// let that = this;
					case "加入购物车":
					// goods_id,goods_name,goods_count,goods_small_logo,goods_state
						const goods = {
							goods_id : this.goodsDetail.goods_id,
							goods_name : this.goodsDetail.goods_name,
							goods_count : 1,
							goods_small_logo : this.goodsDetail.goods_small_logo,
							goods_price : this.goodsDetail.goods_price,
							goods_state : true
						}
						// this.add;
						this.addToCart(goods);
						// this.$store.commit('')
						break;
					case "立即购买" : 
						uni.switchTab({
							url:'/pages/cart/cart'
						})
						break;
					default : break;
				}
			},
			...mapMutations(['addToCart']),
			
		},
		onLoad(options) {
			this.getGoodsDetail(options.goods_id);
			console.log(this.$store.state,'ssssss');
		}
	}
</script>

<style lang="scss">
.goods-detail-container{
	padding-bottom:50px ;
}
swiper {
	height: 750rpx;
	
	image {
		width: 100%;
		height: 100%;
	}
}

.goods-info {
	padding: 10px;
	padding-right: 0;
	border-bottom: 1px solid gray;
	margin-bottom: 10px;
	
	.goods-price {
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}
	
	.goods-info-body {
		display: flex;
		justify-content: space-between;
		
		.goods-name {
			font-size: 13px;
			margin-right: 10px;
		}
		
		.favi {
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-left: 1px solid skyblue;
			color: gray;
		}
		
	}
	.yf {
		font-size: 12px;
		color: gray;
		margin: 10px 0;
		opacity: 0.7;
	}
}

.goods-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
