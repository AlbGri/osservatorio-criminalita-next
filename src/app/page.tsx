import { ChartTrendNazionale } from "@/components/charts/chart-trend-nazionale";
import { ChartPercezioneVsDati } from "@/components/charts/chart-percezione-vs-dati";
import { ChartTipologieReato } from "@/components/charts/chart-tipologie-reato";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:py-8 space-y-6 sm:space-y-10">
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Trend Delitti Denunciati in Italia (2014-2023)
        </h2>
        <ChartTrendNazionale />
      </section>

      <hr />

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Percezione della Sicurezza vs Criminalita Registrata (2014-2023)
        </h2>
        <ChartPercezioneVsDati />
      </section>

      <hr />

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Evoluzione Tipologie di Reato (2014-2023)
        </h2>
        <ChartTipologieReato />
      </section>
    </main>
  );
}
