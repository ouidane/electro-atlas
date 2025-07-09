import { Request, Response, NextFunction } from "express";
import multer, { MulterError, FileFilterCallback } from "multer";
import createError from "http-errors";
import sharp from "sharp";

// Configuration object
const config = {
  maxFileSize: 1024 * 1024 * 2, // 2MB
  maxFiles: 10,
  allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const,
  maxWidth: 2000,
  maxHeight: 2000,
  quality: 80,
} as const;

// Storage configuration
const multerStorage = multer.memoryStorage();

// File filter with specific mime types
const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  // Assert file.mimetype type to match the allowed types
  if (
    config.allowedTypes.includes(
      file.mimetype as "image/jpeg" | "image/jpg" | "image/png" | "image/webp",
    )
  ) {
    cb(null, true);
  } else {
    const error = new MulterError(
      "LIMIT_UNEXPECTED_FILE",
      `Invalid file type. Only ${config.allowedTypes.join(", ")} are allowed.`,
    );

    cb(error);
  }
};

// Multer configuration
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: config.maxFileSize,
  },
});

// Image processing utility
const processImage = async (buffer: Buffer) => {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  if (
    metadata.width! > config.maxWidth ||
    metadata.height! > config.maxHeight
  ) {
    throw new Error(
      `Image dimensions must not exceed ${config.maxWidth}x${config.maxHeight} pixels`,
    );
  }

  return image
    .resize(config.maxWidth, config.maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: config.quality })
    .toBuffer();
};

// Content-Type validation middleware
const validateContentType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.is("multipart/form-data")) {
    return next(createError(400, "Content-Type must be multipart/form-data"));
  }
  next();
};

// image upload middleware
export const uploadImage = [
  validateContentType,
  (req: Request, res: Response, next: NextFunction) => {
    const uploadFile = upload.single("image");

    uploadFile(req, res, async (err: unknown) => {
      if (err) {
        return next(err);
      }

      // Process uploaded image
      try {
        if (req.file) {
          const processed = await processImage(req.file.buffer);
          req.file.buffer = processed;
        }
        next();
      } catch (error) {
        next(error);
      }
    });
  },
];
