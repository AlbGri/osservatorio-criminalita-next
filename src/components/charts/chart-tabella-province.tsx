"use client";

import { useState, useMemo, useCallback } from "react";
import { useFetchData } from "@/lib/use-fetch-data";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DelittiProvincia {
  REF_AREA: string;
  Territorio: string;
  Anno: number;
  Delitti: number;
  Regione: string;
  Popolazione: number;
  Tasso_per_1000: number;
}

interface Props {
  anno: number;
}

type SortKey = "Territorio" | "Regione" | "Tasso_per_1000" | "variazione" | "Delitti" | "Popolazione";
type SortDir = "asc" | "desc";

export function ChartTabellaProvince({ anno }: Props) {
  const { data, loading, error } = useFetchData<DelittiProvincia[]>(
    "/data/delitti_province.json"
  );
  const [regioneSelezionata, setRegioneSelezionata] = useState("Tutte le regioni");
  const [sortKey, setSortKey] = useState<SortKey>("Tasso_per_1000");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const regioni = useMemo(() => {
    if (!data) return [];
    const set = new Set(data.map((d) => d.Regione));
    return Array.from(set).sort();
  }, [data]);

  const handleSort = useCallback((key: SortKey) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return key;
      }
      setSortDir(key === "Territorio" || key === "Regione" ? "asc" : "desc");
      return key;
    });
  }, []);

  const righe = useMemo(() => {
    if (!data) return [];

    const dataAnno = data.filter((d) => d.Anno === anno);
    const data2014 = data.filter((d) => d.Anno === 2014);
    const mappa2014 = new Map(
      data2014.map((d) => [d.REF_AREA, d.Tasso_per_1000])
    );

    let filtrate = dataAnno;
    if (regioneSelezionata !== "Tutte le regioni") {
      filtrate = dataAnno.filter((d) => d.Regione === regioneSelezionata);
    }

    const mapped = filtrate.map((d) => {
      const tasso2014 = mappa2014.get(d.REF_AREA);
      const varNum =
        tasso2014 != null
          ? ((d.Tasso_per_1000 - tasso2014) / tasso2014) * 100
          : null;
      return { ...d, varNum, variazione: varNum != null ? varNum.toFixed(1) : "-" };
    });

    return mapped.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortKey) {
        case "Territorio":
          return dir * a.Territorio.localeCompare(b.Territorio);
        case "Regione":
          return dir * a.Regione.localeCompare(b.Regione);
        case "Tasso_per_1000":
          return dir * (a.Tasso_per_1000 - b.Tasso_per_1000);
        case "variazione":
          return dir * ((a.varNum ?? -Infinity) - (b.varNum ?? -Infinity));
        case "Delitti":
          return dir * (a.Delitti - b.Delitti);
        case "Popolazione":
          return dir * (a.Popolazione - b.Popolazione);
        default:
          return 0;
      }
    });
  }, [data, anno, regioneSelezionata, sortKey, sortDir]);

  if (loading) return <div className="h-64 animate-pulse bg-muted rounded" />;
  if (error) return <p className="text-destructive">Errore: {error}</p>;
  if (!data) return null;

  const handleDownloadCsv = () => {
    const header = ["Provincia", "Regione", `Tasso ${anno}`, "Var. vs 2014 (%)", `Delitti ${anno}`, "Popolazione"];
    const rows = righe.map((r) => [
      r.Territorio,
      r.Regione,
      r.Tasso_per_1000.toFixed(1),
      r.variazione !== "-" ? r.variazione : "",
      r.Delitti,
      r.Popolazione,
    ]);
    const csv = [header, ...rows].map((row) => row.join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `province_${anno}${regioneSelezionata !== "Tutte le regioni" ? "_" + regioneSelezionata.replace(/\s/g, "_") : ""}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return <span className="text-muted-foreground/40 ml-1">&#8693;</span>;
    return sortDir === "asc"
      ? <span className="ml-1">&#9650;</span>
      : <span className="ml-1">&#9660;</span>;
  };

  const thClass = "py-2 px-3 font-semibold cursor-pointer select-none hover:text-foreground transition-colors";

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription className="block">
          <strong>Dati provinciali: limiti importanti.</strong> Province con meno
          di 150.000 abitanti possono mostrare variabilita elevata anno su anno
          per effetto statistico (pochi eventi = alta variazione percentuale).
          Guardare trend pluriennali, non singoli anni.
        </AlertDescription>
      </Alert>

      <div className="flex items-end gap-4 flex-wrap">
        <div>
          <label
            htmlFor="regione-select"
            className="block text-sm font-medium mb-1"
          >
            Filtra per regione
          </label>
          <select
            id="regione-select"
            value={regioneSelezionata}
            onChange={(e) => setRegioneSelezionata(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-background"
          >
            <option>Tutte le regioni</option>
            {regioni.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleDownloadCsv}
          className="border rounded-md px-3 py-2 text-sm bg-background hover:bg-muted transition-colors"
        >
          Scarica CSV
        </button>
      </div>

      <div className="overflow-x-auto max-h-[250px] overflow-y-auto border rounded-lg">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b bg-muted sticky top-0">
              <th className={`text-left ${thClass}`} onClick={() => handleSort("Territorio")}>
                Provincia{sortIcon("Territorio")}
              </th>
              <th className={`text-left ${thClass}`} onClick={() => handleSort("Regione")}>
                Regione{sortIcon("Regione")}
              </th>
              <th className={`text-right ${thClass}`} onClick={() => handleSort("Tasso_per_1000")}>
                Tasso {anno}{sortIcon("Tasso_per_1000")}
              </th>
              <th className={`text-right ${thClass}`} onClick={() => handleSort("variazione")}>
                Var. vs 2014{sortIcon("variazione")}
              </th>
              <th className={`text-right ${thClass}`} onClick={() => handleSort("Delitti")}>
                Delitti {anno}{sortIcon("Delitti")}
              </th>
              <th className={`text-right ${thClass}`} onClick={() => handleSort("Popolazione")}>
                Popolazione{sortIcon("Popolazione")}
              </th>
            </tr>
          </thead>
          <tbody>
            {righe.map((r) => (
              <tr key={r.REF_AREA} className="border-b hover:bg-muted/30">
                <td className="py-2 px-3">{r.Territorio}</td>
                <td className="py-2 px-3 text-muted-foreground">{r.Regione}</td>
                <td className="py-2 px-3 text-right">
                  {r.Tasso_per_1000.toFixed(1)}
                </td>
                <td
                  className={`py-2 px-3 text-right ${
                    r.variazione !== "-" && parseFloat(r.variazione) < 0
                      ? "text-green-600"
                      : r.variazione !== "-" && parseFloat(r.variazione) > 0
                        ? "text-red-600"
                        : ""
                  }`}
                >
                  {r.variazione !== "-" ? `${r.variazione}%` : "-"}
                </td>
                <td className="py-2 px-3 text-right">
                  {r.Delitti.toLocaleString("it-IT")}
                </td>
                <td className="py-2 px-3 text-right">
                  {r.Popolazione.toLocaleString("it-IT")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
