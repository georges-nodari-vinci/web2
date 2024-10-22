import path from "path";
import { parse, serialize } from "../utils/json";
import { NewText, Text } from "../types";
import { v4 as uuidv4 } from "uuid";

const jsonDbPath = path.join(__dirname, "/../data/texts.json");

// Fonction pour charger les textes depuis le fichier JSON
function loadTexts(): Text[] {
  return parse(jsonDbPath, []);
}

function readAllTexts(level?: string): Text[] {
  const texts: Text[] = loadTexts(); // Charger les textes depuis le fichier
  if (level) {
    return texts.filter((text) => text.level === level); // Filtrer par niveau si spécifié
  }
  return texts; // Retourner tous les textes
}

function readTextById(id: string): Text | undefined {
  const texts = loadTexts(); // Charger les textes depuis le fichier
  return texts.find((text) => text.id === id); // Trouver le texte par ID
}

function createText(newText: NewText): Text {
  const id = uuidv4(); // Générer un nouvel ID UUID
  const text: Text = { ...newText, id }; // Créer le nouvel objet texte
  const updatedTexts = [...loadTexts(), text]; // Charger les textes existants et ajouter le nouveau
  serialize(jsonDbPath, updatedTexts); // Sauvegarder la liste mise à jour

  return text; // Retourner le texte créé
}

function deleteTextById(id: string): Text | undefined {
  const texts = loadTexts(); // Charger les textes depuis le fichier
  const textIndex = texts.findIndex((movie) => movie.id === id);
  if (textIndex === -1) {
    return undefined;
  }
  const deletedElements = texts.splice(textIndex, 1);
  serialize(jsonDbPath, texts);
  return deletedElements[0];
}

function updateText(id: string, updatedText: NewText): Text | undefined {
  const texts = loadTexts(); // Charger les textes depuis le fichier
  const index = texts.findIndex((text) => text.id === id);
  if (index === -1) return undefined; // Si le texte n'est pas trouvé

  const text = { ...texts[index], ...updatedText }; // Remplacer entièrement
  texts[index] = text; // Mettre à jour le tableau
  serialize(jsonDbPath, texts); // Sauvegarder dans le fichier
  return text;
}

export { readAllTexts, readTextById, createText, deleteTextById, updateText };
