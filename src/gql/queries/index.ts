import gql from 'graphql-tag'

export const allPublicPoemsQuery = gql`
  query allPublicPoemsQuery {
    allPublicPoems {
      id
      author {
        id
        name
      }
      title
      content
      createdAt
      updatedAt
      isPublic
    }
  }
`

export const myPoemsQuery = gql`
  query myPoemsQuery {
    myPoems {
      id
      author {
        id
        name
      }
      title
      content
      createdAt
      updatedAt
      isPublic
    }
  }
`

export const poemQuery = gql`
  query poemQuery($id: String!) {
    poem(id: $id) {
      id
      author {
        id
        name
      }
      title
      content
      createdAt
      updatedAt
      isPublic
    }
  }
`

export const sessionQuery = gql`
  query sessionQuery {
    session @client {
      user {
        id
        email
        name
      }
      jwt {
        token
        expiresAt
      }
      isLoggedIn
    }
  }
`
