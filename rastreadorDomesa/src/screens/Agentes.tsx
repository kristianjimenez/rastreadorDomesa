import { Building2, MapPin, Package, ShoppingBag, Truck, Mail } from "lucide-react";
import { AGENTES } from "../content";
import type { Go } from "../nav";
import { Accordion, Btn, CtaBar, H2, Hero, Steps, Title, type IconType } from "../ui";

const ICONS: Record<string, IconType> = { comercial: Building2, territorial: MapPin, logistico: Truck, punto: ShoppingBag };

export default function Agentes({ go }: { go: Go }) {
  return (
    <>
      <Title>Agentes autorizados</Title>
      <Hero title={AGENTES.hero.title} sub={AGENTES.hero.sub} icon={Package} />

      <section className="mt-8">
        <H2>Requisitos para ser un Agente Autorizado</H2>
        <Accordion
          openFirst
          items={AGENTES.tipos.map((t) => {
            const Ic = ICONS[t.key] ?? Building2;
            return {
              id: t.key,
              title: t.title,
              body: (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="size-10 rounded-xl bg-royal text-white grid place-items-center shrink-0"><Ic className="size-5" /></span>
                    <p className="text-[13px] text-mute leading-relaxed">{t.text}</p>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-mute font-semibold mb-2">Requisitos</div>
                  <ul className="space-y-2">
                    {t.reqs.map((r) => (
                      <li key={r} className="flex gap-2 text-[13px] text-slate-700 leading-relaxed"><span className="mt-2 size-1.5 rounded-full bg-royal shrink-0" />{r}</li>
                    ))}
                  </ul>
                </div>
              ),
            };
          })}
        />
      </section>

      <section className="mt-8">
        <H2>Pasos para ser un Agente Autorizado</H2>
        <Steps items={AGENTES.steps} />
      </section>

      <CtaBar>
        <Btn onClick={() => go("contacto", { motivo: "Quiero ser agente autorizado" })}>Quiero ser agente autorizado</Btn>
        <a href="mailto:ciac.domesa@domesa.com.ve?subject=Quiero%20ser%20Agente%20Autorizado" className="w-full h-[52px] rounded-2xl text-[15px] font-semibold flex items-center justify-center gap-2 bg-surface text-slate-900 border border-line hover:bg-surface-2 transition-colors">
          <Mail className="size-[18px]" /> Escribir por correo
        </a>
      </CtaBar>
    </>
  );
}
