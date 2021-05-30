<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
// 滚动条插件
import ScrollBar from '@better-scroll/scroll-bar'
// 鼠标滚轮插件
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

export default {
  name: "Index",
  data() {
    return {
      scroll: {}
    }
  },
  components: {
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.scroll.destroy()
  },
  methods: {
    init(){
      this.scroll = new BScroll('.wrapper', {
        scrollY: true,
        mouseWheel: true,
        scrollbar: {
          fade: false,
          interactive: true,
          scrollbarTrackClickable: true
        }
      })
    }
  }
}
</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
