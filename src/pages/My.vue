<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      title="我的诗作"
      :data="myPoems"
      :columns="columns"
      row-key="name"
    ></q-table>
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
          field: row => row.title,
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'isPublic',
          required: true,
          label: '是否公开',
          align: 'center',
          field: row => row.isPublic,
          format: val => (val ? '是' : '否'),
          sortable: false,
        },
        {
          name: 'createdAt',
          required: true,
          label: '发布时间',
          align: 'center',
          field: row => row.createdAt,
          format: val => new Date(val).toLocaleString(),
          sortable: true,
        },
        {
          name: 'updatedAt',
          required: true,
          label: '最后更新',
          align: 'center',
          field: row => row.updatedAt,
          format: val => new Date(val).toLocaleString(),
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
