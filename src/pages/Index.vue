<template>
  <q-page>
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

<script lang="ts">
import ExampleGraphql from '../components/ExampleGraphql.vue'

import Vue from 'vue'

export default Vue.extend({
  name: 'PageIndex',
  components: {ExampleGraphql},
})
</script>
