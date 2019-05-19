<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      title="我的诗作"
      :data="myPoems"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            <div @click="viewPoem(props.row)">{{ props.row.title }}</div>
          </q-td>
          <q-td key="isPublic" :props="props">{{
            props.row.isPublic ? '是' : '否'
          }}</q-td>
          <q-td key="createdAt" :props="props">{{
            new Date(props.row.createdAt).toLocaleString()
          }}</q-td>
          <q-td key="updatedAt" :props="props">{{
            relativeTime(props.row.updatedAt)
          }}</q-td>
          <q-td auto-width>
            <q-btn color="primary" @click="editPoem(props.row)">
              <q-icon name="edit" color="white" />
            </q-btn>
          </q-td>
          <q-td auto-width>
            <q-btn color="red" @click="deletePoem(props.row.id)">
              <q-icon name="delete" color="white" />
            </q-btn>
          </q-td>
          <q-td auto-width />
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style></style>

<script lang="ts">
import Vue from 'vue'
import {PAGE_EDIT, PAGE_POEM} from '../common/constants'
import {relativeTime} from '../common/utils'
import {Poem, MyPoemsQuery} from '../common/types'
import {myPoemsQuery} from '../gql/queries'
import {deletePoemMutation} from '../gql/mutations'

export default Vue.extend({
  name: 'PageMy',
  data() {
    return {
      columns: [
        {
          name: 'title',
          required: true,
          label: '标题',
          align: 'left',
          field: 'title',
          sortable: true,
        },
        {
          name: 'isPublic',
          required: true,
          label: '是否公开',
          align: 'center',
          field: 'isPublic',
          format: (isPublic: boolean) => (isPublic ? '是' : '否'),
          sortable: false,
        },
        {
          name: 'createdAt',
          required: true,
          label: '发布时间',
          align: 'center',
          field: 'createdAt',
          sortable: true,
        },
        {
          name: 'updatedAt',
          required: true,
          label: '最后更新',
          align: 'center',
          field: 'updatedAt',
          sortable: true,
        },
      ],
      myPoems: [],
      currentId: 0,
    }
  },
  apollo: {
    myPoems: {
      query: myPoemsQuery,
      fetchPolicy: 'cache-and-network',
    },
  },
  methods: {
    relativeTime,
    viewPoem(poem: Poem) {
      console.log(poem)
      if (poem.isPublic) {
        this.$router.push({name: PAGE_POEM, params: {id: poem.id}})
      } else {
        this.editPoem(poem)
      }
    },
    editPoem(poem: Poem) {
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
    deletePoem(id: string) {
      this.$apollo
        .mutate({
          mutation: deletePoemMutation,
          variables: {
            id,
          },
          update(proxy) {
            const data = proxy.readQuery<MyPoemsQuery>({query: myPoemsQuery})
            if (data) {
              const idx = data.myPoems.findIndex((poem: Poem) => poem.id === id)
              data.myPoems.splice(idx, 1)
              proxy.writeQuery({query: myPoemsQuery, data})
            }
          },
        })
        .catch(err => console.log(err))
    },
  },
})
</script>

<style lang="stylus" scoped>
.my-sticky-header-table
  .q-table__middle
    max-height 200px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color #f5f5dc

  thead tr:first-child th
    position sticky
    top 0
</style>
