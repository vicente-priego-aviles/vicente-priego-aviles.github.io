import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Una ficha por proyecto y por idioma: src/content/proyectos/<es|en>/<repo>.md
const proyectos = defineCollection({
  loader: glob({ base: "./src/content/proyectos", pattern: "**/*.md" }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    area: z.enum(["ia", "camunda", "spring", "personal"]),
    tecnologias: z.array(z.string()),
    repo: z.url(),
    web: z.url().optional(),
    webTexto: z.string().optional(),
    // Posición en la portada (los fijados del perfil); sin valor, solo en /proyectos/
    destacado: z.number().int().positive().optional(),
    orden: z.number().int(),
    diagrama: z
      .object({ src: z.string(), alt: z.string() })
      .optional(),
  }),
});

export const collections = { proyectos };
