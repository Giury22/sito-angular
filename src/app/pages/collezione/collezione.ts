import { Component, inject, signal, computed } from '@angular/core';
import { LanguageService } from '../../shared/language.service';

interface Modello {
  id: number;
  nome: string;
  codice: string;
  anno: number;
  cilindrata: string;
  motore: string;
  img: string;
  wiki: string;
  descrizione_it: string;
  descrizione_en: string;
}

const MODELLI: Modello[] = [
  {
    id: 1,
    nome: 'Vespa 125 Primavera',
    codice: 'VMA2T',
    anno: 1967,
    cilindrata: '125 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-125-primavera---vma2t.jpg',
    wiki: 'https://it.wikipedia.org/wiki/Vespa_125_Primavera',
    descrizione_it:
      'Presentata nel 1967, la 125 Primavera è uno dei modelli più amati della storia Vespa. Leggera e agile, fu prodotta fino al 1983 con pochissime variazioni stilistiche.',
    descrizione_en:
      'Introduced in 1967, the 125 Primavera is one of the most beloved models in Vespa history. Light and agile, it was produced until 1983 with very few stylistic changes.',
  },
  {
    id: 2,
    nome: 'Vespa 160 GS',
    codice: 'VSB1T',
    anno: 1962,
    cilindrata: '160 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-160-gs---vsb1t.jpg',
    wiki: 'https://www.sip-scootershop.com/it/modelbase/vespa_6/160-gs-gs4-d-160-ccm-2t-ac-62-64-vsb1-2t_785',
    descrizione_it:
      'La seconda generazione della Gran Sport, con motore da 160 cc e cambio a 4 marce. Simbolo di sportività e velocità, rimane una delle Vespe più ricercate dai collezionisti.',
    descrizione_en:
      'The second generation of the Gran Sport, featuring a 160 cc engine and 4-speed gearbox. A symbol of sportiness and speed, it remains one of the most sought-after Vespas among collectors.',
  },
  {
    id: 3,
    nome: 'Vespa 200 Rally',
    codice: 'VSE1T',
    anno: 1972,
    cilindrata: '200 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-200-rally---vse1t.jpg',
    wiki: 'https://www.museopiaggio.it/it/collezioni/1-vespa/30-200-rally-vsd1t',
    descrizione_it:
      "La Vespa più potente degli anni '70. Introdotta nel 1972, la Rally 200 divenne l'alternativa sportiva per chi cercava prestazioni elevate su due ruote.",
    descrizione_en:
      'The most powerful Vespa of the 1970s. Introduced in 1972, the Rally 200 became the sporting alternative for riders seeking high performance on two wheels.',
  },
  {
    id: 4,
    nome: 'Vespa 50 R',
    codice: 'V5A1T',
    anno: 1969,
    cilindrata: '50 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-50-r---v5a1t.jpg',
    wiki: 'https://www.museopiaggio.it/it/collezioni/1-vespa/26-50-r-v5a1t',
    descrizione_it:
      'Versione economica e rinnovata della Vespa 50. La "R" stava per Rinnovata: nuovo colore, nuovi grafismi, stesso carattere inconfondibile che ha reso la Vespa un\'icona.',
    descrizione_en:
      'An affordable and refreshed version of the Vespa 50. The "R" stood for Renewed: new colours, new graphics, and the same unmistakable character that made the Vespa an icon.',
  },
  {
    id: 5,
    nome: 'Vespa 50 Special',
    codice: 'V5A2T / V5B1T',
    anno: 1969,
    cilindrata: '50 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-50-special---v5a2t---v5b1t---v5b3t.jpg',
    wiki: 'https://it.wikipedia.org/wiki/Piaggio_Vespa_50_Special',
    descrizione_it:
      "Una delle Vespe più iconiche per i giovani degli anni '70 e '80. La Special rimase in produzione per oltre vent'anni, diventando un autentico simbolo generazionale.",
    descrizione_en:
      'One of the most iconic Vespas for young people in the 1970s and 80s. The Special remained in production for over twenty years, becoming a true generational symbol.',
  },
  {
    id: 6,
    nome: 'Vespa 90 SS Super Sprint',
    codice: 'V9SS1T',
    anno: 1966,
    cilindrata: '90 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-90ss-super-sprint---v9ss1t.jpg',
    wiki: 'https://www.museopiaggio.it/it/collezioni/1-vespa/21-90-ss-super-sprint-v9ss1t',
    descrizione_it:
      'La sportiva dei piccoli cilindri. Ideale per le gare di regolarità, la Super Sprint si distingueva per la carena anteriore e il faro unico che le donavano un aspetto aggressivo.',
    descrizione_en:
      'The sporty small-engine Vespa. Ideal for regularity races, the Super Sprint stood out for its front fairing and single headlight, giving it an aggressive look.',
  },
  {
    id: 7,
    nome: 'Vespa ET3 Primavera',
    codice: 'VMB1T',
    anno: 1976,
    cilindrata: '125 cc',
    motore: '2 tempi, 3 travasi',
    img: 'collezione/vespa-vespa-et3-primavera---vmb1t.jpg',
    wiki: 'https://www.museopiaggio.it/it/collezioni/1-vespa/28-125-et3-primavera-vmb1t',
    descrizione_it:
      "L'ET3 è considerata da molti la Vespa per eccellenza. Il motore a 3 travasi garantiva prestazioni superiori alla classe 125 cc dell'epoca, con un suono inconfondibile.",
    descrizione_en:
      'The ET3 is considered by many to be the ultimate Vespa. Its 3-port engine delivered performance well above the 125 cc class of the era, with an unmistakable sound.',
  },
];

@Component({
  selector: 'app-collezione',
  imports: [],
  templateUrl: './collezione.html',
  styleUrl: './collezione.scss',
})
export class Collezione {
  lang = inject(LanguageService);

  ricerca = signal('');
  cardsAperte = signal<Set<number>>(new Set());

  modelliVisibili = computed(() => {
    const q = this.ricerca().toLowerCase().trim();
    if (!q) return MODELLI;
    return MODELLI.filter(
      (m) =>
        m.nome.toLowerCase().includes(q) ||
        m.codice.toLowerCase().includes(q) ||
        String(m.anno).includes(q),
    );
  });

  isAperta(id: number): boolean {
    return this.cardsAperte().has(id);
  }

  toggleCard(id: number): void {
    const s = new Set(this.cardsAperte());
    if (s.has(id)) {
      s.delete(id);
    } else {
      s.add(id);
    }
    this.cardsAperte.set(s);
  }

  onRicerca(event: Event): void {
    this.ricerca.set((event.target as HTMLInputElement).value);
  }
}
