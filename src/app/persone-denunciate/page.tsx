"use client";

import { useState } from "react";
import { KpiAutoriVittime } from "@/components/charts/kpi-autori-vittime";
import { ChartAutoriTrend } from "@/components/charts/chart-autori-trend";
import { ChartAutoriStranieriReato } from "@/components/charts/chart-autori-stranieri-reato";
import { ChartAutoriMinoriReato } from "@/components/charts/chart-autori-minori-reato";
import { ChartAutoriRankingProvince } from "@/components/charts/chart-autori-ranking-province";
import { ChartAutoriTabellaProvince } from "@/components/charts/chart-autori-tabella-province";
import { Alert, AlertDescription } from "@/components/ui/alert";

type DataType = "OFFEND" | "VICTIM";

const DATA_TYPE_LABELS: Record<DataType, string> = {
  OFFEND: "Autori",
  VICTIM: "Vittime",
};

export default function PersoneDenunciate() {
  const [dataType, setDataType] = useState<DataType>("OFFEND");

  return (
    <main className="mx-auto max-w-7xl px-4 py-4 sm:py-8 space-y-6 sm:space-y-10">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold">
          Persone Denunciate
        </h1>
        <p className="mt-2 text-muted-foreground">
          Autori denunciati/arrestati e vittime di delitto per cittadinanza,
          et&agrave; e tipo di reato. Tutti i dati provengono dall&apos;indagine
          ISTAT su autori e vittime di delitto (2007-2022).
        </p>
        <div className="mt-4 flex gap-2">
          {(["OFFEND", "VICTIM"] as DataType[]).map((dt) => (
            <button
              key={dt}
              onClick={() => setDataType(dt)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                dataType === dt
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {DATA_TYPE_LABELS[dt]}
            </button>
          ))}
        </div>
      </div>

      <KpiAutoriVittime dataType={dataType} />

      <hr />

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary">
          Stranieri per Tipo di Reato: {dataType === "OFFEND" ? "Autori" : "Vittime"} (2022)
        </h2>
        <Alert>
          <AlertDescription className="block">
            <strong>Nota:</strong> la quota di stranieri tra gli {dataType === "OFFEND" ? "autori denunciati" : "le vittime"} varia
            molto in base al tipo di reato. I dati si riferiscono a persone denunciate/arrestate,
            non a condanne definitive.
          </AlertDescription>
        </Alert>
        <ChartAutoriStranieriReato dataType={dataType} />
      </section>

      <hr />

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary">
          Minori per Tipo di Reato: {dataType === "OFFEND" ? "Autori" : "Vittime"} (2022)
        </h2>
        <ChartAutoriMinoriReato dataType={dataType} />
      </section>

      <hr />

      {dataType === "OFFEND" && (
        <>
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary">
              Trend Nazionale (2007-2022)
            </h2>
            <Alert>
              <AlertDescription className="block">
                <strong>Nota:</strong> la serie si ferma al 2022 perch&eacute; il dato
                aggregato (totale autori per tutti i reati) non &egrave; ancora disponibile
                per gli anni successivi. Dal 2023 ISTAT pubblica solo i singoli tipi di reato.
              </AlertDescription>
            </Alert>
            <ChartAutoriTrend />
          </section>

          <hr />
        </>
      )}

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary">
          Ranking Province: {dataType === "OFFEND" ? "Autori" : "Vittime"} (2022)
        </h2>
        <ChartAutoriRankingProvince dataType={dataType} />
      </section>

      <hr />

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary">
          Dati Provinciali: {dataType === "OFFEND" ? "Autori" : "Vittime"} (2022)
        </h2>
        <ChartAutoriTabellaProvince dataType={dataType} />
      </section>

      <hr />

      <Alert>
        <AlertDescription className="block">
          <strong>Nota metodologica:</strong> i dati riguardano persone denunciate o
          arrestate dalle forze dell&apos;ordine, non condannate. Una stessa persona
          pu&ograve; comparire pi&ugrave; volte se coinvolta in pi&ugrave; procedimenti.
          Il dato provinciale &egrave; disponibile solo dal 2022.
          Per approfondimenti si rimanda alla{" "}
          <a href="/metodologia" className="underline">nota metodologica</a>.
        </AlertDescription>
      </Alert>
    </main>
  );
}
