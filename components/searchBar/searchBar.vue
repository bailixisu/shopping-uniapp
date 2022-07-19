<template>
	<view class="search-bar-container" @click="clickSearch">
		<view class="search-bar-box">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"searchBar",
		data() {
			return {
				
			};
		},
		methods:{
			clickSearch(){
				uni.navigateTo({
					url:'../../goods_detail/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.search-bar-container{
	height: 50px;
	background-color: #C00000;
	display: flex;
	align-items: center;
	padding: 0 10px;
	
	.search-bar-box {
		height: 36px;
		background-color: #fff;
		border-radius: 18px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.placeholder {
		font-size: 15px;
		margin-left: 5px;
	}
}
</style>