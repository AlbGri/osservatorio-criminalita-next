import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metodologia",
  description:
    "Fonti dati ISTAT, metodi di analisi statistica e limitazioni dell\u0027Osservatorio Criminalit\u00e0.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
