<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'AppSlide',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  props: {
    slideData: {
      type: Array,
      default: () => ([])
    },
    pageTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        // autoplay: false,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    swiper () {
      // @ts-ignore
      return this.$refs.appSwiper.$swiper
    }
  },
  mounted () {
    // console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    onSwiper (swiper) {
      // console.log(swiper)
    },
    onSlideChange () {
      // console.log('slide change')
    }
  }
}
</script>

<template>
  <div class="app-slide">
    <swiper
      ref="appSwiper"
      :options="swiperOption"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(item) in slideData"
        :key="item.id"
      >
        <div class="app-slide__imgWrapper">
          <a href="#"><img
            :src="item"
            class="app-slide__img"
          ></a>
        </div>
      </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination"
      />
      <div
        slot="button-prev"
        class="swiper-button-prev"
      />
      <div
        slot="button-next"
        class="swiper-button-next"
      />
    </swiper>
    <div
      v-if="slideData.length > 0"
      class="page-title"
    >
      {{ pageTitle }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-slide {
  position: relative;

  &__imgWrapper {
    height: 640px;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.page-title {
  position: absolute;
  bottom: 4.4rem;
  left: 36rem;
  z-index: 999;
  font-size: 4rem;
  color: #FFF;
}
</style>

<style lang="scss">
.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background-color: #FFF;
  opacity: 1;
}

.swiper-pagination-bullet-active {
  background-color: #AD2E1E;
}

.swiper-pagination .swiper-pagination-bullet {
  margin: 0 1rem !important;
}

.swiper-button-prev,
.swiper-button-next {
  color: #FFF;
}

.swiper-button-prev {
  left: 7.5rem;
}

.swiper-button-next {
  right: 7.5rem;
}
</style>
