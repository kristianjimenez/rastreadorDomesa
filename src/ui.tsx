import { useState, type ReactNode, type ComponentType } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { CITIES } from "./data";
import { MoonIcon, SunIcon } from "./icons";
import { useTheme } from "./theme";

export type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

export const labelCls = "block text-[11px] uppercase tracking-[0.14em] text-mute font-semibold";

export function Field({ name, type = "text", value, onChange, mono, icon: Ic }: {
  name: string; type?: string; value: string; onChange: (v: string) => void; mono?: boolean; icon?: IconType;
}) {
  const [show, setShow] = useState(false);
  const pw = type === "password";
  return (
    <label className="block">
      <span className={labelCls}>{name}</span>
      <span className="mt-2 flex items-center gap-3 h-[52px] px-4 rounded-2xl bg-surface border border-line focus-within:border-sky/70 focus-within:bg-surface-2 transition-colors">
        {Ic && <Ic className="size-[18px] text-mute shrink-0" />}
        <input
          type={pw && show ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 min-w-0 bg-transparent outline-none text-[15px] ${mono ? "font-mono uppercase" : ""}`}
        />
        {pw && (
          <button type="button" onClick={() => setShow(!show)} aria-label="Mostrar contraseña" className="text-mute hover:text-royal transition-colors">
            {show ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
          </button>
        )}
      </span>
    </label>
  );
}

export function Select({ name, value, onChange, options = CITIES }: { name: string; value: string; onChange: (v: string) => void; options?: readonly string[] }) {
  return (
    <label className="block">
      <span className={labelCls}>{name}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full h-[52px] px-4 rounded-2xl bg-surface border border-line focus:border-sky/70 outline-none text-[15px]">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function TextArea({ name, value, onChange, placeholder }: {
  name: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{name}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl bg-surface border border-line focus:border-sky/70 outline-none p-4 text-[15px] resize-none placeholder:text-mute"
      />
    </label>
  );
}

export function Btn({ children, tone = "red", onClick, submit, icon: Ic }: {
  children: ReactNode; tone?: "red" | "blue" | "ghost"; onClick?: () => void; submit?: boolean; icon?: IconType;
}) {
  const tones = {
    red: "bg-royal text-white hover:brightness-90",
    blue: "bg-royal text-white hover:brightness-90",
    ghost: "bg-surface text-ink border border-line hover:bg-surface-2",
  };
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`w-full h-[52px] rounded-2xl text-[15px] font-semibold flex items-center justify-center gap-2 transition-colors ${tones[tone]}`}
    >
      {Ic && <Ic className="size-[18px]" />}
      {children}
    </motion.button>
  );
}

export const Page = ({ children }: { children: ReactNode }) => (
  <div className="flex-1 overflow-y-auto px-6 pt-8 pb-10">{children}</div>
);

export const Title = ({ children, sub }: { children: ReactNode; sub?: string }) => (
  <div className="mb-7">
    <h1 className="font-display text-[30px] leading-tight font-bold tracking-tight">{children}</h1>
    {sub && <p className="text-[14px] text-mute mt-1.5">{sub}</p>}
  </div>
);

export const Back = ({ onClick, label = "Menú" }: { onClick: () => void; label?: string }) => (
  <button onClick={onClick} className="mb-5 -ml-1 flex items-center gap-1 text-[14px] text-mute hover:text-royal transition-colors">
    <ChevronLeft className="size-5" /> {label}
  </button>
);

export function Tile({ icon: Ic, label, onClick, i = 0 }: { icon: IconType; label: string; onClick: () => void; i?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * i, type: "spring", stiffness: 300, damping: 26 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className="group flex flex-col items-center gap-2.5 text-center min-w-0"
    >
      <span className="size-[68px] rounded-[22px] bg-surface border border-line grid place-items-center group-hover:bg-surface-2 group-hover:border-sky/40 transition-colors">
        <Ic className="size-[26px] text-royal transition-colors" strokeWidth={1.6} />
      </span>
      <span className="text-[12px] font-medium leading-snug text-ink-2 w-full px-1 text-balance break-words">{label}</span>
    </motion.button>
  );
}

/* ───────────── Bloques de contenido reutilizables ───────────── */

export const H2 = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 className={`font-display text-[19px] font-bold mb-4 ${className}`}>{children}</h2>
);

/** Tarjeta de cabecera de cada página de contenido. */
export function Hero({ title, sub, children, icon: Ic }: { title: string; sub?: string; children?: ReactNode; icon?: IconType }) {
  return (
    <div className="rounded-3xl bg-royal p-5 text-white overflow-hidden relative">
      <div className="relative z-10">
        <div className="font-display text-[24px] font-bold leading-tight">{title}</div>
        {sub && <p className="text-[13px] text-white/75 mt-3 leading-relaxed">{sub}</p>}
        {children}
      </div>
      {Ic && <Ic className="absolute -right-5 -bottom-6 size-32 text-white/10" strokeWidth={1.4} />}
    </div>
  );
}

/** Lista numerada de pasos. */
export function Steps({ items }: { items: { title: string; text?: string; list?: string[] }[] }) {
  return (
    <ol className="space-y-3">
      {items.map((s, i) => (
        <li key={s.title} className="flex gap-4 rounded-2xl bg-surface border border-line p-4">
          <span className="size-9 rounded-full bg-royal text-white grid place-items-center font-display font-bold shrink-0">{i + 1}</span>
          <div className="min-w-0">
            <div className="font-semibold text-[15px] leading-snug pt-1.5">{s.title}</div>
            {s.text && <p className="text-[13px] text-mute leading-relaxed mt-1">{s.text}</p>}
            {s.list && (
              <ul className="mt-2 space-y-1.5">
                {s.list.map((x) => (
                  <li key={x} className="flex gap-2 text-[13px] text-ink-2"><Check className="size-4 text-royal shrink-0 mt-0.5" />{x}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Lista de secciones desplegables. */
export function Accordion({ items, openFirst = false }: { items: { id: string; title: string; body: ReactNode }[]; openFirst?: boolean }) {
  const [open, setOpen] = useState<string | null>(openFirst ? items[0]?.id ?? null : null);
  return (
    <div className="rounded-2xl bg-surface border border-line divide-y divide-line">
      {items.map(({ id, title, body }) => (
        <div key={id}>
          <button type="button" aria-expanded={open === id} onClick={() => setOpen(open === id ? null : id)} className="w-full flex items-center justify-between gap-3 p-4 text-left text-[15px] font-semibold">
            <span>{title}</span>
            <motion.span animate={{ rotate: open === id ? 180 : 0 }}><ChevronDown className="size-4 text-mute" /></motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="px-4 pb-4">{body}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/** Banda con botones de llamada a la acción al final de una página. */
export const CtaBar = ({ children }: { children: ReactNode }) => <div className="mt-8 space-y-3">{children}</div>;

/** Botón para alternar entre tema claro y oscuro. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={dark ? "Tema claro" : "Tema oscuro"}
      className={`size-10 shrink-0 rounded-full bg-surface border border-line text-ink grid place-items-center hover:bg-surface-2 transition-colors ${className}`}
    >
      {dark ? <SunIcon className="size-[18px]" /> : <MoonIcon className="size-[18px]" />}
    </motion.button>
  );
}
