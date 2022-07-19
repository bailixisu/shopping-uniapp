<template>
	<view>
		<view class="goods-list">
			<view class="goods-item" v-for="(item,index) in goodsList" :key="item.goods_id" @click="clickItem(item)">
				<view class="goods-item-left">
					<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
				</view>
				
				<view class="goods-item-right">
					<view class="item-title">
						{{item.goods_name}}
					</view>
					<view class="item-info">
						<view class="item-price">￥{{priceToFixed(item.goods_price)}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="no-data" v-if="!total">
			暂无商品数据.... -.-
		</view>
		<view class="no-more-data" v-if="isShow">
			没有更多商品数据了.... -.-
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品列表
				goodsList : [],
				// 请求参数
				queryObj:{
					query : '',
					cid : '',
					pagenum : 1,
					pagesize : 10
				},
				//总共的列表数据
				total : 0,
				//默认图片
				defaultPic:"https://static.botue.com/ugo/uploads/pic_floor03_3@2x.png",
				
				isShow : false,
				//节流阀
				isLoading : false
			};
		},
		
		onLoad(options){
			this.queryObj.query = options.query || '',
			this.queryObj.cid = options.cid || '',
			this.getGoodsList();
		},
		
		methods:{
			async getGoodsList(){
				this.isLoading = true;
				const res = await uni.request({
					url:'https://api-ugo-web.itheima.net/api/public/v1/goods/search',
					method:"GET",
					data:this.queryObj
				})
				this.isLoading = false;
				if(res.data.meta.status !== 200){
					return uni.showToast({
						title:title,
						duration:duration,
						icon:"none"
					})
				}
				console.log(res,'res in goodslist');
				this.goodsList.push(...res.data.message.goods);
				this.total = res.data.message.total;
			},
			
			clickItem(item){
				uni.navigateTo({
					url:'../goodsDetail/goodsDetail?goods_id=' + item.goods_id
				})
			}
		},
		computed:{
			priceToFixed(){
				return function(num){
					return Number(num).toFixed(2)
				}
			}
		},
		
		//触底调用函数
		onReachBottom(){
			if(this.isLoading){return }
			if((this.queryObj.pagenum * this.queryObj.pagesize) < this.total){
				
				this.queryObj.pagenum++;
				this.getGoodsList();
			}else{
				this.isShow = true;
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.queryObj.pagenum = 1;
			this.total = 0;
			this.isLoading = false;
			this.goodsList = [];
			
			//重新发请求，传入回调函数关闭下来刷新
			
			this.getGoodsList(()=> uni.stopPullDownRefresh());
			
		}
	}
</script>

<style lang="scss">
.goods-item {
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
			
			.item-price {
				color: #c00000;
				font-size: 16px;
			}
		}
	}
	
}

</style>
