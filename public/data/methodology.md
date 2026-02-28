# Metodologia

## Fonti dei dati

I dati provengono dal portale ufficiale ISTAT (dati.istat.it), sezione "Giustizia e sicurezza":

1. **Delitti denunciati dalle forze di polizia all'autorità giudiziaria** (periodo 2014-2023)
   - 56 tipologie di reato dettagliate
   - Dato nazionale aggregato per anno
   
2. **Percezione di sicurezza delle famiglie** - Indagine Multiscopo ISTAT (2014-2023)
   - Indicatore: "Famiglie per presenza di alcuni problemi nella zona in cui abitano: rischio di criminalità: molto e abbastanza"
   - Espresso in percentuale di famiglie che percepiscono rischio

3. **Popolazione residente** - ISTAT
   - Ricostruzione intercensuaria 2002-2019
   - POSAS (Popolazione residente al 1° gennaio) 2020-2023

## Cosa rappresentano i dati

### Denunce vs Crimini

I numeri mostrati rappresentano le **denunce** registrate dalle forze di polizia (Polizia di Stato, Carabinieri, Guardia di Finanza, ecc.) e trasmesse all'autorità giudiziaria. Una denuncia viene registrata quando:

- Una persona si presenta per denunciare un reato
- Le forze dell'ordine rilevano direttamente un reato (es. durante controlli)
- Emerge un reato da indagini in corso

### Percezione di sicurezza

Il dato sulla percezione proviene da indagine campionaria ISTAT Multiscopo su famiglie italiane. Misura la **percezione soggettiva** di insicurezza nella zona di residenza, non l'esperienza diretta di vittimizzazione. La serie potrebbe risentire di variazioni metodologiche tra edizioni dell'indagine (es. il salto 30.0% → 41.1% tra 2014 e 2015 potrebbe riflettere un cambiamento nel questionario).

## Cosa NON rappresentano

I dati NON mostrano:

- **Crimini realmente commessi**: molti reati non vengono denunciati (es. furti minori, violenze domestiche). Il tasso di denuncia varia per tipo di reato.
- **Crimini accertati**: una denuncia non implica che il reato sia confermato o che ci sia un colpevole.
- **Condanne**: il dato è indipendente dall'esito processuale.
- **Sicurezza oggettiva**: la percezione di insicurezza risponde a fattori molteplici (copertura mediatica, degrado urbano, fiducia istituzionale) non sempre correlati con i dati registrati.

## Limiti metodologici

### Numero oscuro

La differenza tra reati commessi e reati denunciati (il "numero oscuro") varia significativamente per tipo di reato. Dati dall'[Indagine ISTAT sulla Sicurezza dei Cittadini 2022-2023](https://www.istat.it/comunicato-stampa/reati-contro-la-persona-e-contro-la-proprieta-vittime-ed-eventi-2022-2023/) e dal [Report ISTAT Reati contro la persona e la proprietà 2025](https://www.istat.it/wp-content/uploads/2025/06/Report_REATI-CONTRO-LA-PERSONA-E-LA-PROPRIETA_VITTIME-ED-EVENTI.pdf):

- **Furti auto/moto**: ~95% denunciati (necessità assicurativa; stabile tra le due edizioni)
- **Scippi**: 68.2% denunciati (era 88.9% nel 2015-2016: calo per rassegnazione)
- **Aggressioni**: 40.6% denunciate (era 19.9% nel 2015-2016: forte miglioramento)
- **Frodi/truffe**: 24.1% denunciate (era 18.4% nel 2015-2016: lieve aumento, legato a crescita truffe bancarie online)
- **Violenza da partner**: ~11% denunciata ([ISTAT Violenza donne 2025](https://www.istat.it/comunicato-stampa/la-violenza-contro-le-donne-dentro-e-fuori-la-famiglia-primi-risultati-anno-2025/))

Il numero oscuro varia nel tempo: un aumento delle denunce può indicare maggiore propensione a denunciare (positivo), non necessariamente più reati. Il raddoppio delle denunce per aggressioni tra 2015-2016 e 2022-2023 ne è un esempio. Le due edizioni dell'indagine comparabili sono l'[Indagine 2015-2016](https://www.istat.it/it/files/2019/02/Reati-contro-la-persona-e-contro-la-proprieta.pdf) e quella 2022-2023.

### Propensione alla denuncia per territorio

L'Indagine ISTAT sulla Sicurezza dei Cittadini 2022-2023 ([Tavola 6](https://www.istat.it/comunicato-stampa/reati-contro-la-persona-e-contro-la-proprieta-vittime-ed-eventi-2022-2023/)) disaggrega la propensione alla denuncia per macroarea geografica e tipo di reato. I dati sfatano il luogo comune "il Sud denuncia meno":

- **Reati contro la proprietà individuale**: Sud 52.6%, Nord-ovest 45.5%, Centro 44.6%, Nord-est 34.0%, Isole 34.6% (media Italia: 44.7%)
- **Reati violenti**: Centro 65.2%, Sud 58.6%, Nord-ovest 37.3%, Isole 13.0\*, Nord-est 10.4\* (media Italia: 41.6%)
- **Reati contro l'abitazione**: Nord-est 67.3%, Nord-ovest 59.7%, Sud 48.1%, Centro 48.8%, Isole 33.9% (media Italia: 55.3%)
- **Reati contro i veicoli**: Sud 50.6%, Isole 43.4%, Centro 43.2%, Nord-ovest 40.1%, Nord-est 31.8% (media Italia: 41.3%)

\* Errore campionario >35% (dato poco affidabile).

Il confronto con l'edizione 2015-2016 ([Prospetto 6, report ISTAT 1 febbraio 2019](https://www.istat.it/it/files/2019/02/Reati-contro-la-persona-e-contro-la-proprieta.pdf)) mostra cambiamenti drammatici, soprattutto per i reati violenti: le aggressioni denunciate al Sud passano da 9.2% a 55.3% (+46 punti), al Centro da 17.0% a 69.0% (+52 punti). Le rapine denunciate al Sud passano da 40.0% a 74.7% (+35 punti). Al contrario, gli scippi denunciati calano drasticamente al Nord-ovest (da 71.7% a 33.9%) e al Nord-est (da 64.4% a 39.2%).

### Cambiamenti normativi

Nuove leggi possono modificare:
- Cosa costituisce reato (es. reati informatici emersi con digitalizzazione)
- Modalità di registrazione (es. GDPR 2018 limita pubblicazione dati disaggregati)
- Pene (es. depenalizzazioni modificano classificazione)

**Caso rilevante nei dati:** il D.Lgs. 7/2016 (in vigore dal 6 febbraio 2016) ha depenalizzato le ingiurie, trasformandole da reato penale a illecito civile. Questo spiega il calo del -23% nella categoria "Violenze contro la persona" tra 2015 e 2016: circa 50.000-60.000 denunce/anno per ingiurie sono uscite dalle statistiche penali. Non si tratta di un calo reale della violenza.

### Propensione a denunciare

La propensione a denunciare varia per:
- **Fattori culturali**: stigma sociale (es. violenze sessuali)
- **Fiducia nelle istituzioni**: campagne sensibilizzazione aumentano denunce
- **Gravità del reato**: crimini gravi più probabilmente denunciati
- **Utilità pratica**: denunce per assicurazione vs rassegnazione per piccoli furti

**Esempio critico**: l'aumento delle denunce per violenze sessuali (+46.4% in numeri assoluti dal 2014 al 2023, da 4.257 a 6.231) riflette principalmente l'effetto di campagne come #MeToo e maggiore fiducia nelle autorità, NON necessariamente un aumento delle violenze reali. Questo è un risultato positivo: il numero oscuro si sta riducendo.

### Anno di riferimento

È l'anno della denuncia, non necessariamente dell'evento criminoso. Reati scoperti anni dopo (es. truffe complesse) vengono registrati nell'anno della denuncia.

### Periodo COVID nei grafici

Nei grafici temporali è evidenziata la finestra COVID (indicativamente 2020-2021). Il calo dei reati nel 2020 (-17% circa) è in larga parte dovuto ai lockdown e alle restrizioni di movimento, non a un miglioramento strutturale della sicurezza. I dati sono annuali, quindi l'evidenziazione è approssimativa.

## Normalizzazione per popolazione

Tutti i tassi sono calcolati per abitanti per permettere confronti temporali corretti:

- **Tasso per 1000 abitanti**: usato per categorie frequenti (furti, totale delitti)
- **Tasso per 100.000 abitanti**: usato per reati rari (omicidi, violenze sessuali)

Formula: `Tasso = (Numero delitti / Popolazione) × 1000 (o 100.000)`

La normalizzazione è essenziale perché la popolazione italiana è diminuita da 60.3 milioni (2014) a 59.0 milioni (2023).

## Categorie di reato

### Aggregazione in macro-categorie

I 56 tipi di delitto ISTAT sono stati aggregati in 6 macro-categorie per leggibilità. **Le macro-categorie non sono mutuamente esclusive**: uno stesso reato può rientrare in più categorie (es. una rapina con violenza può figurare sia in "Rapine" che in "Violenze contro la persona"). La somma delle categorie supera pertanto il totale nazionale del 25-35%.

1. **Furti**: tutti i furti (con strappo, destrezza, abitazioni, auto, moto, esercizi commerciali, ecc.)
2. **Rapine**: rapine in abitazione, banca, uffici postali, esercizi commerciali, pubblica via
3. **Violenze contro la persona**: omicidi (tutti i tipi), tentati omicidi, percosse, lesioni, minacce, sequestri, ingiurie, violenze sessuali, atti con minori, sfruttamento prostituzione
4. **Truffe e Frodi**: truffe informatiche, delitti informatici, contraffazione marchi, violazione proprietà intellettuale
5. **Droga**: normativa stupefacenti
6. **Altro**: danneggiamenti, incendi, criminalità organizzata (mafia, riciclaggio, usura, estorsioni), ricettazione, contrabbando

### Reati ad alto allarme sociale

Per il focus su reati mediatici, sono stati selezionati 6 tipi specifici (non aggregati):

- Omicidi volontari consumati
- Tentati omicidi
- Violenze sessuali
- Atti sessuali con minorenne
- Rapine in abitazione
- Sequestri di persona

Questi reati rappresentano <2% dei delitti totali ma dominano percezione pubblica e copertura mediatica.

## Indicatore di sicurezza percepita vs oggettiva

I delitti denunciati sono più un indicatore dell'**attività delle forze dell'ordine** e della **propensione a denunciare** che della criminalità effettiva. Un aumento delle denunce può riflettere:

- Maggiore efficienza nel rilevare reati
- Maggiore fiducia dei cittadini
- Reale aumento della criminalità

Non è possibile distinguere tra queste cause senza analisi aggiuntive.

Il **divario tra percezione e dati registrati** è documentato e normale. La percezione di insicurezza risponde a:

- Copertura mediatica (focus su crimini violenti anche se rari)
- Degrado urbano visibile (indipendente da crimini denunciati)
- Sfiducia istituzionale generale
- Esperienza personale o di conoscenti
- Narrazioni politiche

Questi fattori sono legittimi e non rendono la percezione "sbagliata". Il progetto mira a visualizzare questa differenza senza giudizi di valore.

## Limiti strutturali: cosa l'Italia potrebbe misurare ma non fa

Questo progetto è limitato ai dati delle denunce non per scelta metodologica, ma perché l'Italia non pubblica dati che altri paesi rendono disponibili.

### Cosa pubblicano UK, USA, Germania (e Italia no)

**Regno Unito:**
- Crime Survey for England and Wales (CSEW): indagine vittimizzazione annuale su ~35.000 famiglie
- Dati pubblicati entro 6 mesi, disaggregati per tipologia e territorio
- Stima numero oscuro per ogni categoria di reato

**Stati Uniti:**
- National Crime Victimization Survey (NCVS): ~160.000 persone intervistate annualmente dal 1973
- Pubblicazione trimestrale, dati aperti e linkabili
- Database FBI integrato con esiti processuali

**Germania:**
- Dunkelfeldforschung (ricerche numero oscuro) periodiche su scala nazionale
- Dati sanitari aggregati su violenze (Polizeiliche Kriminalstatistik + dati ospedalieri)
- Confronto diretto denunce vs vittimizzazioni

### Cosa l'Italia non pubblica (ma potrebbe)

1. **Indagini vittimizzazione annuali**
   - ISTAT le fa ogni 5-7 anni (ultima 2022-2023, precedente 2015-2016)
   - Campione più piccolo (~29.000 individui vs 35k famiglie UK)
   - Non sempre pubblicati dati disaggregati per anno e territorio

2. **Dati sanitari aggregati**
   - Accessi Pronto Soccorso per violenze esistono ma NON sono pubblici
   - Database decessi (ReNCaM) esiste con cause dettagliate
   - Database violenze ospedaliere? No
   - Motivazione ufficiale: privacy/GDPR
   - Realtà: dati aggregati per regione/anno non violano privacy. È scelta politica.

3. **Esiti processuali linkabili**
   - Ministero Giustizia pubblica statistiche ma:
     - Con 3-5 anni di ritardo
     - Non linkabili a dataset ISTAT (chiavi diverse)
     - Formato non standard, difficile analisi temporale

4. **Database integrato Interno-Giustizia-Sanità**
   - Tecnicamente possibile (abbiamo anagrafe tributaria, sanitaria unificata)
   - Nessun progetto in corso per integrazione dati criminalità

### Perché l'Italia non li pubblica

**Non sono limiti tecnici.** L'Italia ha:
- Database nazionale decessi con cause (ReNCaM)
- Tessera sanitaria con accessi PS tracciati
- Sistema informatico Ministero Interno per denunce
- Sistema SICP Ministero Giustizia per processi

**Sono scelte politiche:**

1. **Accountability**: dati reali = governi valutabili su risultati
   - Esempio: se ISTAT pubblicasse "500.000 violenze domestiche/anno" vs "6.000 denunce", pressione su servizi sociali, centri antiviolenza, fondi
   - Più facile non misurare che dover agire

2. **Inerzia burocratica**: ogni ministero protegge proprio territorio
   - Interno: denunce
   - Giustizia: processi
   - Salute: PS
   - Zero coordinamento, zero incentivi a condividere

3. **Costo politico percepito**: nessun governo vuole titoli
   - "Italia: 500k violenze/anno, solo 6k denunciate"
   - "Numero oscuro criminalità 400% più alto di UK"
   - Preferiscono parlare di "aumento denunce" (spin positivo: fiducia cittadini)

4. **Assenza pressione pubblica**: cittadini/media non chiedono questi dati
   - Campagne su sicurezza basate su percezione, non evidenze
   - Dibattito politico su "emergenza criminalità" usa aneddoti, non statistiche comparative

### Conseguenze dell'opacità

- **Politiche inefficaci**: allocazione risorse su percezione (es. più polizia in centro) invece che su dati (es. violenze domestiche periferie)
- **Dibattito distorto**: media/politici parlano di "aumento criminalità" citando denunce (dato quasi inutile per crimini con numero oscuro alto)
- **Non comparabilità internazionale**: impossibile valutare performance Italia vs paesi trasparenti
- **Mancanza accountability**: nessuno può misurare efficacia politiche sicurezza senza dati pre/post

### Costi pubblicazione dati (risibili)

UK CSEW: ~£10 milioni/anno (£0.15 per abitante)
- Interviste, elaborazione, pubblicazione aperta
- ROI: politiche basate su evidenze, non percezione

Italia equivalente: ~€9 milioni/anno
- 0.01% budget Ministero Interno (€11 miliardi)
- Costo: 1 caffè/anno per cittadino

**Non è problema di soldi. È problema di volontà politica.**

### Cosa si potrebbe fare

**Minimo (costo quasi zero):**
1. ISTAT indagine vittimizzazione annuale (non ogni 5 anni)
2. Pubblicare dati PS violenze aggregati per regione/anno (già raccolti)
3. Ministero Giustizia: esiti denunce linkabili con dati ISTAT

**Ottimale (costo 10-15 milioni/anno):**
1. Database integrato Interno-Giustizia-Sanità
2. Indagine vittimizzazione su campione UK-size (50k famiglie)
3. Dashboard pubblico con confronti internazionali
4. Audit annuale indipendente qualità dati

**Confronto UK:**
- 1973: inizia NCVS (USA)
- 1982: inizia CSEW (UK)
- 2024: Italia ancora dipendente solo da denunce

**Ritardo: 40+ anni.**

## Confronti territoriali (Fase 2)

### Dati regionali e provinciali

I dati territoriali provengono dallo stesso dataset ISTAT dei delitti nazionali, filtrati per codice NUTS regionale e provinciale. La popolazione per la normalizzazione proviene da due fonti ISTAT complementari:

- **2014-2018**: demo.istat.it (Ricostruzione intercensuaria)
- **2019-2023**: esploradati.istat.it (Popolazione residente al 1° gennaio)

Trentino-Alto Adige: nel dataset ISTAT i delitti sono separati in Bolzano (ITD1) e Trento (ITD2). Vengono sommati in ITD12 per il confronto con il GeoJSON regionale (openpolis).

**Codici NUTS**: i dati utilizzano la classificazione NUTS pre-2021 (es. ITD3 per Veneto, ITD5 per Emilia-Romagna), coerente con la distribuzione ISTAT dei dati. Dal 2021 i codici ufficiali sono cambiati (ITH3, ITH5).

**Residuo nazionale**: la somma dei delitti regionali differisce dal totale nazionale di circa 50 unità/anno, presumibilmente per reati non attribuibili a una regione specifica (es. acque internazionali).

### Cautele nell'interpretazione

I confronti territoriali richiedono estrema cautela per diversi motivi:

1. **Propensione alla denuncia**: la propensione a denunciare varia significativamente per tipo di reato e territorio. L'Indagine ISTAT 2022-2023 mostra che il Sud denuncia più della media nazionale per reati contro la proprietà (52.6% vs 44.7%) e per reati violenti (58.6% vs 41.6%), mentre Nord-est e Isole denunciano meno (vedi sezione "Propensione alla denuncia per territorio"). Un tasso più alto non significa necessariamente più criminalità reale.

2. **Effetto turismo e pendolarismo**: regioni con alta presenza turistica (es. Lazio, Toscana) o forte pendolarismo mostrano tassi elevati perché il denominatore (popolazione residente) sottostima le persone effettivamente presenti.

3. **Province piccole**: province con meno di 150.000 abitanti possono mostrare variabilità elevata anno su anno per effetto statistico (pochi eventi = alta variazione percentuale). Guardare trend pluriennali, non singoli anni.

4. **Composizione reati**: territori diversi hanno mix diversi di reati. Il tasso totale maschera queste differenze qualitative.

### Confini geografici

I confini regionali provengono dal dataset [openpolis/geojson-italy](https://github.com/openpolis/geojson-italy) (limiti amministrativi ISTAT). La chiave di join è `reg_istat_code_num` (codice numerico regione).

## Trasparenza

Questo progetto non afferma di mostrare "la criminalità in Italia", ma solo i dati ufficiali sulle denunce e sulla percezione, con piena consapevolezza dei limiti. L'obiettivo è facilitare la comprensione del divario tra percezione pubblica e dati registrati, non di dimostrare una tesi precostituita.

**Questo progetto mostra cosa è possibile vedere con i dati disponibili. L'assenza di dati migliori non è limite statistico: è responsabilità istituzionale.**

Tutti i dati raw, script di elaborazione e codice sorgente della dashboard sono disponibili pubblicamente su GitHub: https://github.com/AlbGri/osservatorio-criminalita-next