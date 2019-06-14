<template>
  <q-page padding>
    <q-form class="q-gutter-md" @submit="handleSubmit">
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
import {sanitize} from '../common/utils'
import {allPublicPoemsQuery, myPoemsQuery} from '../gql/queries'
import {postPoemMutation, updatePoemMutation} from '../gql/mutations'

export default Vue.extend({
  name: 'PageWrite',
  data() {
    return {
      title: this.$route.params.title || '',
      content: this.$route.params.content || '',
      isPublic: this.$route.params.isPublic
        ? JSON.parse(this.$route.params.isPublic)
        : false,
      poemId: this.$route.params.id || '',
    }
  },
  methods: {
    sanitize,
    handleSubmit() {
      if (sanitize(this.content) === '') return
      if (this.poemId === '') this.postPoem()
      else this.updatePoem(this.poemId)
    },
    async postPoem() {
      try {
        await this.$apollo.mutate({
          mutation: postPoemMutation,
          variables: {
            title: this.title,
            content: sanitize(this.content),
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
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
      }
    },
    async updatePoem(id: string) {
      try {
        await this.$apollo.mutate({
          mutation: updatePoemMutation,
          variables: {
            id,
            newPoem: {
              title: this.title,
              content: sanitize(this.content),
              isPublic: this.isPublic,
            },
          },
          update(proxy, {data: {updatePoem}}) {
            const data = proxy.readQuery<MyPoemsQuery>({query: myPoemsQuery})
            if (data) {
              const idx = data.myPoems.findIndex(poem => poem.id === id)
              if (idx !== -1) {
                data.myPoems[idx] = updatePoem
              }
              proxy.writeQuery({query: myPoemsQuery, data})
            }

            if (updatePoem.isPublic) {
              const data = proxy.readQuery<AllPublicPoemsQuery>({
                query: allPublicPoemsQuery,
              })
              if (data) {
                const idx = data.allPublicPoems.findIndex(
                  poem => poem.id === id,
                )
                if (idx !== -1) {
                  data.allPublicPoems[idx] = updatePoem
                } else {
                  data.allPublicPoems.push(updatePoem)
                }
                proxy.writeQuery({query: allPublicPoemsQuery, data})
              }
            }
          },
        })
        this.$router.push(`/poem/${this.poemId}`)
      } catch (err) {
        console.log(err)
      }
    },
  },
})
</script>
