import path from "node:path";
import { parse, serialize } from "../utils/json";
import { Comment, NewComment } from "../types";
const jsonDbPath = path.join(__dirname, "/../data/comments.json");

const comments: Comment[] = parse(jsonDbPath);

interface CommentSearchParams {
    movieFilter?: number;
}


function readAllComments({ movieFilter }: CommentSearchParams): Comment[] {
    let comments: Comment[] = parse(jsonDbPath, []);

    if (movieFilter) {
        comments = comments.filter((comment) => comment.movieId === movieFilter);
    }
    return comments;
}

function createComment(newComment: NewComment): Comment {
    const nextId =
    comments.reduce((maxId, movie) => Math.max(maxId, movie.id), 0) + 1;
    
    const comment = { ...newComment, id: nextId };
    comments.push(comment);
    serialize(jsonDbPath, comments);
    return comment;
}


function deleteComment(id: number, username: string): Comment | undefined {
    const index = comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
        throw new Error(`No comment found with id ${id}`);
    }

    const comment = comments[index];
    
    if (comment.username !== username) {
        throw new Error("Unauthorized: You can only delete your own comments.");
    }

    const deletedComment = comments.splice(index, 1)[0];

    serialize(jsonDbPath, comments);
    return deletedComment;
}

export { readAllComments, createComment, deleteComment };


