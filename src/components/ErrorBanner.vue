<template>
  <q-banner>
    <template v-slot:avatar>
      <q-icon name="warning" color="warning" />
    </template>
    {{ errorMessage }}
  </q-banner>
</template>

<script>
export default {
  name: 'ErrorBanner',
  props: {
    errorMessage: String,
  },
}
</script>
