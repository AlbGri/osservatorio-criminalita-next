"use client";

import { useFetchData } from "@/lib/use-fetch-data";
import { Card, CardContent } from "@/components/ui/card";

interface DelittiItalia {
  Anno: number;
  Delitti: number;
  Popolazione: number;
  Tasso_per_1000: number;
}

export function KpiSummary() {
  const { data, loading } = useFetchData<DelittiItalia[]>(
    "/data/delitti_italia.json"
  );

  if (loading)
    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[60px] sm:h-[72px] animate-pulse bg-muted rounded" />
        ))}
      </div>
    );
  if (!data || data.length === 0) return null;

  const primo = data[0];
  const ultimo = data[data.length - 1];
  const varTasso =
    primo.Tasso_per_1000 > 0
      ? ((ultimo.Tasso_per_1000 - primo.Tasso_per_1000) / primo.Tasso_per_1000) * 100
      : null;

  const items: { label: string; value: string; color?: string }[] = [
    {
      label: `Delitti denunciati ${ultimo.Anno}`,
      value: ultimo.Delitti.toLocaleString("it-IT"),
    },
    {
      label: `Tasso ${ultimo.Anno}`,
      value: `${ultimo.Tasso_per_1000.toFixed(1)} per 1000 ab.`,
    },
    ...(varTasso !== null
      ? [
          {
            label: `Variazione ${primo.Anno}-${ultimo.Anno}`,
            value: `${varTasso > 0 ? "+" : ""}${varTasso.toFixed(1)}%`,
            color: varTasso < 0 ? "text-green-600" : "text-red-600",
          },
        ]
      : []),
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="py-0 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
            <p className={`text-xl sm:text-2xl font-bold ${item.color ?? ""}`}>{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
