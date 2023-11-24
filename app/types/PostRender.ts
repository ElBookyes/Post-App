export type PostRender = {
  id: string
  name: string
  avatar: string
  postTitle: string
  comments?: {
    createdAt: string
    id: string
    postId: string
    userId: string
  }[]
}