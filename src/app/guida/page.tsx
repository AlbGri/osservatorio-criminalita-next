export default function Guida() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-4 sm:py-8 space-y-8">
      <h1 className="text-2xl sm:text-4xl font-bold">
        Come Leggere Questi Grafici
      </h1>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Cosa significa &quot;per 1.000 abitanti&quot;
        </h2>
        <p>
          Se leggi <strong>45 delitti per 1.000 abitanti</strong>, significa: in
          una citta di 100.000 persone, ci sono stati circa 4.500 delitti
          denunciati in un anno.
        </p>
        <p>
          <strong>Non</strong> significa che il 4,5% della popolazione ha subito
          un reato: alcuni ne subiscono piu di uno, molti zero.
        </p>
        <p>
          Per i reati rari (omicidi, violenze sessuali) si usa il{" "}
          <strong>tasso per 100.000 abitanti</strong> per avere numeri
          leggibili.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Come interpretare i trend
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Pendenza della linea</strong>: indica la velocita del
            cambiamento
          </li>
          <li>
            <strong>Confrontare sempre periodi lunghi</strong> (5-10 anni), non
            anno su anno
          </li>
          <li>
            <strong>Attenzione agli outlier</strong>: il periodo COVID
            (2020-2021) ha alterato tutti i dati per effetto dei lockdown, non
            per cambiamenti reali nella criminalita
          </li>
          <li>
            <strong>Un singolo anno anomalo non fa un trend</strong>: servono
            almeno 3-4 anni nella stessa direzione per parlare di tendenza
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Cosa NON si puo concludere dai grafici
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>
              &quot;Il territorio X e piu sicuro di Y&quot;
            </strong>
            : la propensione alla denuncia varia tra territori. Il Nord denuncia
            mediamente di piu del Sud (fonte: ISTAT Vittimizzazione)
          </li>
          <li>
            <strong>
              &quot;La criminalita e colpa del gruppo Z&quot;
            </strong>
            : i dati non mostrano autori, solo denunce. Nessuna inferenza su
            gruppi demografici e possibile
          </li>
          <li>
            <strong>&quot;Non devo preoccuparmi&quot;</strong>: la percezione di
            rischio e legittima e personale. Questi dati mostrano un quadro
            aggregato, non la realta del singolo quartiere
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Domande comuni</h2>

        <div className="space-y-2">
          <h3 className="font-semibold">
            Perche alcuni reati aumentano ma il totale cala?
          </h3>
          <p>
            La composizione cambia. Esempio: se i furti calano del 20% ma le
            truffe aumentano del 50%, e i furti erano l&apos;80% del totale
            mentre le truffe il 5%, il totale puo comunque calare. E il peso
            relativo delle categorie che conta.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">
            Posso usare questi dati per decidere dove vivere?
          </h3>
          <p>
            Con estrema cautela. I dati provinciali mascherano una variabilita
            interna enorme: la provincia di Milano include sia zone centrali
            dense sia comuni rurali con realta completamente diverse.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">
            Perche le denunce per violenza sessuale aumentano?
          </h3>
          <p>
            L&apos;aumento delle denunce riflette principalmente l&apos;effetto
            di campagne di sensibilizzazione (es. #MeToo) e maggiore fiducia
            nelle autorita. Non indica necessariamente un aumento delle violenze
            reali. E un risultato <strong>positivo</strong>: il numero oscuro si
            sta riducendo.
          </p>
        </div>
      </section>
    </main>
  );
}
