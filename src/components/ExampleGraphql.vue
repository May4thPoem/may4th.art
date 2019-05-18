<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      v-for="(poem, index) in allPublicPoems"
      :key="index"
      :class="index % 2 === 0 ? 'bg-blue-2' : 'bg-blue-3'"
      style="min-width: 250px;"
    >
      <p class="poem-time">
        <strong>{{ relativeTime(poem.createdAt) }}</strong>
      </p>
      <h3 class="poem-title" @click="navTo(`/poem/${poem.id}`)">
        {{ poem.title }}
      </h3>
      <p style="padding-left: 10px;">
        <strong>Author: {{ poem.author.name }}</strong>
      </p>
      <p v-html="poem.content" class="poem-content" />
    </q-card>
  </div>
</template>

<script>
import relativeTime from '../common/utils/relative-time'
import {allPublicPoemsQuery} from '../gql/queries'

export default {
  apollo: {
    allPublicPoems: {
      query: allPublicPoemsQuery,
      fetchPolicy: 'cache-and-network',
    },
  },
  data() {
    return {
      allPublicPoems: {},
    }
  },
  methods: {
    relativeTime,
    navTo(path) {
      this.$router.push(path)
    },
  },
}
</script>
