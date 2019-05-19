<template>
  <q-banner>
    <template v-slot:avatar>
      <q-icon name="warning" color="warning" />
    </template>
    {{ errorMessage }}
  </q-banner>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ErrorBanner',
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
  },
})
</script>
