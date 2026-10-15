import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Package, PackageCheck, ScanSearch, Search, Truck, ArrowRight } from "lucide-react";
import { ENABLE_QR_SCAN, SHIPMENTS, type Shipment } from "../data";
import logo from "../assets/logo-domesa.png";
import logoBlanco from "../assets/logo-domesa-blanco.png";
import { Btn, Page, ThemeToggle, labelCls } from "../ui";

function Timeline({ s }: { s: Shipment }) {
  const steps = [
    { n: "Recibido", Ic: Package },
    { n: "En tránsito", Ic: Truck },
    { n: "Entregado", Ic: PackageCheck },
  ];
  return (
    <ol className="mt-6">
      {steps.map(({ n, Ic }, i) => {
        const done = i < s.step || (i === s.step && s.step === 2);
        const active = i === s.step && s.step < 2;
        return (
          <li key={n} className="flex gap-4">
            <div className="flex flex-col items-center">
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 350, damping: 20 }}
                className={`size-10 rounded-full grid place-items-center border ${done ? "bg-royal border-royal text-white" : active ? "bg-brand-red border-brand-red text-white" : "bg-surface border-line text-mute"}`}
              >
                {done ? <Check className="size-[18px]" /> : active ? (
                  <motion.span animate={{ x: [-1.5, 1.5, -1.5] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}><Ic className="size-[18px]" /></motion.span>
                ) : <Ic className="size-[18px]" />}
              </motion.span>
              {i < 2 && (
                <span className="w-0.5 flex-1 min-h-8 bg-line relative overflow-hidden">
                  <motion.span initial={{ height: 0 }} animate={{ height: i < s.step ? "100%" : 0 }} transition={{ delay: 0.2 + i * 0.2, duration: 0.5 }} className="absolute top-0 inset-x-0 bg-royal" />
                </span>
              )}
            </div>
            <div className="pb-6 pt-1.5">
              <div className={`text-[16px] leading-tight font-semibold ${done || active ? "" : "text-mute"}`}>{n}</div>
              {(done || active) && <div className={`text-[12px] font-mono mt-1 ${active ? "text-brand-red" : "text-mute"}`}>{s.times[i]}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function Rastrear({ selected, select }: { selected: Shipment; select: (code: string) => boolean }) {
  const [guia, setGuia] = useState("");
  const [err, setErr] = useState("");
  const [details, setDetails] = useState(false);
  const track = () => {
    if (!guia.trim()) return setErr("Ingresa un número de guía.");
    if (select(guia.trim().toUpperCase())) { setErr(""); setDetails(true); }
    else setErr("No encontramos esa guía.");
  };
  return (
    <Page>
      <div className="flex items-center justify-between">
        <img src={logo} alt="DOMESA" className="w-36 dark:hidden" />
        <img src={logoBlanco} alt="DOMESA" className="w-36 hidden dark:block" />
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-royal/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-royal">Consulta pública</span>
          <ThemeToggle />
        </div>
      </div>

      <h1 className="font-display text-[30px] leading-[1.1] font-bold tracking-tight mt-10 text-center">Llevamos tus envíos
a toda Venezuela</h1>
      <h2 className="font-display text-[22px] leading-[0.7] font-bold tracking-tight mt-10 text-center">Rastrea tu envío</h2>
      <div className="mt-6 flex items-center gap-3 h-[56px] px-4 rounded-2xl bg-surface border border-line focus-within:border-sky/70 transition-colors">
        <Search className="size-5 text-mute shrink-0" />
        <input
          value={guia}
          onChange={(e) => { setGuia(e.target.value); setErr(""); }}
          onKeyDown={(e) => e.key === "Enter" && track()}
          placeholder="Número de guía"
          className="flex-1 min-w-0 bg-transparent outline-none text-[16px] font-mono uppercase placeholder:normal-case placeholder:font-sans placeholder:text-mute"
        />
      </div>
      <AnimatePresence>{err && <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[13px] text-danger mt-2">{err}</motion.div>}</AnimatePresence>
      <div className="mt-3"><Btn onClick={track}>Rastrear</Btn></div>
      {ENABLE_QR_SCAN && (
        <div className="mt-3">
          {/* TODO QR: abrir la cámara, leer el código y llamar a select(codigo). Ver ENABLE_QR_SCAN en data.ts */}
          <Btn tone="ghost" icon={ScanSearch} onClick={() => setErr("El escaneo de QR estará disponible próximamente.")}>Escanear código QR</Btn>
        </div>
      )}
      <div className="flex gap-2 mt-4 overflow-x-auto -mx-6 px-6">
        {SHIPMENTS.map((s) => (
          <button key={s.code} onClick={() => { setGuia(s.code); select(s.code); setErr(""); }} className="shrink-0 h-8 px-3 rounded-full border border-line bg-surface font-mono text-[12px] text-mute hover:text-royal hover:border-sky/50 transition-colors">{s.code}</button>
        ))}
      </div>

      <div className={`${labelCls} mt-10`}>Envío activo</div>
      <AnimatePresence mode="wait">
        <motion.div key={selected.code} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-3 rounded-3xl bg-surface border border-line p-5">
          <div className="font-mono text-[22px] font-medium">{selected.code}</div>
          <div className="flex items-center gap-2 text-[14px] text-mute mt-1">{selected.from} <ArrowRight className="size-3.5" /> {selected.to}</div>
          <Timeline s={selected} />
          <AnimatePresence initial={false}>
            {details && (
              <motion.dl initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line text-[14px]">
                {[["Peso", selected.kg], ["Servicio", selected.service], ["Entrega estimada", selected.eta]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3 border-b border-line last:border-0"><dt className="text-mute">{k}</dt><dd className="font-semibold">{v}</dd></div>
                ))}
              </motion.dl>
            )}
          </AnimatePresence>
          <button onClick={() => setDetails(!details)} className="mt-1 text-[14px] font-semibold text-sky hover:underline">{details ? "Ocultar detalles" : "Ver detalles del viaje"}</button>
        </motion.div>
      </AnimatePresence>
    </Page>
  );
}
