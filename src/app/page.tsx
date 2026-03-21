import { KpiSummary } from "@/components/charts/kpi-summary";
import { ChartTrendNazionale } from "@/components/charts/chart-trend-nazionale";
import { ChartPercezioneVsDati } from "@/components/charts/chart-percezione-vs-dati";
import { ChartNumeroOscuro } from "@/components/charts/chart-numero-oscuro";
import { CollapsibleSection } from "@/components/ui/collapsible-section";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:py-8 space-y-6 sm:space-y-10">
      <KpiSummary />

      <hr />

      <CollapsibleSection
        title="Trend Delitti Denunciati in Italia (2014-2024)"
        description="Andamento dei delitti denunciati per tipologia di reato"
        defaultOpen
      >
        <ChartTrendNazionale />
      </CollapsibleSection>

      <hr />

      <CollapsibleSection
        title="Percezione della Sicurezza vs Delitti Denunciati (2014-2024)"
        description="Confronto tra percezione di insicurezza e dati reali sulle denunce"
      >
        <ChartPercezioneVsDati />
      </CollapsibleSection>

      <hr />

      <CollapsibleSection
        title="Il Numero Oscuro: Cosa Non Vediamo"
        description="Propensione alla denuncia per tipo di reato e territorio"
      >
        <ChartNumeroOscuro />
      </CollapsibleSection>
    </main>
  );
}
