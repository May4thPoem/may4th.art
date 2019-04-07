<template>
  <q-page class="flex flex-center">
    <div ref="hello" @click="handleClick">Hello</div>
  </q-page>
</template>

<style></style>

<script>
import {TweenMax} from 'gsap/TweenMax'

export default {
  name: 'PageIndex',
  methods: {
    handleClick() {
      const hello = this.$refs.hello
      const interval = setInterval(() => {
        TweenMax.to(hello, 0.5, {x: '+=100', y: '+=100'})
      }, 500)
      setTimeout(() => {
        clearInterval(interval)
      }, 2000)
    },
  },
}
</script>
