import { CircleCheck } from "lucide-react";
import { PROHIBIDOS, RESPONSABILIDADES, TERMINOS } from "../content";
import { CashIcon, FlameIcon, FlaskIcon, GlassIcon, GunIcon, PawIcon, PillIcon, PlantIcon, SprayIcon } from "../icons";
import { Accordion, H2, Title, type IconType } from "../ui";

const ICONOS: Record<string, IconType> = {
  planta: PlantIcon, drogas: PillIcon, animales: PawIcon, armas: GunIcon, vidrio: GlassIcon,
  dinero: CashIcon, limpieza: SprayIcon, inflamables: FlameIcon, quimicos: FlaskIcon,
};

/** Pictograma del artículo dentro de un círculo rojo tachado, como en el portal. */
function Prohibido({ icon }: { icon: string }) {
  const Ic = ICONOS[icon] ?? PillIcon;
  return (
    <span className="relative size-12 rounded-full border-2 border-danger grid place-items-center shrink-0" aria-hidden="true">
      <Ic className="size-6 text-royal" strokeWidth={1.8} />
      <span className="absolute inset-0 grid place-items-center">
        <span className="h-full w-[2px] -rotate-45 rounded-full bg-danger" />
      </span>
    </span>
  );
}

export function Condiciones() {
  return (
    <>
      <Title>Condiciones de nuestros servicios</Title>
      <H2>Artículos de prohibida transportación</H2>
      <ul className="rounded-2xl bg-surface border border-line divide-y divide-line">
        {PROHIBIDOS.map(({ icon, text }) => (
          <li key={icon} className="flex items-center gap-3 px-3 py-2.5">
            <Prohibido icon={icon} />
            <p className="text-[12.5px] text-ink-2 leading-snug">{text}</p>
          </li>
        ))}
      </ul>

      <H2 className="mt-9">Responsabilidades</H2>
      <p className="text-[13px] text-mute leading-relaxed mb-4">{RESPONSABILIDADES.intro}</p>
      <ul className="rounded-2xl bg-surface border border-line divide-y divide-line">
        {RESPONSABILIDADES.items.map((t) => (
          <li key={t} className="flex gap-3 px-4 py-3 text-[12.5px] text-ink-2 leading-relaxed">
            <CircleCheck className="size-4 text-royal shrink-0 mt-0.5" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Terminos() {
  return (
    <>
      <Title sub={TERMINOS.intro.join(" ")}>Términos y condiciones de uso</Title>
      <Accordion
        openFirst
        items={TERMINOS.sections.map((s) => ({
          id: s.title,
          title: s.title,
          body: <div className="space-y-3">{s.paragraphs.map((p) => <p key={p} className="text-[13px] text-ink-2 leading-relaxed">{p}</p>)}</div>,
        }))}
      />
    </>
  );
}
