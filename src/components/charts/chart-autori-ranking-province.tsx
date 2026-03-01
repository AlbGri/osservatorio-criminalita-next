"use client";

import dynamic from "next/dynamic";
import { useFetchData } from "@/lib/use-fetch-data";
import { PLOTLY_CONFIG, AXIS_FIXED } from "@/lib/config";
import { useIsMobile } from "@/lib/use-is-mobile";
import { ChartFullscreenWrapper } from "@/components/charts/chart-fullscreen-wrapper";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface ProvinciaRecord {
  data_type: "OFFEND" | "VICTIM";
  ref_area: string;
  provincia: string;
  regione: string;
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

const N_TOP = 15;

export function ChartAutoriRankingProvince({ dataType }: Props) {
  const isMobile = useIsMobile();
  const { data, loading, error } = useFetchData<ProvinciaRecord[]>(
    "/data/autori_vittime_province.json"
  );

  if (loading)
    return (
      <div className="h-[300px] sm:h-[450px] animate-pulse bg-muted rounded" />
    );
  if (error) return <p className="text-destructive">Errore: {error}</p>;
  if (!data) return null;

  // Per OFFEND usa TOT, per VICTIM usa il reato con piu' vittime totali
  let codiceReato = "TOT";
  if (dataType === "VICTIM") {
    const victimData = data.filter((r) => r.data_type === "VICTIM");
    const totPerReato = new Map<string, number>();
    for (const r of victimData) {
      totPerReato.set(
        r.codice_reato,
        (totPerReato.get(r.codice_reato) ?? 0) + r.totale
      );
    }
    const sorted = [...totPerReato.entries()].sort((a, b) => b[1] - a[1]);
    codiceReato = sorted[0]?.[0] ?? "CULPINJU";
  }

  const filtered = data.filter(
    (r) => r.data_type === dataType && r.codice_reato === codiceReato
  );

  // Top N per % stranieri
  const topN = [...filtered]
    .sort((a, b) => b.pct_stranieri - a.pct_stranieri)
    .slice(0, N_TOP);

  // Invertito per Plotly (il primo in basso)
  const reversed = [...topN].reverse();
  const nomi = reversed.map((d) => d.provincia);
  const pct = reversed.map((d) => d.pct_stranieri);

  // Media pesata
  const totSum = filtered.reduce((s, r) => s + r.totale, 0);
  const strSum = filtered.reduce((s, r) => s + r.stranieri, 0);
  const media = totSum > 0 ? (strSum / totSum) * 100 : 0;

  const colors = pct.map((p) => {
    const ratio = Math.min(p / 60, 1);
    const gray = Math.round(245 - ratio * 210);
    return `rgb(${gray},${gray},${gray})`;
  });

  const reatoLabel =
    dataType === "OFFEND"
      ? "totale autori"
      : filtered[0]?.reato?.toLowerCase() ?? codiceReato;

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
              customdata: reversed.map((d) => [
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
            },
            shapes: [
              {
                type: "line",
                x0: media,
                x1: media,
                y0: -0.5,
                y1: nomi.length - 0.5,
                line: { color: "#dc2626", width: 2, dash: "dash" },
              },
            ],
            annotations: [
              {
                x: media,
                y: nomi.length - 0.5,
                text: `Media: ${media.toFixed(1)}%`,
                showarrow: false,
                font: { size: 10, color: "#dc2626" },
                xanchor: "left",
                yanchor: "bottom",
                xshift: 4,
              },
            ],
            height: isMobile ? 400 : 450,
            margin: {
              l: isMobile ? 120 : 180,
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
      <p className="text-xs text-muted-foreground">
        Top {N_TOP} province per quota stranieri su {reatoLabel} (2022).
        La linea rossa indica la media nazionale ({media.toFixed(1)}%).
      </p>
    </div>
  );
}
