"use client";

import dynamic from "next/dynamic";
import { useFetchData } from "@/lib/use-fetch-data";
import {
  CHART_HEIGHT_MAP,
  PLOTLY_CONFIG,
  NUTS_TO_ISTAT,
} from "@/lib/config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { ChartFullscreenWrapper } from "@/components/charts/chart-fullscreen-wrapper";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface DelittiRegione {
  REF_AREA: string;
  Territorio: string;
  Anno: number;
  Delitti: number;
  Popolazione: number;
  Tasso_per_1000: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GeoJSON = any;

interface Props {
  anno: number;
}

export function ChartMappaRegioni({ anno }: Props) {
  const { data, loading, error } = useFetchData<DelittiRegione[]>(
    "/data/delitti_regioni.json"
  );
  const {
    data: geojson,
    loading: geoLoading,
    error: geoError,
  } = useFetchData<GeoJSON>("/data/geojson_regioni_italia.geojson");

  if (loading || geoLoading)
    return <div className="h-[550px] animate-pulse bg-muted rounded" />;
  if (error || geoError)
    return (
      <p className="text-destructive">Errore: {error || geoError}</p>
    );
  if (!data || !geojson) return null;

  const dataAnno = data.filter((d) => d.Anno === anno);
  const codiciIstat = dataAnno.map((d) => NUTS_TO_ISTAT[d.REF_AREA]);
  const tassi = dataAnno.map((d) => d.Tasso_per_1000);
  const nomi = dataAnno.map((d) => d.Territorio);

  const sorted = [...dataAnno].sort(
    (a, b) => b.Tasso_per_1000 - a.Tasso_per_1000
  );
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];
  const media =
    dataAnno.reduce((s, d) => s + d.Tasso_per_1000, 0) / dataAnno.length;

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription className="block">
          <strong>Confronti territoriali: cautela necessaria.</strong> Regioni
          con alta presenza turistica o pendolarismo mostrano tassi elevati
          perche il denominatore e la popolazione residente, non quella
          effettiva. Il Nord Italia ha propensione alla denuncia mediamente piu
          alta del Sud (fonte: ISTAT Indagine Vittimizzazione). I dati mostrano
          criminalita REGISTRATA, non reale.
        </AlertDescription>
      </Alert>

      <ChartFullscreenWrapper>
        <Plot
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={[
            {
              type: "choropleth",
              geojson: geojson,
              locations: codiciIstat,
              z: tassi,
              featureidkey: "properties.reg_istat_code_num",
              colorscale: [
                [0, "#f5f5f5"],
                [0.25, "#d9d9d9"],
                [0.5, "#999999"],
                [0.75, "#636363"],
                [1, "#252525"],
              ],
              zmin: 0,
              zmax: 100,
              marker: { line: { color: "white", width: 1.5 } },
              colorbar: {
                title: { text: "Tasso per 1000 ab.", side: "bottom" },
                orientation: "h",
                x: 0.5,
                y: -0.02,
                len: 0.7,
                thickness: 12,
              },
              text: nomi,
              hovertemplate:
                "<b>%{text}</b><br>Tasso: %{z:.1f} per 1000 ab.<extra></extra>",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any,
          ]}
          layout={{
            geo: {
              projection: { type: "mercator", scale: 1 },
              center: { lat: 42.0, lon: 12.0 },
              showland: false,
              showlakes: false,
              showcountries: false,
              showcoastlines: false,
              showframe: false,
              bgcolor: "rgba(0,0,0,0)",
              lonaxis: { range: [6.5, 18.5] },
              lataxis: { range: [36, 47.2] },
            },
            annotations: [
              {
                text: `<b>${anno}</b>`,
                x: 0.02,
                y: 0.97,
                xref: "paper",
                yref: "paper",
                showarrow: false,
                font: { size: 18, color: "#333" },
                xanchor: "left",
                yanchor: "top",
              },
            ],
            height: CHART_HEIGHT_MAP,
            margin: { r: 0, t: 10, l: 0, b: 50 },
            dragmode: false,
            plot_bgcolor: "white",
            paper_bgcolor: "white",
          }}
          config={PLOTLY_CONFIG}
          useResizeHandler
          className="w-full"
        />
      </ChartFullscreenWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Tasso medio regioni
            </p>
            <p className="text-2xl font-bold">{media.toFixed(1)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Piu alto: {top.Territorio}
            </p>
            <p className="text-2xl font-bold">
              {top.Tasso_per_1000.toFixed(1)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Piu basso: {bottom.Territorio}
            </p>
            <p className="text-2xl font-bold">
              {bottom.Tasso_per_1000.toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
