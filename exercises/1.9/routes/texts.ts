import { Router } from "express";
import {
  createText,
  deleteTextById,
  readAllTexts,
  readTextById,
  updateText,
} from "../services/texts";
import { NewText } from "../types";

const router = Router();

// GET /texts - Lire tous les textes (avec filtre optionnel)
router.get("/", (req, res) => {
  const { level } = req.query;

  // Vérification des niveaux valides
  const validLevels = ["easy", "medium", "hard"];
  if (level && !validLevels.includes(level as string)) {
    return res
      .status(400)
      .json({
        message: "Veuillez fournir un niveau valide: easy, medium ou hard.",
      });
  }

  const texts = readAllTexts(level as string | undefined); // Permet de passer undefined si level n'est pas présent
  return res.json(texts); // Toujours renvoyer 200 OK avec le tableau (peut être vide)
});

// GET /texts/:id - Lire un texte par son ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const text = readTextById(id);

  if (!text) {
    return res.sendStatus(404); // Retourne 404 si le texte n'est pas trouvé
  }

  return res.json(text); // Retourne le texte trouvé
});

// POST /texts - Créer un nouveau texte
router.post("/", (req, res) => {
  const { content, level } = req.body as NewText;

  if (!content || !level) {
    return res.status(400).json({ message: "Content and level are required" }); // Vérifie que les champs sont présents
  }

  const newText = createText({ content, level });

  return res.status(201).json(newText); // Retourne le nouveau texte avec le statut 201 Created
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const deletedElements = deleteTextById(id);
  if (!deletedElements) {
    return res.sendStatus(404);
  }
  return res.json(deletedElements);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { content, level } = req.body as NewText;

  if (!content || !level) {
    return res.status(400).json({ message: "Content and level are required" });
  }

  const updatedText = updateText(id, { content, level });
  if (!updatedText) {
    return res.sendStatus(404); // Si le texte à mettre à jour n'est pas trouvé
  }

  return res.json(updatedText);
});

export default router;
