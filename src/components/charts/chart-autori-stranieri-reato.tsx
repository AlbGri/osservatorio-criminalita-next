"use client";

import dynamic from "next/dynamic";
import { useFetchData } from "@/lib/use-fetch-data";
import { COLORS, PLOTLY_CONFIG, AXIS_FIXED } from "@/lib/config";
import { useIsMobile } from "@/lib/use-is-mobile";
import { ChartFullscreenWrapper } from "@/components/charts/chart-fullscreen-wrapper";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface ReatiRecord {
  data_type: "OFFEND" | "VICTIM";
  codice_reato: string;
  reato: string;
  totale: number;
  stranieri: number;
  minori: number;
  pct_stranieri: number;
  pct_minori: number | null;
}

interface Props {
  dataType: "OFFEND" | "VICTIM";
}

export function ChartAutoriStranieriReato({ dataType }: Props) {
  const isMobile = useIsMobile();
  const { data, loading, error } = useFetchData<ReatiRecord[]>(
    "/data/autori_vittime_reati.json"
  );

  if (loading)
    return (
      <div className="h-[400px] sm:h-[600px] animate-pulse bg-muted rounded" />
    );
  if (error) return <p className="text-destructive">Errore: {error}</p>;
  if (!data) return null;

  const MIN_CASI = 30;

  // Filtra per tipo, rimuove STALK (duplicato di CP612BIS) e reati con pochi casi
  const filtered = data.filter(
    (r) =>
      r.data_type === dataType &&
      r.codice_reato !== "STALK" &&
      r.totale >= MIN_CASI
  );
  const esclusi = data.filter(
    (r) =>
      r.data_type === dataType &&
      r.codice_reato !== "STALK" &&
      r.totale > 0 &&
      r.totale < MIN_CASI
  );

  // Ordina per pct_stranieri crescente (il più alto appare in cima nel grafico)
  const sorted = [...filtered].sort(
    (a, b) => a.pct_stranieri - b.pct_stranieri
  );

  const nomi = sorted.map((d) => d.reato);
  const pct = sorted.map((d) => d.pct_stranieri);

  // Gradiente colore basato sulla percentuale
  const colors = pct.map((p) => {
    const ratio = Math.min(p / 70, 1);
    const r = Math.round(46 + ratio * 184);
    const g = Math.round(134 - ratio * 77);
    const b = Math.round(171 - ratio * 101);
    return `rgb(${r},${g},${b})`;
  });

  const nBars = sorted.length;
  const barHeight = isMobile ? 18 : 22;
  const chartHeight = Math.max(400, nBars * barHeight + 80);

  return (
    <div className="space-y-2">
    <ChartFullscreenWrapper>
      <Plot
        data={[
          {
            type: "bar",
            y: nomi,
            x: pct,
            orientation: "h" as const,
            marker: { color: colors },
            text: pct.map((p) => `${p.toFixed(1)}%`),
            textposition: "outside" as const,
            hovertemplate:
              "<b>%{y}</b><br>Stranieri: %{x:.1f}%<br>" +
              "Totale: %{customdata[0]}<br>Stranieri: %{customdata[1]}<extra></extra>",
            customdata: sorted.map((d) => [
              d.totale.toLocaleString("it-IT"),
              d.stranieri.toLocaleString("it-IT"),
            ]),
          },
        ]}
        layout={{
          xaxis: {
            ...AXIS_FIXED,
            title: { text: "% stranieri" },
            range: [0, Math.max(...pct) * 1.15],
          },
          yaxis: {
            ...AXIS_FIXED,
            automargin: true,
            tickfont: { size: isMobile ? 9 : 11 },
          },
          height: chartHeight,
          margin: {
            l: isMobile ? 140 : 220,
            r: 50,
            t: 10,
            b: 40,
          },
          dragmode: false,
          plot_bgcolor: "white",
          paper_bgcolor: "white",
        }}
        config={PLOTLY_CONFIG}
        useResizeHandler
        className="w-full"
      />
    </ChartFullscreenWrapper>
    {esclusi.length > 0 && (
      <p className="text-xs text-muted-foreground">
        Esclusi {esclusi.length} reati con meno di {MIN_CASI} casi totali
        ({esclusi.map((r) => `${r.reato}: ${r.totale}`).join(", ")}).
        Con numeri cos&igrave; bassi la percentuale non &egrave; significativa.
      </p>
    )}
    </div>
  );
}
