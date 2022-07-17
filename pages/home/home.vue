<template>
	<view>
		<!-- 轮播图 -->
		<swiper 
		v-if="swiperList.length>0"
		:indicator-dots="true"
		:autoplay="true"
		:interval="3000"
		:duration="1000"
		:circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/goods_detail/goodsDetail/goodsDetail?goods_id='+item.goods_id">
					<image :src="item.image_src" ></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航栏 -->
		<view class="nav-list">
			<view v-for="(item,index) in navList" :key="index" @click="clickNav(item.name)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		
		<!-- 楼层 -->
		<view class="floor-list">
			<view v-for="(item,index) in floorList" class="floor-item" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="title-img"></image>
				<!-- 楼层内容图片 -->
				<view class="floor-box-img">
					<navigator class="left-box-img" :url="item.product_list[0].navigator_url">
						<image
						:src="item.product_list[0].image_src" 
						:style="{width:item.product_list[0].image_width+'rpx'}"
						mode="widthFix"
						></image>
					</navigator>
				
					<view class="right-box-img">
						<navigator v-for="(item2, index2) in product_list_slice(item.product_list)" :key="'item2'+index" :url="item2.navigator_url">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图的数据
				swiperList:[],
				//导航栏的数据
				navList:[],
				//楼层数据
				floorList:[]
			};
		},
		onLoad() {
			//获取轮播图的数据
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
			
		},
		computed:{
			product_list_slice(){
				return function(data){
					if(Array.isArray(data)){return data.slice(1)}
					return null
				}
			}
		},
		
		methods:{
			async getSwiperList(){
				const res = await uni.request({
					url:"https://api-ugo-web.itheima.net/api/public/v1/home/swiperdata",
					method:"GET",
				})
				if(res.data.meta.status!==200){
					return uni.showToast({
						title:title,
						duration:duration,
						icon:"none"
					})
				}
				
				this.swiperList=res.data.message
				
			},
			async getNavList(){
				const res= await uni.request({
					url:'https://api-ugo-web.itheima.net/api/public/v1/home/catitems',
					method:"GET"
				})
				if(res.data.meta.status!==200){
					return uni.showToast({
						title:title,
						duration:duration,
						icon:"none"
					})
				}
				this.navList=res.data.message
			},
			async getFloorList(){
				const res= await uni.request({
					url: 'https://api-ugo-web.itheima.net/api/public/v1/home/floordata',
					method:"GET"
				})
				if(res.data.meta.status!==200){
					return uni.showToast({
						title:title,
						duration:duration,
						icon:"none"
					})
				}
				//对数据出来，改变路由的接口
				if(Array.isArray(res.data.message)){
					res.data.message.forEach((value)=>{
						value.product_list.forEach(item=>{
							item.navigator_url="/goods_detail/goodsList/goodsList?"+item.navigator_url.split('?')[1];
						})
					})
				}
				
				this.floorList=res.data.message
				console.log(this.floorList,'floorlist');
			},
			
			
			clickNav(name){
				switch(name){
					case "分类":
						uni.switchTab({
							url:'/pages/cate/cate'
						});
						break;
					default : break;
				}
			},
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;
	}

	.swiper-item,
	image{
		width: 100%;
		height: 100%;
	}
	
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15px,0;
	}
	.nav-list image{
		width: 128rpx;
		height: 148rpx;
	}
	
	.floor-list .floor-item .title-img {
		width: 100%;
		height: 60rpx;
	}
	.floor-box-img{
		display: flex;
		padding-left: 10rpx;
		flex-wrap: nowrap;
	}
	.right-box-img{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
