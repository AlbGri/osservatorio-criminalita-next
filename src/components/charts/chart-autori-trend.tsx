"use client";

import dynamic from "next/dynamic";
import { useFetchData } from "@/lib/use-fetch-data";
import {
  COLORS,
  CHART_HEIGHT,
  PLOTLY_CONFIG,
  COVID_SHAPES,
  COVID_ANNOTATIONS,
  AXIS_FIXED,
} from "@/lib/config";
import { useIsMobile } from "@/lib/use-is-mobile";
import { ChartFullscreenWrapper } from "@/components/charts/chart-fullscreen-wrapper";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface TrendRecord {
  anno: number;
  totale: number;
  stranieri: number;
  minori: number;
  pct_stranieri: number;
  pct_minori: number | null;
}

export function ChartAutoriTrend() {
  const isMobile = useIsMobile();
  const { data, loading, error } = useFetchData<TrendRecord[]>(
    "/data/autori_vittime_trend.json"
  );

  if (loading)
    return (
      <div className="h-[250px] sm:h-[450px] animate-pulse bg-muted rounded" />
    );
  if (error) return <p className="text-destructive">Errore: {error}</p>;
  if (!data) return null;

  const anni = data.map((d) => d.anno);

  return (
    <ChartFullscreenWrapper>
      <Plot
        data={[
          {
            x: anni,
            y: data.map((d) => d.totale),
            mode: "lines+markers" as const,
            name: "Totale autori",
            line: { color: COLORS.primary, width: 3 },
            marker: { size: 8 },
            yaxis: "y",
          },
          {
            x: anni,
            y: data.map((d) => d.pct_stranieri),
            mode: "lines+markers" as const,
            name: "% stranieri",
            line: {
              color: COLORS.secondary,
              width: 3,
              dash: "dash" as const,
            },
            marker: { size: 8 },
            yaxis: "y2",
          },
        ]}
        layout={{
          xaxis: { ...AXIS_FIXED, title: { text: "Anno" } },
          yaxis: {
            ...AXIS_FIXED,
            title: {
              text: "Totale autori",
              font: { color: COLORS.primary, size: 12 },
            },
            tickfont: { color: COLORS.primary },
            side: "left",
          },
          yaxis2: {
            ...AXIS_FIXED,
            title: {
              text: "% stranieri",
              font: { color: COLORS.secondary, size: 12 },
            },
            tickfont: { color: COLORS.secondary },
            overlaying: "y" as const,
            side: "right",
          },
          dragmode: false,
          hovermode: "closest" as const,
          plot_bgcolor: "white",
          paper_bgcolor: "white",
          height: isMobile ? 250 : CHART_HEIGHT,
          margin: isMobile
            ? { l: 45, r: 45, t: 40, b: 70 }
            : { l: 60, r: 60, t: 30, b: 50 },
          legend: isMobile
            ? {
                x: 0.5,
                y: -0.3,
                xanchor: "center",
                yanchor: "top",
                orientation: "h" as const,
                font: { size: 9 },
              }
            : {
                x: 0.5,
                y: 1.08,
                xanchor: "center",
                orientation: "h" as const,
              },
          shapes: COVID_SHAPES,
          annotations: isMobile
            ? COVID_ANNOTATIONS.map((a) => ({
                ...a,
                y: 0.92,
                font: { ...a.font, size: 8 },
              }))
            : COVID_ANNOTATIONS,
        }}
        config={PLOTLY_CONFIG}
        useResizeHandler
        className="w-full"
      />
    </ChartFullscreenWrapper>
  );
}
