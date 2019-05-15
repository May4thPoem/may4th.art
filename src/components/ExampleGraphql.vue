<template>
  <div>
    <div v-for="(poem, index) in allPublicPoems" :key="index">
      <h3>{{ poem.title }}</h3>
      <p>
        <strong>Author: {{ poem.author.name }}</strong>
      </p>
      <p v-html="poem.content" />
      <p style="text-align: right;">
        <strong>{{ relativeTime(poem.createdAt) }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'
import {NEW_POEM_FETCHED} from '../common/mutation-types'

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
    relativeTime: timestamp => moment(timestamp).fromNow(),
  },
}
</script>
