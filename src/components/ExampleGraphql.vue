<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      v-for="(poem, index) in allPublicPoems"
      :key="index"
      :class="index % 2 === 0 ? 'bg-blue-2' : 'bg-blue-3'"
      style="min-width: 250px;"
    >
      <h3 class="poem-title">{{ poem.title }}</h3>
      <p style="padding-left: 10px;">
        <strong>Author: {{ poem.author.name }}</strong>
      </p>
      <p v-html="poem.content" style="padding: 10px; max-height: 300px;" />
      <p class="poem-time">
        <strong>{{ relativeTime(poem.createdAt) }}</strong>
      </p>
    </q-card>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import {NEW_POEM_FETCHED} from '../common/mutation-types'
import relativeTime from '../common/utils/relative-time'

export default {
  apollo: {
    allPublicPoems: {
      query() {
        return gql`
          query {
            allPublicPoems {
              author {
                name
              }
              title
              content
              createdAt
            }
          }
        `
      },
    },
  },
  created() {
    if (this.$store.state.poem.newPoem) {
      this.$apollo.queries.allPublicPoems.refetch()
      this.$store.commit(NEW_POEM_FETCHED)
    }
  },
  data() {
    return {
      poems: {},
    }
  },
  methods: {
    relativeTime,
  },
}
</script>
