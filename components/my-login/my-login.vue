<template>
	<view class="login-container">

		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserInfo">一键登入</button>
		<text class="tips-text">登入后享更多权益</text>
	</view>
</template>

<script>
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			getUserInfo(){
				uni.getUserProfile({
					desc:'仅用于开发',
					success(res) {
						console.log(res,'res');
					},
					fail(err) {
						console.log(err,'err');
					},
					
				})
				// if(e.detail.errMsg === 'getUserInfo:fail auth deny'){
				// 	return uni.showToast({
				// 		title:'你取消了登入授权'
				// 	})
				// }
				
			},
		}
	}
</script>

<style lang="scss">
	.login-container{
		height: 750rpx;
		background-color: #F8F8F8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}
		
		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>