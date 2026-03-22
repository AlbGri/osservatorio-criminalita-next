import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Persone Denunciate",
  description:
    "Profilo demografico di autori e vittime di reato in Italia: nazionalit\u00e0, genere, et\u00e0. Dati ISTAT 2007-2024.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
