<template>
	<view>
		<!-- 搜索框 -->
		<view class="uni-searchbar-input" ref="search-input-id">
			<uni-search-bar 
			v-model="keyWord"
			@input="input"
			cancelButton="none"
			clearButton="auto"			
			radius="100"></uni-search-bar>
		</view>
		
		<!-- 搜索结果 -->
		<view class="search-list" v-show="keyWord!==''">
			<view class="search-item" v-for="(item,index) in searchList" :key="item.goods_id" @click="cilckItem(item)">
				<view class="item-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-show="keyWord===''">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="deleteSearchHistories"></uni-icons>
			</view>
			
			<view class="history-list">
				<uni-tag v-for="(item,index) in searchHistories" :text="item" :key="index" @click="cilckHistoryTag(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//防抖函数
				timer:null,
				//搜索关键词
				keyWord:'',
				//搜索结果
				searchList:[],
				//搜索历史
				searchHistories:['a','b','c']
			};
		},
		methods:{
			input(e){
				clearTimeout(this.timer)				
				this.timer = setTimeout(()=>{
					this.keyWord = e;
					this.getSearchList();
					this.saveSearchHistory()
				},500)
			},
			
			
			async getSearchList(){
				if(this.keyWord === ''){
					this.searchList = [];
					return
				};
				const res = await uni.request({
					url:'https://api-ugo-web.itheima.net/api/public/v1/goods/qsearch',
					method:"GET",
					data:{
						query:this.keyWord
					}
					
				})
				if(res.data.meta.status!==200){
					return uni.showToast({
						title:title,
						duration:duration,
						icon:"none"
					})
				}
				this.searchList=res.data.message;
			},
			
			
			cilckItem(item){
				uni.navigateTo({
					url:'../goodsDetail/goodsDetail?goods_id='+item.goods_id
				})
			},
			
			
			saveSearchHistory(){
				this.searchHistories.unshift(this.keyWord);
				this.searchHistories=Array.from(new Set(this.searchHistories));
			},
			
			
			deleteSearchHistories(){
				this.searchHistories=[]
			},
			
			cilckHistoryTag(item){
				this.input(item);
			}
		},

	}
</script>

<style lang="scss">	
	.uni-searchbar {
		background-color: #c00000;
	}
	.search-list {
		padding: 0 5px;
		
		.search-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			
			.item-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
	
	.history-box {
		padding: 0 5px;
		
		.history-title {
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
			
		}
		
		.history-list {
			display: flex;
			flex-wrap: wrap;
			
			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>
