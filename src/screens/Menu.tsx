import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Package, PackagePlus, MapPin, Handshake, Truck, Globe, Building2, ShoppingBag, Search,
  Headset, CircleHelp, Info, FileText, ScrollText, ArrowRight, Phone, ChevronDown,
  Megaphone, Box, HeartHandshake, Target
} from "lucide-react";
import { OFFICES, STATE_OFFICE_COUNTS, SHOW_ALIADOS } from "../data";
import type { Go, OfficeFilter } from "../nav";
import { Back, Btn, Page, ThemeToggle, Tile, Title, labelCls, type IconType } from "../ui";
import Agentes from "./Agentes";
import Contacto, { SocialRow } from "./Contacto";
import { Condiciones, Terminos } from "./Legal";
import ServicePage from "./Servicios";
import panamericano from "../assets/aliados/panamericano.png";
import dhl from "../assets/aliados/dhl.png";
import yummy from "../assets/aliados/yummy.png";
import bera from "../assets/aliados/bera.png";

const ALIADOS = [
  { name: "Servicio Panamericano", logo: panamericano },
  { name: "DHL", logo: dhl },
  { name: "Yummy", logo: yummy },
  { name: "Bera Motorcycles", logo: bera },
];

function Section({ title, cols = 3, children }: { title: string; cols?: 2 | 3; children: ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="font-display text-[19px] font-bold mb-4">{title}</h2>
      <div className={`grid gap-y-6 gap-x-4 ${cols === 2 ? "grid-cols-2" : "grid-cols-3"}`}>{children}</div>
    </section>
  );
}

const KIND_FILTERS: [OfficeFilter, string][] = [["todas", "Todas"], ["oc", "Oficinas comerciales"], ["intl", "Envíos internacionales"]];

function OficinasPage({ initialFilter = "todas" }: { initialFilter?: OfficeFilter }) {
  const [state, setState] = useState("Todos");
  const [kind, setKind] = useState<OfficeFilter>(initialFilter);
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase("es");
  const list = OFFICES.filter((o) =>
    (state === "Todos" || o.state === state) &&
    (kind === "todas" || (kind === "oc" ? o.code.startsWith("OC") : o.enviosInternacionales)) &&
    (!normalized || [o.name, o.city, o.state, o.addr].some((value) => value.toLocaleLowerCase("es").includes(normalized)))
  );
  const pill = (active: boolean) => `shrink-0 h-9 px-4 rounded-full text-[13px] font-semibold border transition-colors ${active ? "bg-royal border-royal text-white" : "bg-surface border-line text-mute hover:text-royal"}`;
  return (
    <>
      <Title sub="Encuentra una sede por nombre, ciudad o estado">Oficinas</Title>
      <div className="flex items-center gap-3 h-13 px-4 rounded-2xl bg-surface border border-line focus-within:border-royal/60">
        <Search className="size-5 text-mute shrink-0" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar oficinas" className="flex-1 min-w-0 bg-transparent outline-none text-[15px] placeholder:text-mute" />
      </div>

      <div className={`${labelCls} mt-6 mb-3`}>Tipo de punto</div>
      <div className="flex gap-2 overflow-x-auto -mx-6 px-6 pb-1">
        {KIND_FILTERS.map(([k, t]) => (
          <button key={k} onClick={() => setKind(k)} className={pill(kind === k)}>{t}</button>
        ))}
      </div>

      <div className={`${labelCls} mt-6 mb-3`}>Filtrar por estado</div>
      <div className="flex gap-2 overflow-x-auto -mx-6 px-6 pb-1">
        {["Todos", ...STATE_OFFICE_COUNTS.filter(([, n]) => n > 0).map(([name]) => name)].map((x) => (
          <button key={x} onClick={() => setState(x)} className={pill(state === x)}>{x}</button>
        ))}
      </div>

      <div className="mt-5 mb-1 text-[12px] text-mute">{list.length} {list.length === 1 ? "resultado" : "resultados"}</div>
      <div className="mt-2 space-y-3">
        {list.map((o, i) => (
          <motion.div key={o.code} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 8) * 0.04 }} className="rounded-2xl bg-surface border border-line p-4">
            <div className={labelCls}>{o.state} · {o.city}</div>
            <div className="font-semibold mt-1">{o.name}</div>
            <div className="text-[14px] text-mute">{o.addr}</div>
            <div className="text-[13px] text-mute mt-1">{o.hours}</div>
            {(o.code.startsWith("OC") || o.enviosInternacionales) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {o.code.startsWith("OC") && <span className="rounded-full bg-royal/10 text-royal px-2.5 py-1 text-[11px] font-semibold">Oficina comercial</span>}
                {o.enviosInternacionales && <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 text-royal px-2.5 py-1 text-[11px] font-semibold"><Globe className="size-3" />Envíos internacionales</span>}
              </div>
            )}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
              <a href={`tel:${o.tel.replace(/[\s-]/g, "")}`} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky"><Phone className="size-3.5" />{o.tel}</a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${o.name} ${o.city} Venezuela`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-sky"><MapPin className="size-3.5" />Cómo llegar</a>
            </div>
          </motion.div>
        ))}
        {list.length === 0 && (
          <div className="rounded-2xl bg-surface border border-line p-5 text-center">
            <div className="font-semibold">No hay oficinas con ese filtro</div>
            <div className="text-[13px] text-mute mt-1">Prueba con otro estado, tipo de punto o término de búsqueda.</div>
          </div>
        )}
      </div>

      {!query && state === "Todos" && kind === "todas" && (
        <div className="mt-7 rounded-2xl bg-surface border border-line p-4">
          <div className="font-semibold">Cobertura nacional</div>
          <div className="text-[13px] text-mute mt-1">{OFFICES.length} oficinas y agentes autorizados en 20 estados.</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {STATE_OFFICE_COUNTS.map(([name, count]) => (
              <div key={name} className="flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2 text-[12px]">
                <span>{name}</span><span className="font-bold text-royal">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const FAQ = [
  { category: "General", q: "¿Dónde puedo hacer un reclamo o consulta?", a: "Comunícate con el Centro de Atención al Cliente por el 0501-DOMESA-0, WhatsApp al +58 (424) 1726121 o al correo ciac.domesa@domesa.com.ve. Para reclamos, ten a la mano tu número de guía." },
  { category: "General", q: "¿Cuánto tarda una entrega?", a: "El tiempo depende del origen, destino y modalidad. El servicio Express prioriza la entrega más rápida y el estimado definitivo se confirma al registrar el envío." },
  { category: "General", q: "¿Puede otra persona retirar mi encomienda?", a: "Sí. Debe presentar copia de la cédula del destinatario, copia de su propia cédula y una autorización firmada por el destinatario." },
  { category: "Envíos", q: "¿Cómo solicito una recolección?", a: "En Menú selecciona Recolección e indica contacto, dirección, tipo de paquete, peso y fecha. DOMESA confirmará por teléfono la disponibilidad y el monto antes de asignar al mensajero." },
  { category: "Envíos", q: "¿Puedo enviar medicinas?", a: "Sí, con factura y récipe médico. Deben ir en blíster o envases plásticos con precinto original. Para envíos empresariales también puede requerirse factura comercial y guía de movilización FARMATRIA." },
  { category: "Envíos", q: "¿Puedo enviar alimentos?", a: "Solo alimentos no perecederos en su empaque original, enlatados o empacados al vacío. No se permiten envases de vidrio." },
  { category: "Normas", q: "¿Qué artículos tienen prohibido su transporte?", a: "No se aceptan armas, municiones, explosivos, drogas, combustibles, dinero, cheques sin endosar, metales o piedras preciosas. Algunos documentos personales solo aplican a envíos internacionales." },
  { category: "Normas", q: "¿Cómo preparo artículos de medidas irregulares?", a: "Protege bordes y superficies con cartón corrugado y cinta. Las llantas deben llevar una banda de cinta con la etiqueta adherida. Los rollos de tela o papel deben viajar en caja de cartón y las cajas unidas deben ser del mismo tamaño." },
];

function FaqPage({ go }: { go: Go }) {
  const [category, setCategory] = useState("General");
  const [open, setOpen] = useState<string | null>(FAQ[0].q);
  const list = FAQ.filter((item) => item.category === category);
  return (
    <>
      <Title sub="Respuestas claras antes, durante y después de tu envío">Preguntas frecuentes</Title>
      <div className="flex gap-2 overflow-x-auto -mx-6 px-6 pb-4">
        {["General", "Envíos", "Normas"].map((item) => (
          <button key={item} onClick={() => { setCategory(item); setOpen(null); }} className={`shrink-0 h-9 px-4 rounded-full text-[13px] font-semibold border ${category === item ? "bg-royal border-royal text-white" : "bg-surface border-line text-mute"}`}>{item}</button>
        ))}
      </div>
      <div className="rounded-2xl bg-surface border border-line divide-y divide-line">
        {list.map(({ q, a }) => (
          <div key={q}>
            <button onClick={() => setOpen(open === q ? null : q)} className="w-full flex items-center justify-between gap-3 p-4 text-left text-[15px] font-semibold">
              <span>{q}</span>
              <motion.span animate={{ rotate: open === q ? 180 : 0 }}><ChevronDown className="size-4 text-mute" /></motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === q && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-4 text-[14px] text-mute leading-relaxed"><span className="block pb-4">{a}</span></motion.p>}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-surface-2 p-4">
        <div className="font-semibold">¿No encontraste tu respuesta?</div>
        <p className="text-[13px] text-mute mt-1 mb-4">Escríbenos y un ejecutivo te ayudará.</p>
        <Btn onClick={() => go("contacto")}>Ir a atención al cliente</Btn>
      </div>
    </>
  );
}

function QuienesPage() {
  return (
    <>
      <Title sub="Experiencia venezolana que conecta personas y empresas">Quiénes somos</Title>
      <div className="rounded-3xl bg-royal p-5 text-white overflow-hidden relative">
        <div className="relative z-10">
          <div className="font-display text-[22px] font-bold leading-tight">La empresa de encomiendas que mejor conoce a Venezuela</div>
          <p className="text-[13px] text-white/75 mt-3 leading-relaxed">En DOMESA brindamos asesoría y soluciones logísticas para que cada envío llegue como lo necesitas, con atención cercana, cobertura nacional y seguimiento.</p>
        </div>
        <Package className="absolute -right-5 -bottom-6 size-32 text-white/10" />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[["4+", "décadas"], ["20", "estados"], ["4", "servicios"]].map(([value, label]) => (
          <div key={label} className="rounded-2xl bg-surface border border-line p-3 text-center">
            <div className="font-display text-[20px] font-bold text-royal">{value}</div>
            <div className="text-[10px] text-mute mt-1">{label}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3 mt-6">
        <div className="rounded-2xl bg-surface border border-line p-4 flex gap-3">
          <span className="size-10 rounded-xl bg-royal/10 text-royal grid place-items-center shrink-0"><Target className="size-5" /></span>
          <div><div className="font-semibold">Misión</div><p className="text-[13px] text-mute mt-1 leading-relaxed">Ofrecer servicios confiables de envío y soluciones logísticas que fortalezcan la relación con clientes y colaboradores.</p></div>
        </div>
        <div className="rounded-2xl bg-surface border border-line p-4 flex gap-3">
          <span className="size-10 rounded-xl bg-royal/10 text-royal grid place-items-center shrink-0"><HeartHandshake className="size-5" /></span>
          <div><div className="font-semibold">Visión</div><p className="text-[13px] text-mute mt-1 leading-relaxed">Ser la empresa logística de referencia por la confianza, la atención y el conocimiento profundo de las necesidades de nuestros clientes.</p></div>
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-surface-2 p-4 text-[13px] text-mute leading-relaxed"><strong className="text-ink">Nuestro compromiso eres tú.</strong> Trabajamos para que enviar documentos, paquetes y mercancía sea cada vez más sencillo, seguro y transparente.</div>
    </>
  );
}

type Item = [IconType, string, string, { motivo?: string; officeFilter?: OfficeFilter }?];

export default function Menu() {
  const [page, setPage] = useState<string | null>(null);
  const [motivo, setMotivo] = useState<string | undefined>();
  const [officeFilter, setOfficeFilter] = useState<OfficeFilter>("todas");
  const go: Go = (p, opts) => {
    setMotivo(opts?.motivo);
    setOfficeFilter(opts?.officeFilter ?? "todas");
    setPage(p || null);
  };

  let content: ReactNode = null;
  if (page === "contacto") content = <Contacto key={motivo ?? "contacto"} motivo={motivo} go={go} />;
  else if (page === "oficinas") content = <OficinasPage initialFilter={officeFilter} />;
  else if (page === "faq") content = <FaqPage go={go} />;
  else if (page === "agentes") content = <Agentes go={go} />;
  else if (page === "info:quienes") content = <QuienesPage />;
  else if (page === "info:condiciones") content = <Condiciones />;
  else if (page === "info:terminos") content = <Terminos />;
  else if (page?.startsWith("serv:")) content = <ServicePage kind={page.slice(5)} go={go} />;

  if (page)
    return (
      <Page key={page}>
        <Back onClick={() => go("")} />
        <motion.div key={page + (motivo ?? "")} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>{content}</motion.div>
      </Page>
    );

  const items = (list: Item[]) => list.map(([Ic, l, p, o], i) => <Tile key={l} i={i} icon={Ic} label={l} onClick={() => go(p, o)} />);
  return (
    <Page key="home">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[34px] font-bold tracking-tight">Menú</h1>
          <p className="text-[14px] text-mute mt-1.5">Envía, cotiza y encuentra tu oficina DOMESA más cercana.</p>
        </div>
        <ThemeToggle className="mt-2" />
      </div>

      <div className="mt-7 rounded-3xl bg-surface border border-line p-5 overflow-hidden relative">
        <div className="relative z-10 max-w-[245px]">
          <div className="flex items-center gap-2 text-royal"><Megaphone className="size-4" /><span className={labelCls}>Todo en un solo lugar</span></div>
          <div className="font-display text-[19px] font-bold mt-3">Soluciones para cada tipo de envío</div>
          <div className="flex flex-wrap gap-2 mt-4">
            {([["Nacional", "serv:nacionales"], ["Internacional", "serv:internacionales"], ["E-commerce", "serv:comercio"]] as const).map(([t, p]) => (
              <button key={t} onClick={() => go(p)} className="rounded-full bg-surface-2 px-3 py-1.5 text-[11px] font-semibold text-royal hover:bg-royal/10 transition-colors">{t}</button>
            ))}
          </div>
        </div>
        <Box className="absolute -right-5 -bottom-5 size-28 text-royal/10 rotate-[-8deg]" />
      </div>

      <button onClick={() => go("contacto", { motivo: "Solicitar recolección" })} className="mt-4 w-full text-left text-white rounded-3xl p-5 relative overflow-hidden border border-line bg-[radial-gradient(120%_140%_at_100%_100%,#1d4fd8_0%,#0d1730_55%,#0a0f1c_100%)] group">
        <div className="font-display text-[19px] font-bold">Solicita una recolección</div>
        <div className="text-[13px] text-white/60 mt-1 max-w-[220px]">Un mensajero pasa por tu paquete, donde estés.</div>
        <span className="absolute right-5 bottom-5 size-10 rounded-full bg-white text-[#1749c6] grid place-items-center group-hover:translate-x-1 transition-transform"><ArrowRight className="size-5" /></span>
      </button>

      <Section title="Gestiones">
        {items([[PackagePlus, "Recolección", "contacto", { motivo: "Solicitar recolección" }], [MapPin, "Oficinas", "oficinas"], [Handshake, "Agentes autorizados", "agentes"]])}
      </Section>
      <Section title="Servicios" cols={2}>
        {items([[Truck, "Envíos nacionales", "serv:nacionales"], [Globe, "Envíos internacionales", "serv:internacionales"], [Building2, "Servicio corporativo", "serv:corporativo"], [ShoppingBag, "Comercio electrónico", "serv:comercio"]])}
      </Section>
      <Section title="Ayuda" cols={2}>
        {items([[Headset, "Atención al cliente", "contacto"], [CircleHelp, "Preguntas frecuentes", "faq"]])}
      </Section>
      <Section title="Acerca de">
        {items([[Info, "Quiénes somos", "info:quienes"], [FileText, "Condiciones de nuestros servicios", "info:condiciones"], [ScrollText, "Términos y condiciones de uso", "info:terminos"]])}
      </Section>

      <section className="mt-10">
        <h2 className="font-display text-[19px] font-bold mb-4 text-center">Síguenos</h2>
        <SocialRow />
      </section>

      {SHOW_ALIADOS && (
        <section className="mt-10">
          <h2 className="font-display text-[19px] font-bold mb-4 text-center">Nuestros aliados</h2>
          <div className="grid grid-cols-2 gap-3">
            {ALIADOS.map(({ name, logo }) => (
              <div key={name} className="h-20 rounded-2xl bg-white dark:bg-[#e9eef7] border border-line dark:border-transparent grid place-items-center px-4 py-3">
                <img src={logo} alt={name} className="h-10 w-auto max-w-[128px] object-contain" />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 text-center text-[11px] text-mute leading-relaxed">© 2023 – 2026 Domesa<br />RIF J-00091991-7 · Concesión postal Nº IP-10-09-85-03</div>
    </Page>
  );
}
