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

interface DelittiItalia {
  Anno: number;
  Delitti: number;
  Popolazione: number;
  Tasso_per_1000: number;
}

export function ChartTrendNazionale() {
  const { data, loading, error } = useFetchData<DelittiItalia[]>(
    "/data/delitti_italia.json"
  );

  if (loading) return <div className="h-[450px] animate-pulse bg-muted rounded" />;
  if (error) return <p className="text-destructive">Errore: {error}</p>;
  if (!data) return null;

  const anni = data.map((d) => d.Anno);
  const tassi = data.map((d) => d.Tasso_per_1000);

  const variazione =
    ((data[data.length - 1].Tasso_per_1000 - data[0].Tasso_per_1000) /
      data[0].Tasso_per_1000) *
    100;

  const idxMin = tassi.indexOf(Math.min(...tassi));
  const idxMax = tassi.indexOf(Math.max(...tassi));

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription className="block">
          <strong>Nota metodologica:</strong> questi dati mostrano <strong>denunce registrate</strong>, non crimini effettivamente commessi. Alcuni reati hanno bassa propensione alla denuncia (es. violenze domestiche), altri alta (es. furti auto assicurati).
        </AlertDescription>
      </Alert>

      <ChartFullscreenWrapper>
        <Plot
          data={[
            {
              x: anni,
              y: tassi,
              mode: "lines+markers" as const,
              name: "Tasso delitti per 1000 abitanti",
              line: { color: COLORS.primary, width: 3 },
              marker: { size: 8 },
            },
          ]}
          layout={{
            xaxis: { title: { text: "Anno" } },
            yaxis: { title: { text: "Delitti per 1000 ab." } },
            dragmode: false,
            hovermode: "closest" as const,
            plot_bgcolor: "white",
            paper_bgcolor: "white",
            height: CHART_HEIGHT,
            margin: { l: 50, r: 20, t: 20, b: 50 },
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
            <p className="text-sm text-muted-foreground">Variazione tasso 2014-2023</p>
            <p className="text-2xl font-bold">{variazione.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Anno tasso minimo</p>
            <p className="text-2xl font-bold">{anni[idxMin]}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">Anno tasso massimo</p>
            <p className="text-2xl font-bold">{anni[idxMax]}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
