"use client";

import dynamic from "next/dynamic";
import { useFetchData } from "@/lib/use-fetch-data";
import {
  COLORS,
  CHART_HEIGHT_SMALL,
  PLOTLY_CONFIG,
  COVID_SHAPES,
  COVID_ANNOTATIONS,
} from "@/lib/config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChartFullscreenWrapper } from "@/components/charts/chart-fullscreen-wrapper";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface CategoriaReato {
  Anno: number;
  Categoria: string;
  Delitti: number;
  Popolazione: number;
  Tasso_per_1000: number;
}

interface ReatoAllarme {
  Anno: number;
  Reato: string;
  Delitti: number;
  Popolazione: number;
  Tasso_per_100k: number;
}

const COLORI_CATEGORIE: Record<string, string> = {
  Furti: COLORS.furti,
  "Violenze contro la persona": COLORS.violenze,
  "Truffe e Frodi": COLORS.truffe,
  Rapine: COLORS.rapine,
  Droga: COLORS.droga,
  Altro: COLORS.altro,
};

const COLORI_ALLARME: Record<string, string> = {
  "Omicidi volontari consumati": COLORS.omicidi,
  "Tentati omicidi": COLORS.tentati_omicidi,
  "Violenze sessuali": COLORS.violenze_sessuali,
  "Atti sessuali con minorenne": COLORS.atti_minori,
  "Rapine in abitazione": COLORS.rapine_abitazione,
  "Sequestri di persona": COLORS.sequestri,
};

export function ChartTipologieReato() {
  const { data: categorie, loading: l1 } = useFetchData<CategoriaReato[]>(
    "/data/delitti_categorie.json"
  );
  const { data: allarme, loading: l2 } = useFetchData<ReatoAllarme[]>(
    "/data/reati_allarme_sociale.json"
  );

  if (l1 || l2)
    return <div className="h-[400px] animate-pulse bg-muted rounded" />;
  if (!categorie || !allarme) return null;

  const categorieUniche = [...new Set(categorie.map((d) => d.Categoria))];
  const reatiUnici = [...new Set(allarme.map((d) => d.Reato))];

  const traceCategorie = categorieUniche.map((cat) => {
    const filtered = categorie.filter((d) => d.Categoria === cat);
    return {
      x: filtered.map((d) => d.Anno),
      y: filtered.map((d) => d.Tasso_per_1000),
      mode: "lines+markers" as const,
      name: cat,
      line: { width: 2, color: COLORI_CATEGORIE[cat] ?? "#999999" },
      marker: { size: 5 },
    };
  });

  const traceAllarme = reatiUnici.map((reato) => {
    const filtered = allarme.filter((d) => d.Reato === reato);
    return {
      x: filtered.map((d) => d.Anno),
      y: filtered.map((d) => d.Tasso_per_100k),
      mode: "lines+markers" as const,
      name: reato,
      line: { width: 2, color: COLORI_ALLARME[reato] ?? "#999999" },
      marker: { size: 5 },
    };
  });

  const furti2014 = categorie.find((d) => d.Anno === 2014 && d.Categoria === "Furti");
  const furti2023 = categorie.find((d) => d.Anno === 2023 && d.Categoria === "Furti");
  const varFurti =
    furti2014 && furti2023
      ? ((furti2023.Tasso_per_1000 - furti2014.Tasso_per_1000) / furti2014.Tasso_per_1000) * 100
      : null;

  const truffe2014 = categorie.find((d) => d.Anno === 2014 && d.Categoria === "Truffe e Frodi");
  const truffe2023 = categorie.find((d) => d.Anno === 2023 && d.Categoria === "Truffe e Frodi");
  const varTruffe =
    truffe2014 && truffe2023
      ? ((truffe2023.Tasso_per_1000 - truffe2014.Tasso_per_1000) / truffe2014.Tasso_per_1000) * 100
      : null;

  const omicidi2014 = allarme.find((d) => d.Anno === 2014 && d.Reato === "Omicidi volontari consumati");
  const omicidi2023 = allarme.find((d) => d.Anno === 2023 && d.Reato === "Omicidi volontari consumati");
  const varOmicidi =
    omicidi2014 && omicidi2023
      ? ((omicidi2023.Tasso_per_100k - omicidi2014.Tasso_per_100k) / omicidi2014.Tasso_per_100k) * 100
      : null;

  const violenze2014 = allarme.find((d) => d.Anno === 2014 && d.Reato === "Violenze sessuali");
  const violenze2023 = allarme.find((d) => d.Anno === 2023 && d.Reato === "Violenze sessuali");
  const varViolenze =
    violenze2014 && violenze2023
      ? ((violenze2023.Tasso_per_100k - violenze2014.Tasso_per_100k) / violenze2014.Tasso_per_100k) * 100
      : null;

  const baseLayout = {
    dragmode: false as const,
    hovermode: "closest" as const,
    plot_bgcolor: "white",
    paper_bgcolor: "white",
    height: CHART_HEIGHT_SMALL,
    legend: {
      x: 0,
      y: -0.25,
      xanchor: "left" as const,
      orientation: "h" as const,
      font: { size: 10 },
    },
    margin: { l: 50, r: 20, t: 20, b: 80 },
    shapes: COVID_SHAPES,
    annotations: COVID_ANNOTATIONS,
  };

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription className="block">
          <strong>Dinamiche diverse per tipologia:</strong> aumenti in specifiche categorie (es. truffe online) possono riflettere cambiamenti sociali e tecnologici senza indicare piu criminalita complessiva. Le macro-categorie non sono mutuamente esclusive: uno stesso reato puo rientrare in piu categorie, pertanto la loro somma supera il totale nazionale.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Quadro Generale per Categoria</h3>
          <ChartFullscreenWrapper>
            <Plot
              data={traceCategorie}
              layout={{
                ...baseLayout,
                xaxis: { title: { text: "Anno" } },
                yaxis: { title: { text: "Tasso per 1000 ab.", font: { size: 12 } } },
              }}
              config={PLOTLY_CONFIG}
              useResizeHandler
              className="w-full"
            />
          </ChartFullscreenWrapper>
          {varFurti !== null && varTruffe !== null && (
            <p className="text-sm text-muted-foreground">
              <strong>Variazioni 2014-2023:</strong> Furti {varFurti.toFixed(1)}% | Truffe {varTruffe.toFixed(1)}%
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Reati ad Alto Impatto Mediatico</h3>
          <p className="text-sm text-muted-foreground">
            Focus su reati rari ma ad alto allarme sociale. Rappresentano &lt;2% dei delitti totali ma dominano percezione pubblica e copertura mediatica.
          </p>
          <ChartFullscreenWrapper>
            <Plot
              data={traceAllarme}
              layout={{
                ...baseLayout,
                xaxis: { title: { text: "Anno" } },
                yaxis: { title: { text: "Tasso per 100k ab.", font: { size: 12 } } },
              }}
              config={PLOTLY_CONFIG}
              useResizeHandler
              className="w-full"
            />
          </ChartFullscreenWrapper>
          {varOmicidi !== null && varViolenze !== null && (
            <p className="text-sm text-muted-foreground">
              <strong>Variazioni 2014-2023:</strong> Omicidi {varOmicidi.toFixed(1)}% | Violenze sessuali {varViolenze.toFixed(1)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
