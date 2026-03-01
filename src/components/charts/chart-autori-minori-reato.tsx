"use client";

import dynamic from "next/dynamic";
import { useFetchData } from "@/lib/use-fetch-data";
import { PLOTLY_CONFIG, AXIS_FIXED } from "@/lib/config";
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

export function ChartAutoriMinoriReato({ dataType }: Props) {
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

  // Filtra: tipo, no STALK duplicato, solo con dato minori, almeno MIN_CASI
  const filtered = data.filter(
    (r) =>
      r.data_type === dataType &&
      r.codice_reato !== "STALK" &&
      r.pct_minori !== null &&
      r.totale >= MIN_CASI
  );

  const sorted = [...filtered].sort(
    (a, b) => (a.pct_minori ?? 0) - (b.pct_minori ?? 0)
  );

  const nomi = sorted.map((d) => d.reato);
  const pct = sorted.map((d) => d.pct_minori ?? 0);

  // Gradiente viola per minori
  const colors = pct.map((p) => {
    const ratio = Math.min(p / 50, 1);
    const r = Math.round(120 + ratio * 100);
    const g = Math.round(120 - ratio * 80);
    const b = Math.round(200 - ratio * 20);
    return `rgb(${r},${g},${b})`;
  });

  const nBars = sorted.length;
  const barHeight = isMobile ? 18 : 22;
  const chartHeight = Math.max(400, nBars * barHeight + 80);

  return (
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
              "<b>%{y}</b><br>Minori: %{x:.1f}%<br>" +
              "Totale: %{customdata[0]}<br>Minori: %{customdata[1]}<extra></extra>",
            customdata: sorted.map((d) => [
              d.totale.toLocaleString("it-IT"),
              d.minori.toLocaleString("it-IT"),
            ]),
          },
        ]}
        layout={{
          xaxis: {
            ...AXIS_FIXED,
            title: { text: "% minori" },
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
  );
}
