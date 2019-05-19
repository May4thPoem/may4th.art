<template>
  <q-infinite-scroll :offset="250" @load="onLoad">
    <q-pull-to-refresh @refresh="refresh">
      <div class="q-pa-md row justify-center items-start q-gutter-md">
        <q-card
          v-for="(poem, index) in allPublicPoems"
          :key="index"
          :class="
            `${
              index % 2 === 0 ? 'bg-blue-2' : 'bg-blue-3'
            } col-xs-11 col-sm-5 col-md-3`
          "
        >
          <p class="poem-time">
            <strong>{{ relativeTime(poem.createdAt) }}</strong>
          </p>
          <h1 class="poem-title" @click="navTo(`/poem/${poem.id}`)">
            {{ poem.title }}
          </h1>
          <p style="padding-left: 10px;">
            <strong>Author: {{ poem.author.name }}</strong>
          </p>
          <p class="poem-content" v-html="sanitize(poem.content)" />
        </q-card>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-pull-to-refresh>
  </q-infinite-scroll>
</template>

<script lang="ts">
import {relativeTime, sanitize} from '../common/utils'
import {allPublicPoemsQuery} from '../gql/queries'

import Vue from 'vue'

export default Vue.extend({
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
    sanitize,
    navTo(path: string) {
      this.$router.push(path)
    },
    refresh(done: () => void) {
      this.$apollo.queries.allPublicPoems.refetch().then(() => done())
    },
    onLoad(index: number, done: () => void) {
      setTimeout(() => done(), 2000)
    },
  },
})
</script>
