export interface User {
  id: string
  name: string
  email: string
}

export interface Poem {
  author: User
  id: string
  title: string
  content: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AllPublicPoemsQuery {
  allPublicPoems: Poem[]
}

export interface MyPoemsQuery {
  myPoems: Poem[]
}
