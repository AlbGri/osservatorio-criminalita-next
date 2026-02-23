"use client";

import dynamic from "next/dynamic";
import { useFetchData } from "@/lib/use-fetch-data";
import {
  COLORS,
  CHART_HEIGHT,
  PLOTLY_CONFIG,
  COVID_SHAPES,
  COVID_ANNOTATIONS,
} from "@/lib/config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { ChartFullscreenWrapper } from "@/components/charts/chart-fullscreen-wrapper";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface PercezioneVsDati {
  Anno: number;
  Delitti: number;
  Popolazione: number;
  Tasso_per_1000: number;
  Percezione_pct: number;
}

export function ChartPercezioneVsDati() {
  const { data, loading, error } = useFetchData<PercezioneVsDati[]>(
    "/data/percezione_vs_dati.json"
  );

  if (loading) return <div className="h-[450px] animate-pulse bg-muted rounded" />;
  if (error) return <p className="text-destructive">Errore: {error}</p>;
  if (!data) return null;

  const anni = data.map((d) => d.Anno);

  const varPercezione =
    data[data.length - 1].Percezione_pct - data[0].Percezione_pct;
  const varTasso =
    data[data.length - 1].Tasso_per_1000 - data[0].Tasso_per_1000;

  const gaps = data.map((d) => d.Percezione_pct - d.Tasso_per_1000);
  const idxMaxGap = gaps.indexOf(Math.max(...gaps));

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription className="block">
          <strong>Divario percezione-dati:</strong> la percezione di insicurezza non e &quot;sbagliata&quot; - risponde a fattori legittimi come copertura mediatica, degrado urbano, sfiducia istituzionale. Percezione e criminalita registrata seguono dinamiche diverse.
        </AlertDescription>
      </Alert>

      <ChartFullscreenWrapper>
        <Plot
          data={[
            {
              x: anni,
              y: data.map((d) => d.Percezione_pct),
              mode: "lines+markers" as const,
              name: "Percezione insicurezza (%)",
              line: { color: COLORS.secondary, width: 3 },
              marker: { size: 8 },
              yaxis: "y",
            },
            {
              x: anni,
              y: data.map((d) => d.Tasso_per_1000),
              mode: "lines+markers" as const,
              name: "Tasso delitti per 1000 ab.",
              line: { color: COLORS.primary, width: 3, dash: "dash" as const },
              marker: { size: 8 },
              yaxis: "y2",
            },
          ]}
          layout={{
            xaxis: { title: { text: "Anno" } },
            yaxis: {
              title: { text: "% Percezione rischio", font: { color: COLORS.secondary, size: 12 } },
              tickfont: { color: COLORS.secondary },
              side: "left",
            },
            yaxis2: {
              title: { text: "Tasso per 1000 ab.", font: { color: COLORS.primary, size: 12 } },
              tickfont: { color: COLORS.primary },
              overlaying: "y" as const,
              side: "right",
            },
            dragmode: false,
            hovermode: "closest" as const,
            plot_bgcolor: "white",
            paper_bgcolor: "white",
            height: CHART_HEIGHT,
            margin: { l: 50, r: 50, t: 30, b: 50 },
            legend: { x: 0.5, y: 1.08, xanchor: "center", orientation: "h" as const },
            shapes: COVID_SHAPES,
            annotations: COVID_ANNOTATIONS,
          }}
          config={PLOTLY_CONFIG}
          useResizeHandler
          className="w-full"
        />
      </ChartFullscreenWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Delta Percezione 2014-2023</p>
            <p className="text-2xl font-bold">{varPercezione.toFixed(1)} punti %</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Delta Tasso criminalita</p>
            <p className="text-2xl font-bold">{varTasso.toFixed(1)} per 1000 ab.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Anno gap massimo</p>
            <p className="text-2xl font-bold">{anni[idxMaxGap]}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
