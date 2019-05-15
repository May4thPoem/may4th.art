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
import gql from 'graphql-tag'
import {NEW_POEM} from '../common/mutation-types'

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
          mutation: gql`
            mutation postPoemMutation(
              $title: String!
              $content: String!
              $isPublic: Boolean
            ) {
              postPoem(
                newPoem: {title: $title, content: $content, isPublic: $isPublic}
              ) {
                title
              }
            }
          `,
          variables: {
            title: this.title,
            content: this.content,
            isPublic: this.isPublic,
          },
        })
        .then(() => {
          this.$router.push('/')
          this.$store.commit(NEW_POEM)
        })
        .catch(err => console.error(err))
    },
  },
}
</script>
