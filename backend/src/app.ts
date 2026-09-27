import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import kanjiRoutes from "./routes/kanji.routes";
import vocabularyRoutes from "./routes/vocabulary.routes";
import grammarRoutes from "./routes/grammar.routes";
import lessonRoutes from "./routes/lesson.routes";
import learningRoutes from "./routes/learning.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Japanese Learning API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/kanji", kanjiRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/grammar", grammarRoutes);
app.use("/api/lessons", lessonRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

app.use(errorHandler);

export default app;
