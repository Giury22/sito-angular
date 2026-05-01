import { Injectable, signal, computed } from '@angular/core';

// Tipo per le lingue supportate
export type Lang = 'it' | 'en';

// Dizionario completo delle traduzioni
const TRANSLATIONS = {
  it: {
    // NAVBAR
    nav: {
      home: 'Home',
      collezione: 'Collezione',
      biglietti: 'Biglietti',
      contatti: 'Contatti',
    },
    // SELETTORE LINGUA
    langSelect: 'Lingua',
    // HOME
    home: {
      eyebrow: 'Benvenuto',
      hero: 'Il mito della Vespa, tutto in un posto.',
      description:
        "Nato dalla passione di un ex meccanico romano che negli anni '90 iniziò a restaurare Vespe abbandonate, il Museo della Vespa di Roma apre i battenti nel 2008 in un ex edificio industriale riconvertito. Oggi raccoglie modelli storici dagli anni '40 fino ai giorni nostri: ogni Vespa racconta un'epoca, dal dopoguerra al boom economico, fino agli anni della Dolce Vita. Un'icona di stile, libertà e cultura italiana, visitata da appassionati di tutto il mondo.",
      gridLabel: 'Sezioni principali del sito',
      cardCollezione: 'Collezione',
      cardCollezioneDesc:
        "Esplora oltre duecento esemplari originali, dai modelli classici degli anni '50 alle serie speciali piu rare, con schede storiche e curiosita su ogni modello.",
      cardBiglietti: 'Biglietti',
      cardBigliettiDesc:
        'Acquista il tuo biglietto online e accedi al museo senza attese. Tariffe ridotte disponibili.',
      cardContatti: 'Contatti',
      cardContattiDesc:
        'Per informazioni, prenotazioni di gruppo e richieste speciali, scrivici o chiamaci direttamente.',
      audioBtn: 'Traccia audio',
      bookBtn: 'Prenota la tua visita',
      bannerLabel: 'Mostra in corso',
      bannerTitle: "Vespa d'inverno — edizione 2026",
      bannerDesc:
        'Una selezione esclusiva di modelli invernali e prototipi rari. Dal 1 novembre 2026 al 28 febbraio 2027.',
      bannerCta: 'Scopri la mostra',
      stat1Value: '200+',
      stat1Label: 'Modelli esposti',
      stat2Value: '15.000',
      stat2Label: "Visitatori l'anno",
      stat3Value: '2008',
      stat3Label: 'Anno di apertura',
    },
    // COLLEZIONE
    collezione: {
      title: 'La nostra collezione',
      videoTitle: 'Il museo in video',
      searchPlaceholder: 'Cerca un modello…',
      moreInfo: 'Più info',
      lessInfo: 'Meno info',
      wikiLink: 'Tutte le info ↗',
      noResults: 'Nessun modello trovato.',
    },
    // BIGLIETTI
    biglietti: {
      title: 'Biglietti e prenotazioni',
      description:
        "Acquista il tuo biglietto online e salta la coda all'ingresso. Il biglietto comprende l'accesso alla collezione permanente e alle mostre temporanee in corso.",
      tableCaption: 'Tipologie di biglietti disponibili',
      tableColTipo: 'Tipo',
      tableColDesc: 'Descrizione',
      tableColPrezzo: 'Prezzo',
      interoTitle: 'Intero',
      interoDesc:
        'Ingresso al museo con accesso alla collezione permanente e alle mostre temporanee.',
      interoPrice: '€ 12,00',
      ridottoTitle: 'Ridotto',
      ridottoDesc:
        'Tariffa agevolata per studenti, under 18, over 65 e possessori di carta disabilita.',
      ridottoPrice: '€ 7,00',
      gratuito: 'Gratuito',
      gratuitoDesc: 'Bambini sotto i 6 anni e disabili con accompagnatore.',
      gratuitoPrice: '€ 0,00',
      formTitle: 'Prenota la tua visita',
      labelData: 'Data della visita',
      labelOrario: 'Fascia oraria',
      orario1: '10:00 – 12:00',
      orario2: '12:00 – 14:00',
      orario3: '14:00 – 16:00',
      orario4: '16:00 – 18:00',
      labelTipi: 'Tipo di biglietto e quantità',
      labelQtaIntero: 'N° biglietti interi',
      labelQtaRidotto: 'N° biglietti ridotti',
      labelQtaGratuito: 'N° ingressi gratuiti',
      btnPrenota: 'Conferma prenotazione',
      toastTitolo: 'Prenotazione confermata!',
      toastMsg: 'Riceverai una email di riepilogo a breve.',
      toastChiudi: 'Chiudi',
      erroreData: 'Seleziona una data.',
      erroreOrario: 'Seleziona una fascia oraria.',
      erroreQta: 'Seleziona almeno un biglietto.',
      // CALENDARIO DISPONIBILITÀ
      calTitolo: 'Disponibilità',
      calChiuso: 'Chiuso',
      calEsaurito: 'Esaurito',
      calPosti: 'posti',
      calLegOk: 'Disponibile',
      calLegQuasi: 'Ultimi posti',
      calLegEsaurito: 'Esaurito',
      calLegChiuso: 'Chiuso',
      nessunaData: 'Nessuna data selezionata',
      avvisoChiuso: 'Il museo è chiuso il lunedì. Scegli un altro giorno.',
      avvisoEsaurito: "Posti esauriti per questa data. Scegline un'altra dal calendario.",
    },
    // CONTATTI
    contatti: {
      title: 'Contatti',
      description:
        'Per informazioni sugli orari di apertura, le mostre in corso o le prenotazioni per gruppi e scuole, non esitare a contattarci.',
      email: 'Email',
      telefono: 'Telefono',
      indirizzo: 'Indirizzo',
    },
    // FOOTER
    footer: {
      tagline: 'Il mito della Vespa, tutto in un posto.',
      navTitle: 'Navigazione',
      infoTitle: 'Info pratiche',
      hoursTitle: 'Orari',
      contactTitle: 'Contattaci',
      hours: 'Mar–Dom: 10:00 – 18:00',
      address: 'Via Appia Nuova 42, Roma',
      phone: '+39 06 1234567',
      email: 'info@museodellavespa.it',
      copyright: '© 2026 Museo della Vespa. Tutti i diritti riservati.',
    },
  },

  en: {
    // NAVBAR
    nav: {
      home: 'Home',
      collezione: 'Collection',
      biglietti: 'Tickets',
      contatti: 'Contact',
    },
    // SELETTORE LINGUA
    langSelect: 'Language',
    // HOME
    home: {
      eyebrow: 'Welcome',
      hero: 'The Vespa legend, all in one place.',
      description:
        'Born from the passion of a Roman mechanic who in the 1990s began restoring abandoned Vespas, the Vespa Museum of Rome opened in 2008 in a converted industrial building. It houses models from the 1940s to the present day: each Vespa tells a story, from the post-war years to the economic boom and the Dolce Vita era. An icon of style, freedom and Italian culture, visited by enthusiasts from around the world.',
      gridLabel: 'Main sections of the site',
      cardCollezione: 'Collection',
      cardCollezioneDesc:
        "Explore over two hundred original specimens, from the classic models of the '50s to the rarest special editions, with historical fact sheets and curiosities about each model.",
      cardBiglietti: 'Tickets',
      cardBigliettiDesc:
        'Buy your ticket online and access the museum without waiting. Reduced rates available.',
      cardContatti: 'Contact',
      cardContattiDesc:
        'For information, group bookings and special requests, write to us or call us directly.',
      audioBtn: 'Audio guide',
      bookBtn: 'Book your visit',
      bannerLabel: 'Ongoing exhibition',
      bannerTitle: 'Winter Vespa — 2026 edition',
      bannerDesc:
        'An exclusive selection of winter models and rare prototypes. From 1 November 2026 to 28 February 2027.',
      bannerCta: 'Discover the exhibition',
      stat1Value: '200+',
      stat1Label: 'Models on display',
      stat2Value: '15,000',
      stat2Label: 'Visitors per year',
      stat3Value: '2008',
      stat3Label: 'Year of opening',
    },
    // COLLEZIONE
    collezione: {
      title: 'Our collection',
      videoTitle: 'The museum on video',
      searchPlaceholder: 'Search a model…',
      moreInfo: 'More info',
      lessInfo: 'Less info',
      wikiLink: 'All info ↗',
      noResults: 'No models found.',
    },
    // BIGLIETTI
    biglietti: {
      title: 'Tickets & Booking',
      description:
        'Buy your ticket online and skip the queue at the entrance. The ticket includes access to the permanent collection and current temporary exhibitions.',
      tableCaption: 'Available ticket types',
      tableColTipo: 'Type',
      tableColDesc: 'Description',
      tableColPrezzo: 'Price',
      interoTitle: 'Full Price',
      interoDesc: 'Museum entry with access to the permanent collection and temporary exhibitions.',
      interoPrice: '€ 12.00',
      ridottoTitle: 'Reduced',
      ridottoDesc: 'Discounted rate for students, under 18, over 65 and disability card holders.',
      ridottoPrice: '€ 7.00',
      gratuito: 'Free',
      gratuitoDesc: 'Children under 6 and disabled visitors with a companion.',
      gratuitoPrice: '€ 0.00',
      formTitle: 'Book your visit',
      labelData: 'Date of visit',
      labelOrario: 'Time slot',
      orario1: '10:00 – 12:00',
      orario2: '12:00 – 14:00',
      orario3: '14:00 – 16:00',
      orario4: '16:00 – 18:00',
      labelTipi: 'Ticket type and quantity',
      labelQtaIntero: 'No. of full-price tickets',
      labelQtaRidotto: 'No. of reduced tickets',
      labelQtaGratuito: 'No. of free entries',
      btnPrenota: 'Confirm booking',
      toastTitolo: 'Booking confirmed!',
      toastMsg: 'You will receive a summary email shortly.',
      toastChiudi: 'Close',
      erroreData: 'Please select a date.',
      erroreOrario: 'Please select a time slot.',
      erroreQta: 'Please select at least one ticket.',
      // AVAILABILITY CALENDAR
      calTitolo: 'Availability',
      calChiuso: 'Closed',
      calEsaurito: 'Sold out',
      calPosti: 'spots',
      calLegOk: 'Available',
      calLegQuasi: 'Last spots',
      calLegEsaurito: 'Sold out',
      calLegChiuso: 'Closed',
      nessunaData: 'No date selected',
      avvisoChiuso: 'The museum is closed on Mondays. Please choose another day.',
      avvisoEsaurito: 'This date is sold out. Please choose another date from the calendar.',
    },
    // CONTATTI
    contatti: {
      title: 'Contact',
      description:
        'For information about opening hours, current exhibitions or bookings for groups and schools, do not hesitate to contact us.',
      email: 'Email',
      telefono: 'Phone',
      indirizzo: 'Address',
    },
    // FOOTER
    footer: {
      tagline: 'The Vespa legend, all in one place.',
      navTitle: 'Navigation',
      infoTitle: 'Practical info',
      hoursTitle: 'Opening hours',
      contactTitle: 'Contact us',
      hours: 'Tue–Sun: 10:00 – 18:00',
      address: 'Via Appia Nuova 42, Rome',
      phone: '+39 06 1234567',
      email: 'info@museodellavespa.it',
      copyright: '© 2026 Vespa Museum. All rights reserved.',
    },
  },
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // Lingua corrente — default italiano
  currentLang = signal<Lang>('it');

  // Traduzioni calcolate in base alla lingua corrente
  t = computed(() => TRANSLATIONS[this.currentLang()]);

  // Cambia la lingua
  setLang(lang: Lang): void {
    this.currentLang.set(lang);
  }
}
