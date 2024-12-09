import { Router } from "express";
import { createComment, deleteComment, readAllComments } from "../services/comments";
import { authorize } from "../utils/auths";
import { NewComment } from "../types";
import jwt from "jsonwebtoken";


const router = Router();

router.get("/", (req, res) => {
    const { movieFilter } = req.query;

    const comments = readAllComments({
        movieFilter: movieFilter ? Number(movieFilter) : undefined,
    });
    res.json(comments);
});


router.post("/", authorize, (req, res) => {
    console.log("Authorization header:", req.headers["authorization"]);

    const token = req.headers["authorization"];  // Récupération du token sans le split
    console.log("Extracted token:", token);

    if (!token) {
        return res.status(401).send("Token is required");
    }

    try {
        const decoded = jwt.verify(token, "ilovemypizza!") as { username: string };
        console.log("Decoded token:", decoded);
        const username = decoded.username;

        const body: unknown = req.body;
        if (
            !body ||
            typeof body !== "object" ||
            !("movieId" in body) ||
            !("content" in body) ||
            typeof body.movieId !== "number" ||
            typeof body.content !== "string"
        ) {
            return res.sendStatus(400);
        }

        const { movieId, content } = body as NewComment;
        const newComment = createComment({ movieId, content, username });

        return res.status(201).json(newComment);
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).send("Invalid token");
    }
});

router.delete("/:id", authorize, (req, res) => {
    const id = Number(req.params.id);
    if (!id) {
        return res.sendStatus(400);
    }

    try {
        // Extraire le username du JWT
        const token = req.headers["authorization"];
        const decoded = jwt.verify(token as string, "ilovemypizza!") as { username: string };
        const username = decoded.username;

        // Appeler deleteComment avec l'ID et le username
        const deleted = deleteComment(id, username);

        if (!deleted) {
            return res.sendStatus(404); // Le commentaire n'a pas été trouvé
        }

        return res.sendStatus(204); // Suppression réussie
    } catch (error) {
        console.error("Error deleting comment:", error);
        if (error instanceof Error) {
            return res.status(401).send("Unauthorized: " + error.message);
        }
        return res.status(401).send("Unauthorized: An unknown error occurred");
    }
});



export default router;