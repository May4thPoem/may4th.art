<template>
  <div>
    <div v-for="(poem, index) in poems" :key="index">
      <h3>{{ poem.title }}</h3>
      <h4>{{ poem.content }}</h4>
      <h4>{{ relativeTime(poem.createdAt) }}</h4>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import moment from 'moment'

export default {
  apollo: {
    poems: {
      query() {
        return gql`
          query {
            poems {
              title
              content
              createdAt
            }
          }
        `
      },
    },
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
