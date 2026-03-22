import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ anno: string }>;
}): Promise<Metadata> {
  const { anno } = await params;
  return {
    title: `Criminalità in Italia ${anno}: i dati ISTAT`,
    description: `Report annuale sulla criminalità in Italia: cosa è cambiato nel ${anno}, variazioni per reato e territorio, confronto con gli anni precedenti. Dati ISTAT.`,
    openGraph: {
      title: `Criminalità in Italia ${anno}: i dati ISTAT`,
      description: `Report annuale sulla criminalità in Italia: variazioni ${anno} per reato e territorio. Dati ufficiali ISTAT.`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
