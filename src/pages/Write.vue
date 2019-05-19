<template>
  <q-page padding>
    <q-form class="q-gutter-md" @submit="postPoem">
      <q-input
        v-model="title"
        filled
        label="标题 *"
        lazy-rules
        :rules="[val => (val && val.length > 0) || '标题不能为空']"
      />

      <q-toggle v-model="isPublic" label="公开发表" />

      <q-editor v-model="content" style="width: 100%; height: 100%;" />

      <div>
        <q-btn label="提交" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<style></style>

<script lang="ts">
import Vue from 'vue'
import {AllPublicPoemsQuery, MyPoemsQuery} from '../common/types'
import {allPublicPoemsQuery, myPoemsQuery} from '../gql/queries'
import {postPoemMutation} from '../gql/mutations'

export default Vue.extend({
  name: 'PageWrite',
  data() {
    return {
      title: '',
      content: '',
      isPublic: false,
    }
  },
  methods: {
    postPoem() {
      this.$apollo
        .mutate({
          mutation: postPoemMutation,
          variables: {
            title: this.title,
            content: this.content,
            isPublic: this.isPublic,
          },
          update(proxy, {data: {postPoem}}) {
            const data = proxy.readQuery<MyPoemsQuery>({query: myPoemsQuery})
            if (data) {
              data.myPoems.push(postPoem)
              proxy.writeQuery({query: myPoemsQuery, data})
            }

            if (postPoem.isPublic) {
              const data = proxy.readQuery<AllPublicPoemsQuery>({
                query: allPublicPoemsQuery,
              })
              if (data) {
                data.allPublicPoems.push(postPoem)
                proxy.writeQuery({query: allPublicPoemsQuery, data})
              }
            }
          },
        })
        .then(() => {
          this.$router.push('/my')
        })
        .catch(err => console.error(err))
    },
  },
})
</script>
