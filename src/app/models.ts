export interface CreateUserInput {
    username: string,
    password: string,
    role: string
}

export interface User {
    id: string,
    username: string,
    image: string,
    createdAt: string,
    posts: Post[],
    comments: Comment[]
}

export interface UserResponse {
    id: string,
    username: string,
    image: string,
    createdAt: string,
    posts: PostResponse
}

export interface AuthUserResponse {
    $id: string,
    token: string
}

export interface Post {
    id: string,
    title: string,
    body: string,
    userId: string,
    user?: User,
    comments?: Comment[],
    createdAt: string
}

export interface Comment {
    id: string,
    userId: string,
    user: User,
    postId: string,
    post: Post,
    body: string,
    createdAt: string
    
}

export interface PostResponse {
    $id: string,
    $values: Post[]
}

export interface CommentResponse {
    $id: string,
    $values: Comment[]
}