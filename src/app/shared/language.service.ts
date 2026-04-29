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
        "Il Museo della Vespa di Roma racconta ottant'anni di storia, design e cultura di uno dei simboli piu amati d'Italia. Dalla prima Vespa 98 del 1946 ai modelli contemporanei: un percorso unico tra esemplari originali, manifesti pubblicitari e documenti d'archivio.",
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
    },
    // COLLEZIONE
    collezione: {
      title: 'Collezione permanente',
      description:
        "La collezione permanente del Museo della Vespa raccoglie oltre duecento esemplari originali, dai primi prototipi del dopoguerra fino alle serie limitate del XXI secolo, restaurati e documentati con materiali d'archivio Piaggio.",
      vespa98Title: 'Vespa 98, 1946',
      vespa98Desc:
        'Il primo modello prodotto da Piaggio. Motore a due tempi da 98 cc, telaio in lamiera stampata.',
      vespa150Title: 'Vespa 150 GS, 1955',
      vespa150Desc:
        'La Gran Sport, soprannominata "VS1", fu la Vespa sportiva per eccellenza degli anni Cinquanta.',
    },
    // BIGLIETTI
    biglietti: {
      title: 'Biglietti e prenotazioni',
      description:
        "Acquista il tuo biglietto online e salta la coda all'ingresso. Il biglietto comprende l'accesso alla collezione permanente e alle mostre temporanee in corso.",
      gridLabel: 'Tipologie di biglietti disponibili',
      interoTitle: 'Intero',
      interoDesc:
        'Ingresso al museo con accesso alla collezione permanente e alle mostre temporanee.',
      interoPrice: '€ 12,00',
      ridottoTitle: 'Ridotto',
      ridottoDesc:
        'Tariffa agevolata per studenti, under 18, over 65 e possessori di carta disabilita.',
      ridottoPrice: '€ 7,00',
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
      address: 'Museo della Vespa — Via Appia Nuova 42, Roma',
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
        "The Vespa Museum in Rome tells eighty years of history, design and culture of one of Italy's most beloved icons. From the first Vespa 98 of 1946 to contemporary models: a unique journey through original specimens, advertising posters and archive documents.",
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
    },
    // COLLEZIONE
    collezione: {
      title: 'Permanent Collection',
      description:
        'The permanent collection of the Vespa Museum gathers over two hundred original specimens, from the first post-war prototypes to the limited series of the 21st century, restored and documented with Piaggio archive materials.',
      vespa98Title: 'Vespa 98, 1946',
      vespa98Desc:
        'The first model produced by Piaggio. Two-stroke engine of 98 cc, pressed steel frame.',
      vespa150Title: 'Vespa 150 GS, 1955',
      vespa150Desc:
        'The Gran Sport, nicknamed "VS1", was the definitive sporting Vespa of the 1950s.',
    },
    // BIGLIETTI
    biglietti: {
      title: 'Tickets & Booking',
      description:
        'Buy your ticket online and skip the queue at the entrance. The ticket includes access to the permanent collection and current temporary exhibitions.',
      gridLabel: 'Available ticket types',
      interoTitle: 'Full Price',
      interoDesc: 'Museum entry with access to the permanent collection and temporary exhibitions.',
      interoPrice: '€ 12.00',
      ridottoTitle: 'Reduced',
      ridottoDesc: 'Discounted rate for students, under 18, over 65 and disability card holders.',
      ridottoPrice: '€ 7.00',
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
      address: 'Vespa Museum — Via Appia Nuova 42, Rome',
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
