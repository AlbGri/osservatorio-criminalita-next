export default function Limitazioni() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-4 sm:py-8 space-y-8">
      <h1 className="text-2xl sm:text-4xl font-bold">
        Limitazioni e Trasparenza
      </h1>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Cosa questo progetto NON puo dire
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Se un territorio e sicuro o pericoloso</strong>: i dati
            provinciali sono troppo aggregati e il numero oscuro varia
            localmente
          </li>
          <li>
            <strong>
              Se specifici gruppi demografici sono piu criminali
            </strong>
            : i dati non disaggregano per autore e esistono bias di
            registrazione
          </li>
          <li>
            <strong>Previsioni future</strong>: non viene applicata nessuna
            modellazione predittiva
          </li>
          <li>
            <strong>La criminalita reale totale</strong>: solo quella registrata
            tramite denunce
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Bias noti e non correggibili
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Under-reporting sistematico</strong> su alcuni reati
            (violenze di genere, domestiche)
          </li>
          <li>
            <strong>Over-reporting</strong> su altri (furti auto per necessita
            assicurativa)
          </li>
          <li>
            <strong>Variabilita territoriale</strong> nella propensione alla
            denuncia: il Nord denuncia mediamente il 15-20% in piu del Sud
            (fonte: ISTAT Vittimizzazione)
          </li>
          <li>
            <strong>Effetto copertura mediatica</strong>: un caso mediatico puo
            provocare un picco temporaneo nelle denunce di reati simili
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Compromessi di design
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Livello minimo: provincia</strong> - sacrifica utilita locale
            per evitare stigmatizzazione di aree specifiche
          </li>
          <li>
            <strong>No dati anteriori al 2014</strong> - per qualita e
            comparabilita dubbia delle serie precedenti
          </li>
          <li>
            <strong>No dati real-time</strong> - ISTAT ha un ritardo fisiologico
            di 12-18 mesi nella pubblicazione
          </li>
          <li>
            <strong>Solo denunce</strong> - l&apos;Italia non pubblica dati su
            vittimizzazione, esiti processuali o dati sanitari aggregati (vedi
            Metodologia per dettagli)
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Segnalazione errori
        </h2>
        <p>
          Se trovi errori nei dati, nei calcoli o nella comunicazione, segnalali
          aprendo una{" "}
          <a
            href="https://github.com/AlbGri/osservatorio-criminalita-next/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            issue su GitHub
          </a>
          .
        </p>
        <p>Ogni segnalazione viene presa seriamente e valutata.</p>
      </section>
    </main>
  );
}
