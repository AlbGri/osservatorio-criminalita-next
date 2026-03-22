import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analisi Territoriale",
  description:
    "Mappa interattiva e trend della criminalit\u00e0 per regione e provincia in Italia. Dati ISTAT 2014-2024.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
