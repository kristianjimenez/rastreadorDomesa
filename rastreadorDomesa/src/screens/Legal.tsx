import { CircleCheck } from "lucide-react";
import { PROHIBIDOS, RESPONSABILIDADES, TERMINOS } from "../content";
import { Accordion, H2, Prohibited, Title } from "../ui";

export function Condiciones() {
  return (
    <>
      <Title>Condiciones de nuestros servicios</Title>
      <H2>Artículos de prohibida transportación</H2>
      <div className="grid grid-cols-2 gap-3">
        {PROHIBIDOS.map((t) => (
          <div key={t} className="rounded-2xl bg-surface border border-line p-3 flex flex-col items-center text-center gap-2">
            <Prohibited className="size-10 text-danger shrink-0" />
            <p className="text-[12px] text-slate-700 leading-snug">{t}</p>
          </div>
        ))}
      </div>

      <H2 className="mt-9">Responsabilidades</H2>
      <p className="text-[13px] text-mute leading-relaxed mb-4">{RESPONSABILIDADES.intro}</p>
      <ul className="rounded-2xl bg-surface border border-line divide-y divide-line">
        {RESPONSABILIDADES.items.map((t) => (
          <li key={t} className="flex gap-3 p-4 text-[13px] text-slate-700 leading-relaxed">
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
          body: <div className="space-y-3">{s.paragraphs.map((p) => <p key={p} className="text-[13px] text-slate-700 leading-relaxed">{p}</p>)}</div>,
        }))}
      />
    </>
  );
}
