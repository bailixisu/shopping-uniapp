
export async function getSwiperList(){
	return uni.request({
		url:"https://api-ugo-web.itheima.net/api/public/v1/home/swiperdata",
		method:"GET",
	})
}