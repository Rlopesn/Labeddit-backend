-- Active: 1696955056647@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

CREATE TABLE
    post(
        id TEXT PRIMARY KEY NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER,
        dislikes INTEGER,
        comments INTEGER,
        created_at TEXT DEFAULT(DATETIME()),
        updated_at TEXT DEFAULT(DATETIME()),
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER,
        PRIMARY KEY (user_id, post_id) FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES post(id)
    );

CREATE TABLE
    comments (
        id TEXT PRIMARY KEY NOT NULL,
        post_id TEXT NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        like INTEGER,
        dislike INTEGER,
        created_at TEXT DEFAULT(DATETIME()),
        updated_at TEXT DEFAULT(DATETIME()),
        FOREIGN KEY (creator_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES post(id)
    );

CREATE TABLE
    likedislike_comments(
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        like INTEGER,
        PRIMARY KEY (user_id, comment_id) FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (comment_id) REFERENCES comments(id)
);