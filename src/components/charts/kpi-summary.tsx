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
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-[60px] sm:h-[72px] animate-pulse bg-muted rounded" />
        ))}
      </div>
    );
  if (!data || data.length === 0) return null;

  const ultimo = data[data.length - 1];

  const items = [
    {
      label: `Delitti denunciati ${ultimo.Anno}`,
      value: ultimo.Delitti.toLocaleString("it-IT"),
    },
    {
      label: `Tasso ${ultimo.Anno}`,
      value: `${ultimo.Tasso_per_1000.toFixed(1)} per 1000 ab.`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="py-0 text-center">
            <p className="text-sm sm:text-sm text-muted-foreground">{item.label}</p>
            <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
