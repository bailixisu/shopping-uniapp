<template>
	<view>
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
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//商品详细信息
				goodsDetail:{},
			}
		},
		computed:{
			priceToFixed(){
				return function(num){
					return Number(num).toFixed(2)
				}
			}
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
			}
		},
		onLoad(options) {
			this.getGoodsDetail(options.goods_id);
		}
	}
</script>

<style lang="scss">
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
</style>
