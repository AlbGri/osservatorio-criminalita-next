import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reati di Allarme Sociale",
  description:
    "Trend e analisi di omicidi, violenze sessuali, rapine in abitazione e altri reati gravi in Italia. Dati ISTAT.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
