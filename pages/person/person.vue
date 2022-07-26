<template>
	<view>
		<my-login v-if="token === ''" ></my-login>
		<user-info v-if="token !== ''"></user-info>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed :{
			...mapState(['token'])
		},
		onLoad() {
		}
	}
</script>

<style lang="scss">

</style>
