<template>
  <ApolloQuery :query="poemQuery" :variables="{id}">
    <template v-slot="{result: {error, data}, isLoading}">
      <div v-if="isLoading">
        <p style="text-align: center;">
          加载中
          <q-spinner-dots />
        </p>
      </div>
      <div v-else-if="data">
        <div class="q-pa-md">
          <q-card>
            <p class="poem-time">
              <strong>{{ relativeTime(data.poem.createdAt) }}</strong>
            </p>
            <h3 class="poem-title">
              {{ data.poem.title }}
            </h3>
            <p style="padding-left: 10px;">
              <strong>Author: {{ data.poem.author.name }}</strong>
            </p>
            <p class="poem-content" v-html="sanitize(data.poem.content)" />
            <p v-if="session.user.id === data.poem.author.id" class="poem-edit">
              <q-btn color="primary" @click="editPoem(data.poem)">编辑</q-btn>
            </p>
          </q-card>
        </div>
      </div>
      <div v-else class="q-pa-md" @click="navTo('/')">
        没有找到这首诗<span aria-label="sad">😞</span>
      </div>
    </template>
  </ApolloQuery>
</template>
<script lang="ts">
import {PAGE_EDIT} from '../common/constants'
import {Poem} from '../common/types'
import {sanitize, relativeTime} from '../common/utils'
import {poemQuery, sessionQuery} from '../gql/queries'

import Vue from 'vue'

export default Vue.extend({
  name: 'PagePoem',
  apollo: {
    session: {
      query: sessionQuery,
      fetchPolicy: 'cache-only',
    },
  },
  data() {
    return {
      poemQuery,
      poem: {},
      session: {
        user: {
          id: '0',
        },
      },
    }
  },
  computed: {
    id(): string {
      return this.$route.params.id
    },
  },
  methods: {
    relativeTime,
    sanitize,
    navTo(path: string) {
      this.$router.push(path)
    },
    editPoem(poem: Poem) {
      if (this.session.user.id !== poem.author.id) return
      this.$router.push({
        name: PAGE_EDIT,
        params: {
          id: poem.id,
          title: poem.title,
          content: poem.content,
          isPublic: JSON.stringify(poem.isPublic),
        },
      })
    },
  },
})
</script>
