import path from "path";
import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import openapiDoc from "../schemas/openapi.json";

const router = Router();

// Swagger UI advanced options
const swaggerOptions = {
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info hgroup.main > h2.title { font-size: 2em; color: #0a4f9e; }
  `,
  customSiteTitle: "Electro Atlas API Docs",

  swaggerOptions: {
    persistAuthorization: true, // Retains auth token between page reloads
    tryItOutEnabled: true, // Allows "Try it out" by default
    defaultModelExpandDepth: 2,
    defaultModelsExpandDepth: 1,
    displayRequestDuration: true, // Show request duration next to responses
    docExpansion: "none", // 'none' | 'list' | 'full'
    showExtensions: true, // Show vendor extensions (x- fields)
    tagsSorter: "alpha", // Sort tags alphabetically
    deepLinking: true, // Allow deep linking to individual operations
  },
};

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(openapiDoc, swaggerOptions));

router.use(
  "/openapi.json",
  express.static(path.join(__dirname, "../schemas/openapi.json"))
);

export default router;
