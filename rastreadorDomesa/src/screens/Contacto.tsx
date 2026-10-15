import { useState } from "react";
import { motion } from "motion/react";
import { Check, ChevronRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { CITIES } from "../data";
import { SOCIALS, WhatsAppIcon } from "../icons";
import { MOTIVOS, type Go } from "../nav";
import { Btn, Field, Select, TextArea, Title, labelCls, type IconType } from "../ui";

/* ───────────── Horario de atención ───────────── */

const OPEN_MIN = 8 * 60; // 8:00 a.m.
const CLOSE_MIN = 17 * 60; // 5:00 p.m.

function atencionStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Caracas", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const wd = get("weekday");
  const mins = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);
  const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(wd);
  const open = weekday && mins >= OPEN_MIN && mins < CLOSE_MIN;
  let next = "";
  if (!open) {
    if (weekday && mins < OPEN_MIN) next = "Abrimos hoy a las 8:00 a.m.";
    else if (wd === "Fri" || wd === "Sat" || wd === "Sun") next = "Abrimos el lunes a las 8:00 a.m.";
    else next = "Abrimos mañana a las 8:00 a.m.";
  }
  return { open, next };
}

function HorarioCard() {
  const [{ open, next }] = useState(() => atencionStatus());
  return (
    <div className="rounded-3xl bg-royal text-white p-5 flex items-center gap-4">
      <span className="size-12 rounded-2xl bg-white/15 grid place-items-center shrink-0"><Clock3 className="size-6" /></span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-[0.14em] text-white/70 font-semibold">Horario de atención</div>
        <div className="font-display text-[18px] font-bold leading-tight mt-1">Lunes a viernes</div>
        <div className="text-[15px] font-semibold">8:00 a.m. – 5:00 p.m.</div>
      </div>
      <div className="shrink-0 text-right">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${open ? "bg-white text-ok" : "bg-white/15 text-white"}`}>
          <span className={`size-1.5 rounded-full ${open ? "bg-ok" : "bg-white/60"}`} />
          {open ? "Abierto ahora" : "Cerrado ahora"}
        </span>
        {!open && <div className="text-[11px] text-white/70 mt-1.5 max-w-[110px] leading-snug">{next}</div>}
      </div>
    </div>
  );
}

/* ───────────── Redes sociales ───────────── */

export function SocialGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {SOCIALS.map(({ key, label, handle, href, Icon }) => (
        <a key={key} href={href} target="_blank" rel="noreferrer" className="rounded-2xl bg-royal text-white p-4 flex items-center gap-3 hover:brightness-90 transition">
          <Icon className="size-5 shrink-0" />
          <span className="min-w-0">
            <span className="block text-[14px] font-semibold leading-tight">{label}</span>
            <span className="block text-[11px] text-white/70 truncate">{handle}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function SocialRow() {
  return (
    <div className="flex justify-center gap-3">
      {SOCIALS.map(({ key, label, href, Icon }) => (
        <a key={key} href={href} target="_blank" rel="noreferrer" aria-label={label} className="size-11 rounded-full bg-royal text-white grid place-items-center hover:brightness-90 transition">
          <Icon className="size-[18px]" />
        </a>
      ))}
    </div>
  );
}

/* ───────────── Página de contacto (formulario único) ───────────── */

const CANALES: [IconType, string, string, string][] = [
  [WhatsAppIcon, "WhatsApp", "+58 (424) 1726121", "https://wa.me/584241726121"],
  [Phone, "Call center", "0501-DOMESA-0 (0501-3663720)", "tel:05013663720"],
  [Mail, "Correo electrónico", "ciac.domesa@domesa.com.ve", "mailto:ciac.domesa@domesa.com.ve"],
];

export default function Contacto({ motivo: initialMotivo, go }: { motivo?: string; go: Go }) {
  const [motivo, setMotivo] = useState<string>(initialMotivo && (MOTIVOS as readonly string[]).includes(initialMotivo) ? initialMotivo : MOTIVOS[0]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("Caracas");
  const [guia, setGuia] = useState("");
  // Campos solo para "Solicitar recolección"
  const [dir, setDir] = useState("");
  const [destino, setDestino] = useState("Maracaibo");
  const [tipo, setTipo] = useState("Caja o paquete");
  const [kg, setKg] = useState("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("8:00 a.m. – 12:00 p.m.");
  const [msg, setMsg] = useState("");
  const [ref, setRef] = useState<string | null>(null);

  const recoleccion = motivo === "Solicitar recolección";
  const conGuia = motivo === "Consulta sobre un envío" || motivo === "Reclamo";
  const base = nombre.trim() && apellido.trim() && correo.includes("@") && telefono.trim();
  const valid = Boolean(base && (recoleccion ? dir.trim() && kg && fecha : msg.trim()));

  const submit = () => {
    if (!valid) return;
    // TODO backend: enviar este formulario a la API de DOMESA (ver /api) en lugar de simularlo.
    setRef((recoleccion ? "REC-" : "SOL-") + Math.floor(100000 + Math.random() * 900000));
  };

  if (ref)
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="pt-10 text-center">
        <div className="size-16 rounded-full bg-royal text-white mx-auto grid place-items-center"><Check className="size-8" /></div>
        <h1 className="font-display text-[26px] font-bold mt-6">Solicitud enviada</h1>
        <p className="text-[14px] text-mute mt-2">
          {recoleccion ? "Confirmaremos disponibilidad y monto por teléfono antes de asignar al mensajero." : "Un ejecutivo de DOMESA se comunicará contigo lo antes posible."}
        </p>
        <div className={`${labelCls} mt-8`}>Referencia</div>
        <div className="font-mono text-[28px] mt-1">{ref}</div>
        <div className="mt-8"><Btn tone="ghost" onClick={() => go("")}>Volver al menú</Btn></div>
      </motion.div>
    );

  return (
    <>
      <Title sub="Un solo formulario para todo: elige el motivo y te respondemos.">Atención al cliente</Title>
      <HorarioCard />

      <div className="space-y-3 mt-4">
        {CANALES.map(([Ic, t, v, href]) => (
          <a key={t} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-surface border border-line p-4 hover:bg-surface-2 transition-colors">
            <span className="size-11 rounded-xl bg-royal/10 text-royal grid place-items-center"><Ic className="size-5" /></span>
            <span className="flex-1 min-w-0"><span className="block text-[12px] text-mute">{t}</span><span className="block text-[14px] font-semibold truncate">{v}</span></span>
            <ChevronRight className="size-4 text-mute" />
          </a>
        ))}
      </div>

      <div className={`${labelCls} mt-9 mb-3`}>Contáctanos para más información</div>
      <div className="space-y-4">
        <Select name="Motivo" value={motivo} onChange={setMotivo} options={MOTIVOS} />
        <div className="grid grid-cols-2 gap-3">
          <Field name="Nombre" value={nombre} onChange={setNombre} />
          <Field name="Apellido" value={apellido} onChange={setApellido} />
        </div>
        <Field name="Correo electrónico" type="email" value={correo} onChange={setCorreo} />
        <Field name="Teléfono" type="tel" value={telefono} onChange={setTelefono} />
        <Select name="Ciudad" value={ciudad} onChange={setCiudad} options={CITIES} />

        {conGuia && <Field name="Número de guía (opcional)" value={guia} onChange={setGuia} mono />}

        {recoleccion && (
          <>
            <div className="flex gap-3 rounded-2xl bg-royal/5 border border-royal/15 p-4">
              <Clock3 className="size-5 text-royal shrink-0 mt-0.5" />
              <div className="text-[12px] text-mute leading-relaxed"><strong className="text-slate-900">Solicitud rápida.</strong> Confirmaremos disponibilidad y monto por teléfono antes de asignar al mensajero.</div>
            </div>
            <Field name="Dirección de recolección" icon={MapPin} value={dir} onChange={setDir} />
            <Select name="Ciudad de destino" value={destino} onChange={setDestino} options={CITIES} />
            <Select name="Tipo de envío" value={tipo} onChange={setTipo} options={["Caja o paquete", "Sobre o documento", "Mercancía frágil"]} />
            <Field name="Peso aproximado (kg)" type="number" value={kg} onChange={setKg} />
            <Field name="Fecha" type="date" value={fecha} onChange={setFecha} />
            <Select name="Horario preferido" value={horario} onChange={setHorario} options={["8:00 a.m. – 12:00 p.m.", "1:00 p.m. – 5:00 p.m."]} />
          </>
        )}

        <TextArea
          name={recoleccion ? "Indicaciones (opcional)" : "¿Cómo podemos ayudarte?"}
          value={msg}
          onChange={setMsg}
          placeholder={recoleccion ? "Piso, punto de referencia o instrucciones para el mensajero" : "Cuéntanos tu solicitud con el mayor detalle posible"}
        />
      </div>
      <div className="mt-5"><Btn onClick={submit}>Enviar</Btn></div>
      {!valid && <div className="text-[12px] text-mute mt-3 text-center">{recoleccion ? "Completa tus datos, dirección, peso y fecha." : "Completa tus datos y el detalle de tu solicitud."}</div>}

      <div className={`${labelCls} mt-10 mb-3`}>Síguenos en redes</div>
      <SocialGrid />
    </>
  );
}
