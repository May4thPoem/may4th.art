<template>
  <ApolloQuery :query="poemQuery" :variables="{id}">
    <template v-slot="{result: {loading, error, data}}">
      <div v-if="loading">Loading...</div>
      <div v-else-if="data">
        <div class="q-pa-md">
          <q-card>
            <p class="poem-time">
              <strong>{{ relativeTime(poem.createdAt) }}</strong>
            </p>
            <h3 class="poem-title">
              {{ poem.title }}
            </h3>
            <p style="padding-left: 10px;">
              <strong>Author: {{ poem.author.name }}</strong>
            </p>
            <p v-html="poem.content" class="poem-content" />
          </q-card>
        </div>
      </div>
      <div v-else class="q-pa-md" @click="navTo('/')">
        没有找到这首诗<span aria-label="sad">😞</span>
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
import relativeTime from '../common/utils/relative-time'
import {poemQuery} from '../gql/queries'

export default {
  name: 'PagePoem',
  apollo: {
    poem: {
      query: poemQuery,
      variables() {
        return {
          id: this.id,
        }
      },
      fetchPolicy: 'cache-and-network',
    },
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10)
    },
  },
  data() {
    return {
      poemQuery,
      poem: {},
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
