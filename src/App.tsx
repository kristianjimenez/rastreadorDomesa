import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, FileText, LayoutGrid, ScanSearch } from "lucide-react";
import { SHIPMENTS } from "./data";
import { Page } from "./ui";
import Tarifas from "./screens/Tarifas";
import Rastrear from "./screens/Rastrear";
import Menu from "./screens/Menu";
import Contacto from "./screens/Contacto";

const TABS = [
  { k: "tarifas", label: "Tarifas", Icon: Calculator },
  { k: "rastrear", label: "Rastrear", Icon: ScanSearch },
  { k: "formulario", label: "Formulario", Icon: FileText },
  { k: "menu", label: "Menú", Icon: LayoutGrid },
] as const;
type Tab = (typeof TABS)[number]["k"];

export default function App() {
  const [tab, setTab] = useState<Tab>("rastrear");
  const [dir, setDir] = useState(1);
  const [selected, setSelected] = useState(SHIPMENTS[0]);

  const go = (t: Tab) => {
    setDir(TABS.findIndex((x) => x.k === t) > TABS.findIndex((x) => x.k === tab) ? 1 : -1);
    setTab(t);
  };
  const select = (code: string) => {
    const s = SHIPMENTS.find((x) => x.code === code);
    if (s) setSelected(s);
    return !!s;
  };

  return (
    <div className="min-h-dvh md:h-dvh md:grid md:place-items-center md:p-6 bg-bg md:bg-surface-2">
      <div className="h-dvh md:h-[min(840px,100%)] w-full md:w-[410px] md:rounded-[36px] md:border border-line bg-bg overflow-hidden flex flex-col md:shadow-2xl">
        <>
            <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.div
                  key={tab}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ x: d * 40, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: d * -40, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  className="flex-1 min-h-0 flex flex-col"
                >
                  {tab === "tarifas" && <Tarifas />}
                  {tab === "rastrear" && <Rastrear selected={selected} select={select} />}
                  {tab === "formulario" && <Page><Contacto formOnly /></Page>}
                  {tab === "menu" && <Menu />}
                </motion.div>
              </AnimatePresence>
            </div>
            <nav className="shrink-0 h-[76px] bg-surface/95 border-t border-line grid grid-cols-4 px-2 items-center shadow-[0_-8px_24px_rgba(23,32,51,.04)]">
              {TABS.map(({ k, label, Icon }) => (
                <button key={k} onClick={() => go(k)} className="relative h-14 flex flex-col items-center justify-center gap-0.5">
                  {tab === k && <motion.span layoutId="pill" className="absolute inset-x-2 inset-y-1 rounded-2xl bg-royal/10" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <motion.span animate={{ y: tab === k ? -1 : 0, scale: tab === k ? 1.08 : 1 }} className={`relative ${tab === k ? "text-sky" : "text-mute"}`}><Icon className="size-[22px]" strokeWidth={1.8} /></motion.span>
                  <span className={`relative text-[11px] font-semibold ${tab === k ? "text-sky" : "text-mute"}`}>{label}</span>
                </button>
              ))}
            </nav>
          </>
      </div>
    </div>
  );
}
