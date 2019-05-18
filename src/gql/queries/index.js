import gql from 'graphql-tag'

export const allPublicPoemsQuery = gql`
  query allPublicPoemsQuery {
    allPublicPoems {
      id
      author {
        name
      }
      title
      content
      createdAt
    }
  }
`

export const myPoemsQuery = gql`
  query myPoemsQuery {
    myPoems {
      id
      title
      content
      createdAt
      updatedAt
      isPublic
    }
  }
`

export const poemQuery = gql`
  query poemQuery($id: Float!) {
    poem(id: $id) {
      author {
        name
      }
      title
      content
      createdAt
      updatedAt
    }
  }
`
