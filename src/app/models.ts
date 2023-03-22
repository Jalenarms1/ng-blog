export interface CreateUserInput {
    username: string,
    password: string,
    role: string
}

export interface User {
    id: string,
    name: string,
    image: string,
    createdAt: string,
    posts: Post[]
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
    user: User,
    commentId: string,
    comment: Comment,
    createdAt: string
}

export interface Comment {
    $id: number,
    id: string,
    userId: string,
    user: User,
    postId: string,
    post: Post,
    body: string,
    createdAt: string
    
}

export interface TeamResponse {
    $id: number,
    $values: Comment[]
}