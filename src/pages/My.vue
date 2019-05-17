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
          <q-td key="title" :props="props">{{ props.row.title }}</q-td>
          <q-td key="isPublic" :props="props">{{
            props.row.isPublic ? '是' : '否'
          }}</q-td>
          <q-td key="createdAt" :props="props">{{
            new Date(props.row.createdAt).toLocaleString()
          }}</q-td>
          <q-td key="updatedAt" :props="props">{{
            relativeTime(props.row.updatedAt)
          }}</q-td>
          <q-td>
            <q-btn color="primary">
              <q-icon name="edit" color="white" />
              修改
            </q-btn>
            <q-btn color="red">
              <q-icon name="delete" color="white" />
              删除
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style></style>

<script>
import gql from 'graphql-tag'
import relativeTime from '../common/utils/relative-time'

export default {
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
          format: val => (val ? '是' : '否'),
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
    }
  },
  apollo: {
    myPoems: {
      query() {
        return gql`
          query {
            myPoems {
              title
              content
              createdAt
              updatedAt
              isPublic
            }
          }
        `
      },
    },
  },
  methods: {
    relativeTime,
  },
}
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
