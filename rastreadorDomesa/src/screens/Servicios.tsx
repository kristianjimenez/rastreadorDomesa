import type { ReactNode } from "react";
import { Building2, Box, FileText, Globe, Handshake, Headset, Mail, MapPin, Package, PackageCheck, Truck } from "lucide-react";
import { COMERCIO, CORPORATIVO, INTERNACIONALES, NACIONALES } from "../content";
import type { Go } from "../nav";
import { Btn, CtaBar, H2, Hero, Steps, Title, type IconType } from "../ui";
import dhl from "../assets/aliados/dhl.png";

const Block = ({ children }: { children: ReactNode }) => <section className="mt-8">{children}</section>;

function Nacionales({ go }: { go: Go }) {
  return (
    <>
      <Title>Envíos nacionales</Title>
      <Hero title={NACIONALES.hero.title} sub={NACIONALES.hero.sub} icon={Truck} />
      <Block>
        <H2>Pasos para realizar un envío</H2>
        <Steps items={NACIONALES.steps} />
      </Block>
      <Block>
        <H2>¿Por qué elegirnos?</H2>
        <div className="space-y-3">
          {NACIONALES.why.map((w, i) => (
            <div key={w.title} className="rounded-2xl bg-surface border border-line p-4">
              <div className="font-semibold text-[15px]"><span className="text-royal font-display mr-1.5">{i + 1}.</span>{w.title}</div>
              <p className="text-[13px] text-mute leading-relaxed mt-1">{w.text}</p>
            </div>
          ))}
        </div>
      </Block>
      <CtaBar>
        <Btn icon={MapPin} onClick={() => go("oficinas")}>Ubicar una oficina</Btn>
        <Btn tone="ghost" icon={Package} onClick={() => go("contacto", { motivo: "Solicitar recolección" })}>Solicitar recolección</Btn>
      </CtaBar>
    </>
  );
}

function Internacionales({ go }: { go: Go }) {
  return (
    <>
      <Title>Envíos internacionales</Title>
      <Hero title={INTERNACIONALES.hero.title} sub={INTERNACIONALES.hero.sub} icon={Globe}>
        <div className="mt-4 inline-flex rounded-xl bg-white p-2"><img src={dhl} alt="DHL" className="h-6 w-auto" /></div>
      </Hero>
      <Block>
        <H2>Pasos para realizar un envío internacional</H2>
        <Steps items={INTERNACIONALES.steps} />
      </Block>
      <CtaBar>
        <Btn icon={MapPin} onClick={() => go("oficinas", { officeFilter: "intl" })}>Oficinas con envíos internacionales</Btn>
        {INTERNACIONALES.tariffUrl && (
          <a href={INTERNACIONALES.tariffUrl} target="_blank" rel="noreferrer" className="w-full h-[52px] rounded-2xl text-[15px] font-semibold flex items-center justify-center bg-surface text-slate-900 border border-line hover:bg-surface-2 transition-colors">
            Calcular tarifa internacional
          </a>
        )}
        <Btn tone="ghost" icon={Headset} onClick={() => go("contacto", { motivo: "Cotización" })}>Pedir una cotización</Btn>
      </CtaBar>
    </>
  );
}

const CORP_ICONS: Record<string, IconType> = { ligero: Mail, normal: Package, proveeduria: Box, masiva: FileText, resulta: PackageCheck };

function Corporativo({ go }: { go: Go }) {
  return (
    <>
      <Title>Servicio corporativo</Title>
      <Hero title={CORPORATIVO.hero.title} sub={CORPORATIVO.hero.sub} icon={Building2} />
      <Block>
        <H2>Modalidades</H2>
        <div className="space-y-3">
          {CORPORATIVO.items.map(({ key, title, text }) => {
            const Ic = CORP_ICONS[key] ?? Package;
            return (
              <div key={key} className="rounded-2xl bg-surface border border-line p-4 flex gap-4">
                <span className="size-11 rounded-xl bg-royal text-white grid place-items-center shrink-0"><Ic className="size-5" /></span>
                <div className="min-w-0">
                  <div className="font-semibold text-[15px]">{title}</div>
                  <div className="space-y-2 mt-1">{text.map((t) => <p key={t} className="text-[13px] text-mute leading-relaxed">{t}</p>)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Block>
      <CtaBar>
        <Btn icon={Handshake} onClick={() => go("contacto", { motivo: "Servicios corporativos" })}>Hablar con un ejecutivo</Btn>
      </CtaBar>
    </>
  );
}

const COM_ICONS: Record<string, IconType> = { guia: FileText, pago: Handshake, recolecta: Truck, atencion: Headset };

function Comercio({ go }: { go: Go }) {
  return (
    <>
      <Title>Comercio electrónico</Title>
      <Hero title={COMERCIO.hero.title} sub={COMERCIO.hero.sub} icon={Package} />
      <div className="grid grid-cols-2 gap-3 mt-4">
        {COMERCIO.benefits.map(({ key, text }) => {
          const Ic = COM_ICONS[key] ?? Package;
          return (
            <div key={key} className="rounded-2xl bg-surface border border-line p-4">
              <span className="size-10 rounded-xl bg-royal text-white grid place-items-center"><Ic className="size-5" /></span>
              <p className="text-[13px] font-semibold leading-snug mt-3">{text}</p>
            </div>
          );
        })}
      </div>
      <Block>
        <H2>Pasos de nuestro servicio para comercio electrónico</H2>
        <Steps items={COMERCIO.steps} />
      </Block>
      <CtaBar>
        <Btn icon={Handshake} onClick={() => go("contacto", { motivo: "Comercio electrónico" })}>Quiero más información</Btn>
      </CtaBar>
    </>
  );
}

export default function ServicePage({ kind, go }: { kind: string; go: Go }) {
  if (kind === "nacionales") return <Nacionales go={go} />;
  if (kind === "internacionales") return <Internacionales go={go} />;
  if (kind === "corporativo") return <Corporativo go={go} />;
  return <Comercio go={go} />;
}
