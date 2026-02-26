"use client";

import dynamic from "next/dynamic";
import { COLORS, CHART_HEIGHT_SMALL, PLOTLY_CONFIG } from "@/lib/config";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChartFullscreenWrapper } from "@/components/charts/chart-fullscreen-wrapper";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const URL_REATI_2023 =
  "https://www.istat.it/comunicato-stampa/reati-contro-la-persona-e-contro-la-proprieta-vittime-ed-eventi-2022-2023/";
const URL_VIOLENZA_2025 =
  "https://www.istat.it/comunicato-stampa/la-violenza-contro-le-donne-dentro-e-fuori-la-famiglia-primi-risultati-anno-2025/";

const categorie = [
  "Violenza da partner",
  "Aggressioni",
  "Frodi/clonazione carte",
  "Scippi",
  "Furti auto/moto",
];
const pctDenunciati = [11, 41, 59, 68, 95];
const pctNonDenunciati = [89, 59, 41, 32, 5];

const catConfronto = ["Aggressioni", "Scippi"];
const pct2016 = [20, 89];
const pct2023 = [41, 68];

export function ChartNumeroOscuro() {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription className="block">
          <strong>Il numero oscuro</strong> e la differenza tra reati commessi e
          reati denunciati. L&apos;Indagine ISTAT sulla Sicurezza dei Cittadini
          stima la quota di vittime che denuncia, permettendo di misurare quanto
          le statistiche ufficiali sottostimino la realta.
        </AlertDescription>
      </Alert>

      <ChartFullscreenWrapper>
        <Plot
          data={[
            {
              name: "Denunciati (dati visibili)",
              y: categorie,
              x: pctDenunciati,
              orientation: "h" as const,
              type: "bar",
              marker: { color: COLORS.primary },
              text: pctDenunciati.map((v) => `${v}%`),
              textposition: "inside" as const,
            },
            {
              name: "Non denunciati (numero oscuro)",
              y: categorie,
              x: pctNonDenunciati,
              orientation: "h" as const,
              type: "bar",
              marker: { color: "#d3d3d3" },
              text: pctNonDenunciati.map((v) => `${v}%`),
              textposition: "inside" as const,
            },
          ]}
          layout={{
            barmode: "stack",
            xaxis: { title: { text: "Percentuale (%)" }, range: [0, 100] },
            height: CHART_HEIGHT_SMALL,
            legend: { orientation: "h" as const, y: -0.15 },
            margin: { t: 20, l: 150, r: 20, b: 50 },
            dragmode: false,
            plot_bgcolor: "white",
            paper_bgcolor: "white",
          }}
          config={PLOTLY_CONFIG}
          useResizeHandler
          className="w-full"
        />
      </ChartFullscreenWrapper>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          Come cambia la propensione alla denuncia nel tempo
        </h3>
        <p className="text-muted-foreground">
          Confronto tra le due edizioni dell&apos;indagine ISTAT per i reati
          comparabili.
        </p>
      </div>

      <ChartFullscreenWrapper>
        <Plot
          data={[
            {
              name: "2015-2016",
              x: catConfronto,
              y: pct2016,
              type: "bar",
              marker: { color: "#b0c4de" },
              text: pct2016.map((v) => `${v}%`),
              textposition: "outside" as const,
            },
            {
              name: "2022-2023",
              x: catConfronto,
              y: pct2023,
              type: "bar",
              marker: { color: COLORS.primary },
              text: pct2023.map((v) => `${v}%`),
              textposition: "outside" as const,
            },
          ]}
          layout={{
            barmode: "group",
            yaxis: {
              title: { text: "% vittime che hanno denunciato" },
              range: [0, 100],
            },
            height: 350,
            legend: { orientation: "h" as const, y: -0.15 },
            margin: { t: 20, l: 50, r: 20, b: 50 },
            dragmode: false,
            plot_bgcolor: "white",
            paper_bgcolor: "white",
          }}
          config={PLOTLY_CONFIG}
          useResizeHandler
          className="w-full"
        />
      </ChartFullscreenWrapper>

      <p>
        Le aggressioni denunciate sono <strong>raddoppiate</strong> (+21 punti),
        probabilmente per maggiore fiducia nelle istituzioni e campagne di
        sensibilizzazione. Gli scippi denunciati sono invece{" "}
        <strong>calati</strong> (-21 punti), forse per rassegnazione su reati
        percepiti come a basso recupero.
      </p>

      <p className="text-xs text-muted-foreground">
        Fonti:{" "}
        <a
          href={URL_REATI_2023}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ISTAT Sicurezza dei Cittadini 2022-2023
        </a>
        ,{" "}
        <a
          href={URL_VIOLENZA_2025}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ISTAT Violenza contro le donne 2025
        </a>
        . I valori sono arrotondati. Violenza da partner e frodi/clonazione non
        hanno confronto storico diretto.
      </p>
    </div>
  );
}
