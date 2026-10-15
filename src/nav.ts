export type OfficeFilter = "todas" | "oc" | "intl";

/** Navegación dentro del Menú: `page` es la ruta interna; `opts` precarga el formulario o los filtros. */
export type Go = (page: string, opts?: { motivo?: string; officeFilter?: OfficeFilter }) => void;

export const MOTIVOS = [
  "Consulta sobre un envío",
  "Solicitar recolección",
  "Cotización",
  "Servicios corporativos",
  "Comercio electrónico",
  "Quiero ser agente autorizado",
  "Reclamo",
  "Otro",
] as const;
export type Motivo = (typeof MOTIVOS)[number];
