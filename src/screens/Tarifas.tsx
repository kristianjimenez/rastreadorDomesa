import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calculator, CircleCheck, Info, ShieldCheck } from "lucide-react";
// Nota: la fórmula de cálculo es referencial; reemplazar por el tarifario oficial de DOMESA.
import { TARIFF_CITIES, distanceKm } from "../data";
import { Btn, Field, Page, Select, Title } from "../ui";

export default function Tarifas() {
  const [from, setFrom] = useState("Caracas");
  const [to, setTo] = useState("Maracaibo");
  const [kg, setKg] = useState("2");
  const [svc, setSvc] = useState<"Estándar" | "Express">("Estándar");
  const [insured, setInsured] = useState(false);
  const [res, setRes] = useState<{ subtotal: number; seguro: number; total: number; km: number } | null>(null);
  const reset = <T,>(fn: (v: T) => void) => (v: T) => { fn(v); setRes(null); };
  const currency = new Intl.NumberFormat("es-VE", { style: "currency", currency: "VES", minimumFractionDigits: 2 });
  const calc = () => {
    if (from === to) return;
    const km = distanceKm(from, to);
    if (km === null) return;
    const weight = Math.max(parseFloat(kg) || 1, 1);
    const subtotal = Math.round((280 + km * 1.35 + weight * 85) * (svc === "Express" ? 1.35 : 1) * 100) / 100;
    const seguro = insured ? Math.round(subtotal * 0.05 * 100) / 100 : 0;
    setRes({ subtotal, seguro, total: subtotal + seguro, km });
  };
  return (
    <Page>
      <Title sub="Calcula un estimado referencial en bolívares">Tarifas</Title>
      <div className="mb-6 rounded-2xl bg-royal p-4 text-white">
        <div className="flex items-start gap-3">
          <span className="size-10 rounded-xl bg-white/15 grid place-items-center shrink-0"><Info className="size-5" /></span>
          <div>
            <div className="font-semibold">Cotiza antes de enviar</div>
            <div className="text-[12px] text-white/70 mt-1">El monto final se confirma en oficina según peso, volumen y cobertura.</div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Select name="Origen" value={from} onChange={reset(setFrom)} options={TARIFF_CITIES} />
        <Select name="Destino" value={to} onChange={reset(setTo)} options={TARIFF_CITIES} />
        <Field name="Peso (kg)" type="number" value={kg} onChange={reset(setKg)} />
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-surface border border-line relative">
          {(["Estándar", "Express"] as const).map((s) => (
            <button key={s} onClick={() => { setSvc(s); setRes(null); }} className="relative h-11 text-[14px] font-semibold z-10">
              {svc === s && <motion.span layoutId="svc" className="absolute inset-0 rounded-xl bg-royal -z-10" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className={svc === s ? "text-white" : "text-mute"}>{s}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => { setInsured(!insured); setRes(null); }}
          className={`w-full rounded-2xl border p-4 flex items-center gap-3 text-left transition-colors ${insured ? "bg-royal/5 border-royal/30" : "bg-surface border-line"}`}
        >
          <span className={`size-10 rounded-xl grid place-items-center ${insured ? "bg-royal text-white" : "bg-surface-2 text-mute"}`}><ShieldCheck className="size-5" /></span>
          <span className="flex-1">
            <span className="block text-[14px] font-semibold">Asegurar mi envío</span>
            <span className="block text-[12px] text-mute mt-0.5">Agrega protección referencial del 5 %</span>
          </span>
          <span className={`size-5 rounded-full border grid place-items-center ${insured ? "bg-royal border-royal text-white" : "border-line"}`}>
            {insured && <CircleCheck className="size-4" />}
          </span>
        </button>
      </div>
      {from === to && <div className="text-[13px] text-danger mt-3">Elige un destino distinto al origen.</div>}
      <div className="mt-6"><Btn icon={Calculator} onClick={calc}>Calcular</Btn></div>
      <AnimatePresence>
        {res !== null && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className="mt-6 rounded-3xl bg-surface border border-line p-5">
            <div className="flex items-center gap-2 text-[13px] text-mute">{from} <ArrowRight className="size-3.5" /> {to} · ≈ {res.km} km · {kg} kg · {svc}</div>
            <div className="font-display text-[38px] leading-none font-bold mt-4">{currency.format(res.total)}</div>
            <div className="mt-5 pt-4 border-t border-line space-y-2 text-[13px]">
              <div className="flex justify-between text-mute"><span>Servicio {svc.toLowerCase()}</span><span>{currency.format(res.subtotal)}</span></div>
              {insured && <div className="flex justify-between text-mute"><span>Protección del envío</span><span>{currency.format(res.seguro)}</span></div>}
            </div>
            <div className="text-[11px] text-mute mt-4">Tarifa estimada en bolívares, sujeta a peso volumétrico, impuestos y confirmación en oficina.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  );
}
