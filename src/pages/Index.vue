<template>
  <q-page>
    <!-- <div ref="hello" @click="handleClick">Hello</div> -->
    <example-graphql />
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-page>
</template>

<style></style>

<script>
import {TweenMax} from 'gsap/TweenMax'
import ExampleGraphql from 'src/components/ExampleGraphql.vue'

export default {
  name: 'PageIndex',
  components: {ExampleGraphql},
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
