export const idiomas = ["es", "en"] as const;
export type Idioma = (typeof idiomas)[number];

// Rutas traducidas: la misma clave lleva a la página equivalente en cada idioma.
const RUTAS = {
  inicio: { es: "/", en: "/en/" },
  proyectos: { es: "/proyectos/", en: "/en/projects/" },
  cv: { es: "/cv/", en: "/en/cv/" },
  contacto: { es: "/contacto/", en: "/en/contact/" },
} as const;
export type ClaveRuta = keyof typeof RUTAS;

export function ruta(idioma: Idioma, clave: ClaveRuta, slug?: string): string {
  const base = RUTAS[clave][idioma];
  return slug ? `${base}${slug}/` : base;
}

export const sitio = {
  nombre: "Vicente Priego Avilés",
  github: "https://github.com/vicente-priego-aviles",
  javacadabra: "https://javacadabra.vercel.app/",
  // Huecos preparados: se muestran solo cuando tengan valor.
  correo: null as string | null,
  linkedin: null as string | null,
};

export const textos = {
  es: {
    titular: "Analista programador y arquitecto de software · Java, Spring Boot, Camunda 8, Vaadin",
    descripcion:
      "Web personal de Vicente Priego Avilés: analista programador y arquitecto de software en Madrid. Java, Spring Boot, Camunda 8 y Vaadin.",
    saltar: "Saltar al contenido",
    nav: { inicio: "Inicio", proyectos: "Proyectos", cv: "CV", contacto: "Contacto" },
    otroIdioma: "English",
    otroIdiomaAria: "Read this page in English",
    tema: "Cambiar entre tema claro y oscuro",
    hola: "Hola, soy Vicente",
    presentacion: [
      "Soy analista programador y arquitecto de software en Mercedes-Benz, en Madrid. Llevo desde 2014 desarrollando en Java: microservicios con Spring Boot, DDD y arquitectura hexagonal.",
      "Me interesan especialmente la orquestación de procesos con Camunda 8 y BPMN, las aplicaciones con Vaadin y el desarrollo asistido por IA. Lo que voy aprendiendo lo cuento en Javacadabra.",
    ],
    destacados: "Proyectos destacados",
    todos: "Ver todos los proyectos",
    areas: {
      ia: "IA y desarrollo asistido",
      camunda: "Camunda 8 y BPMN",
      spring: "Spring Boot y Vaadin",
      personal: "Personal",
    },
    proyectosTitulo: "Proyectos",
    proyectosIntro:
      "Proyectos propios en GitHub, agrupados por tema. Cada ficha resume qué es, con qué está hecho y dónde verlo.",
    verRepo: "Código en GitHub",
    volver: "Volver a proyectos",
    javacadabra: {
      titulo: "Javacadabra",
      texto: "Mi blog y cursos sobre Java, Spring Boot, Camunda y BPMN.",
      enlace: "Ir a Javacadabra",
    },
    cvTitulo: "Currículum",
    cvPreparacion: "Estoy preparando la versión web y el PDF de mi CV. Muy pronto estará aquí.",
    contactoTitulo: "Contacto",
    contactoProximamente: "Contacto: próximamente. Estoy creando una dirección de correo para la web.",
    contactoMientras: "Mientras tanto, puedes encontrarme en GitHub.",
    pie: {
      licencia: "Código bajo licencia MIT; textos y CV, todos los derechos reservados.",
      tipografias: "Tipografías",
      y: "y",
      diagramas: "Diagramas con",
    },
    noEncontrada: "Página no encontrada",
    noEncontradaTexto: "Esta página no existe o ha cambiado de sitio.",
  },
  en: {
    titular: "Analyst developer & software architect · Java, Spring Boot, Camunda 8, Vaadin",
    descripcion:
      "Personal website of Vicente Priego Avilés: analyst developer and software architect in Madrid. Java, Spring Boot, Camunda 8 and Vaadin.",
    saltar: "Skip to content",
    nav: { inicio: "Home", proyectos: "Projects", cv: "CV", contacto: "Contact" },
    otroIdioma: "Español",
    otroIdiomaAria: "Leer esta página en español",
    tema: "Switch between light and dark theme",
    hola: "Hi, I'm Vicente",
    presentacion: [
      "I'm an analyst developer and software architect at Mercedes-Benz, in Madrid. I've been building with Java since 2014: microservices with Spring Boot, DDD and hexagonal architecture.",
      "I'm especially into process orchestration with Camunda 8 and BPMN, Vaadin applications and AI-assisted development. I write about what I learn on Javacadabra (in Spanish).",
    ],
    destacados: "Featured projects",
    todos: "See all projects",
    areas: {
      ia: "AI and assisted development",
      camunda: "Camunda 8 and BPMN",
      spring: "Spring Boot and Vaadin",
      personal: "Personal",
    },
    proyectosTitulo: "Projects",
    proyectosIntro:
      "My own projects on GitHub, grouped by topic. Each page sums up what it is, what it's built with and where to see it.",
    verRepo: "Code on GitHub",
    volver: "Back to projects",
    javacadabra: {
      titulo: "Javacadabra",
      texto: "My blog and courses on Java, Spring Boot, Camunda and BPMN (in Spanish).",
      enlace: "Go to Javacadabra",
    },
    cvTitulo: "Résumé",
    cvPreparacion: "I'm preparing the web and PDF versions of my CV. It will be here very soon.",
    contactoTitulo: "Contact",
    contactoProximamente: "Contact: coming soon. I'm setting up an email address for this site.",
    contactoMientras: "In the meantime, you can find me on GitHub.",
    pie: {
      licencia: "Code under the MIT licence; texts and CV, all rights reserved.",
      tipografias: "Typefaces",
      y: "and",
      diagramas: "Diagrams use",
    },
    noEncontrada: "Page not found",
    noEncontradaTexto: "This page doesn't exist or has moved.",
  },
} as const;
