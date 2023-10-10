export class Comments {
    constructor(
        private id: string,
        private postId: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string
    ) { }

    getId(): string {
        return this.id
    }

    getPostId(): string{
        return this.postId
    }

    getCreatorId(): string {
        return this.creatorId
    }

    getContent(): string {
        return this.content
    }

    getLikes(): number {
        return this.likes
    }

    getDislikes(): number {
        return this.dislikes
    }

    getCreatedAt(): string {
        return this.createdAt
    }

    getUpdatedAt(): string {
        return this.updatedAt
    }

    setPostId(newPostId: string) {
        this.postId = newPostId
    }

    setCreatorId(newCreatorId: string) {
        this.creatorId = newCreatorId
    }

    setContent(newContent: string) {
        this.content = newContent
    }

}