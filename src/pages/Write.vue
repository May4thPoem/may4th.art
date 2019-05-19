<template>
  <q-page padding>
    <q-form @submit="postPoem" class="q-gutter-md">
      <q-input
        filled
        v-model="title"
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

<script>
import {allPublicPoemsQuery} from '../gql/queries'
import {postPoemMutation} from '../gql/mutations'

export default {
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
          update(
            proxy,
            {
              data: {postPoem},
            },
          ) {
            if (postPoem.isPublic) {
              const data = proxy.readQuery({query: allPublicPoemsQuery})
              data.allPublicPoems.push(postPoem)
              proxy.writeQuery({query: allPublicPoemsQuery, data})
            }
          },
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => console.error(err))
    },
  },
}
</script>
