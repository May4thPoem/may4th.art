<template>
  <q-page>
    {{ poem.title }}
  </q-page>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'PagePoem',
  apollo: {
    poem: {
      query: gql`
        query PoemQuery($id: Float!) {
          poem(id: $id) {
            title
            content
            createdAt
            updatedAt
          }
        }
      `,
      variables() {
        return {
          id: this.id,
        }
      },
    },
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10)
    },
  },
}
</script>
