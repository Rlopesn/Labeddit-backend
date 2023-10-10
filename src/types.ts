export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number
    dislikes: number,
    comments: number,
    created_at: string,
    updated_at: string,
}

export interface PostUserDB extends PostDB {
    userId: string,
    userName: string
}

export interface LikeDislikeDB {
    post_id: string,
    user_id: string,
    like: number
}

export interface CommentsDB {
    id: string,
    post_id: string,
    creator_id: string,
    content: string,
    like: number,
    dislike: number,
    created_at: string,
    updated_at: string
}

export interface LikeDislikeCommentDB {
    comment_id: string,
    user_id: string,
    like: number
}

export interface CommentUserDB extends CommentsDB {
    userId: string,
    postId: string
    userName: string
}