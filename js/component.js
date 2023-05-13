// <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
var bus = new Vue(); // 事件总线
// 背景图组件
Vue.component('bg', {
	template: `
		<div :style="{
			'background':'url('+src+') center no-repeat',
			'background-size':'cover',
			'width':width,
			'height':height,
		}"></div>
	`,
	props: ['src','width','height']
});
// 轮播图组件
Vue.component('swiper', {
	template: `
		<div class="swiper-container" :class="name">
			<div class="swiper-wrapper">
				<slot></slot>
			</div>
			<div class="swiper-pagination" v-show="indicator"></div>
		</div>
	`,
	props: ['name','direction','autoplay','speed','indicator'],
	data() {return {
		swiper: null
	}},
	mounted() {
		var name = this.name;
		this.swiper = new Swiper('.'+this.name, {
			direction: this.direction,
			pagination: '.swiper-pagination',
			loop: this.autoplay ? true : false,
			autoplay: this.autoplay,
			autoplayDisableOnInteraction: false,
			speed: this.speed,
			observer: true,
			observeParents: true,
			onSlideChangeStart(swiper) {
				bus.$emit(name, swiper.activeIndex);
			}
		});
	}
});