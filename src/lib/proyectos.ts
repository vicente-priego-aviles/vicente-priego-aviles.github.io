import { getCollection, type CollectionEntry } from "astro:content";
import type { Idioma } from "../i18n/textos";

export type Proyecto = CollectionEntry<"proyectos">;

export const AREAS = ["ia", "camunda", "spring", "personal"] as const;

/** El id de una ficha es «<idioma>/<repo>»; el slug de la URL es el nombre del repo. */
export const slugDe = (p: Proyecto) => p.id.split("/").slice(1).join("/");

export async function proyectos(idioma: Idioma): Promise<Proyecto[]> {
  const todos = await getCollection("proyectos", (p) => p.id.startsWith(`${idioma}/`));
  return todos.sort((a, b) => a.data.orden - b.data.orden);
}

export async function destacados(idioma: Idioma): Promise<Proyecto[]> {
  return (await proyectos(idioma))
    .filter((p) => p.data.destacado !== undefined)
    .sort((a, b) => a.data.destacado! - b.data.destacado!);
}
