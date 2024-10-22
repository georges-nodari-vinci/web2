import express, { NextFunction, Request, Response } from "express";
import movieRouter from "./routes/movies";
import textsRouter from "./routes/texts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const requestCounter: { [key: string]: number } = {};

app.use((req: Request, _res: Response, next: NextFunction) => {
  const key = `${req.method} ${req.path}`;
  requestCounter[key] = (requestCounter[key] || 0) + 1;

  // Affichage des compteurs
  console.log("Request counter :");
  for (const [methodPath, count] of Object.entries(requestCounter)) {
    console.log(`- ${methodPath} : ${count}`);
  }

  next();
});

app.use("/movies", movieRouter);
app.use("/texts", textsRouter);

export default app;
