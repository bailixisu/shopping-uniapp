<template>
	<view class="scroll-view-container">
		<scroll-view class="left-scroll-view" :style="{height:wh+'px'}" scroll-y="true">
			<block v-for="(item, index) in cateList" :key="item.cat_id">
				<view :class="['left-scroll-view-item',active===index ? 'active' : '']" @click="changeActive(index)">
					{{item.cat_name}}
				</view>
			</block>
		</scroll-view>
		<scroll-view class="right-scroll-view" :style="{height:wh+'px'}" scroll-y="true">
			<view class="cate-lv2" v-for="(item ,index) in cateListLevelTwo" :key="item.cat_id">
				<view class="cate-lv2-title">{{item.cat_name}}</view>
				<view class="cate-lv3">
					<view class="cate-lv3-item" v-for="(value) in item.children" :key="value.cat_id">
						<image :src="value.icon" class="cate-lv3-item-img"></image>
						<text class="cate-lv3-item-text">{{value.cat_name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//屏幕可使用高度
				wh:0,
				//分类列表数据
				cateList:[],
				//二级分类的数据
				cateListLevelTwo:[],
				//当前点击项
				active:0
			};
		},
		computed(){
			
		},
		onLoad() {
			this.wh=uni.getSystemInfoSync().windowHeight;
			console.log(this.wh,'wh');
			this.getCateList();
		},
		methods:{
			//获取分类列表数据
			async getCateList(){
				const res = await uni.request({
					url:"https://api-ugo-web.itheima.net/api/public/v1/categories",
					method:"GET",
				})
				if(res.data.meta.status!==200){
					return uni.showToast({
						title:title,
						duration:duration,
						icon:"none"
					})
				}
				this.cateList=res.data.message;
				if(this.cateList.length>0){
					this.cateListLevelTwo=this.cateList[0].children;
				}
			},
			changeActive(index){
				this.active=index

				this.cateListLevelTwo=this.cateList[index].children;
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
	}
	.left-scroll-view {
		width: 120px;
	}
	.left-scroll-view-item {
		background-color: #f7f7f7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;
		position: relative;
		
		&.active{
			background-color: #fff;
			
			&::before {
				content: '';
				display: block;
				background-color: skyblue;
				width: 3px;
				height: 30px;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		
	}
	.right-scroll-view {
		
	}


</style>
