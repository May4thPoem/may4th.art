import gql from 'graphql-tag'

export const postPoemMutation = gql`
  mutation postPoemMutation(
    $title: String!
    $content: String!
    $isPublic: Boolean
  ) {
    postPoem(newPoem: {title: $title, content: $content, isPublic: $isPublic}) {
      id
      author {
        name
      }
      content
      title
      createdAt
      isPublic
    }
  }
`

export const logInMutation = gql`
  mutation logInMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      jwt {
        token
        expiresAt
      }
      user {
        id
        name
        email
      }
    }
  }
`

export const signUpMutation = gql`
  mutation signUpMutation($password: String!, $name: String!, $email: String!) {
    signUp(newUser: {password: $password, name: $name, email: $email}) {
      jwt {
        token
        expiresAt
      }
      user {
        id
        name
        email
      }
    }
  }
`

export const deletePoemMutation = gql`
  mutation deletePoemMutation($id: Float!) {
    deletePoem(id: $id)
  }
`
