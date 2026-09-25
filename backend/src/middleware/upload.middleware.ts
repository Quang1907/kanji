import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, "uploads/audio");
      return;
    }

    if (file.mimetype.startsWith("image/")) {
      cb(null, "uploads/images");
      return;
    }

    cb(new Error("Unsupported file type"), "");
  },

  filename: (_req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;

    cb(null, filename);
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// API:
// POST / api / media
// Content - Type: multipart / form - data
// React Admin upload:
// const formData = new FormData();

// formData.append("file", file);

// await fetch("/api/media", {
//     method: "POST",
//     body: formData,
// });
