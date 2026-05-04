import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  {
    id: 8,
    nome: 'Vespa 125',
    codice: 'V15T',
    anno: 1948,
    cilindrata: '125 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-125---v15t.jpg',
    wiki: 'https://www.museopiaggio.it/it/collezioni/1-vespa/4-125',
    descrizione_it:
      'Prima Vespa 125 cc, introdotta nel 1948 con sospensione posteriore e motore potenziato rispetto alla 98. Il faro era ancora posizionato sul parafango anteriore.',
    descrizione_en:
      'The first 125 cc Vespa, introduced in 1948 with rear suspension and a more powerful engine than the 98. The headlight was still mounted on the front mudguard.',
  },
  {
    id: 9,
    nome: 'Vespa 125',
    codice: 'VN1T / VN2T',
    anno: 1953,
    cilindrata: '125 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-125---vn1t---vn2t.jpg',
    wiki: 'https://www.museopiaggio.it/it/collezioni/1-vespa/7-125-mod-53',
    descrizione_it:
      'Nel 1953 il faro fu spostato sul manubrio e la carrozzeria posteriore fu ridisegnata. Disponibile anche nella versione economica "U" (Utilitaria) priva di cofano motore.',
    descrizione_en:
      'In 1953 the headlight was moved to the handlebars and the rear bodywork was redesigned. Also available in the budget "U" (Utilitaria) version without an engine cover.',
  },
  {
    id: 10,
    nome: 'Vespa 150 GS',
    codice: 'VS1T',
    anno: 1955,
    cilindrata: '150 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-150-gs---vs1t.jpg',
    wiki: 'https://www.museopiaggio.it/it/collezioni/1-vespa/9-gs-preserie-vs1t',
    descrizione_it:
      'La Gran Sport nasce nel 1955 come modello sportivo capace di raggiungere i 100 km/h. Il VS1T si distingue per i cavi che passano esternamente al manubrio, caratteristica poi eliminata nelle serie successive.',
    descrizione_en:
      'The Gran Sport was born in 1955 as a sporty model capable of reaching 100 km/h. The VS1T is distinguished by its externally routed handlebar cables, a feature dropped in later series.',
  },
  {
    id: 11,
    nome: 'Vespa 125',
    codice: 'VNB1T',
    anno: 1959,
    cilindrata: '125 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-125---vnb1t.jpg',
    wiki: 'https://www.sip-scootershop.com/it/modelbase/vespa_6/125-vnb1t-125-ccm-2t-ac-59-60-vnb1t_769',
    descrizione_it:
      'La serie VNB (1959–1966) introduce per la prima volta su un motore 125 il sistema di ammissione a valvola rotante, abbassando il rapporto di miscela benzina-olio dal 5% al 2%.',
    descrizione_en:
      'The VNB series (1959–1966) was the first 125 cc Vespa to feature rotary valve induction, reducing the fuel-to-oil mixture ratio from 5% to 2%.',
  },
  {
    id: 12,
    nome: 'Vespa 150',
    codice: 'VBB2T',
    anno: 1963,
    cilindrata: '150 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-150---vbb2t.jpg',
    wiki: 'http://www.vespaclubsanvincenzo.it/Vespa%20Tecnica/20_Vespa_150GL_63/Vespa%20150GL_1963_c.pdf',
    descrizione_it:
      'Evoluzione della VBB1T, la VBB2T monta il motore ad ammissione rotante con miscela al 2% e il cambio a quattro marce, ponendo le basi dei motori largeframe fino al PX.',
    descrizione_en:
      'An evolution of the VBB1T, the VBB2T features a rotary valve engine with a 2% oil mixture and a four-speed gearbox, establishing the foundation for all largeframe engines up to the PX.',
  },
  {
    id: 13,
    nome: 'Vespa 180 Super Sport',
    codice: 'VSC1T',
    anno: 1964,
    cilindrata: '180 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-180-super-sport---vsc1t.jpg',
    wiki: 'https://www.museopiaggio.it/it/collezioni/1-vespa/44-180-super-sport-vsc1t',
    descrizione_it:
      "Prodotta dal 1964 al 1968 (telaio VSC1T), la 180 Super Sport succede alla GS 160. Con 10 CV eroga una velocità massima di 105 km/h, confermandosi come l'erede sportiva per eccellenza della famiglia GS.",
    descrizione_en:
      'Produced from 1964 to 1968 (frame code VSC1T), the 180 Super Sport succeeds the GS 160. With 10 bhp it reaches a top speed of 105 km/h, cementing its status as the ultimate sporting heir of the GS family.',
  },
  {
    id: 14,
    nome: 'Vespa 180 Rally',
    codice: 'VSD1T',
    anno: 1968,
    cilindrata: '180 cc',
    motore: '2 tempi, monocilindrico',
    img: 'collezione/vespa-vespa-180-rally---vsd1t.jpg',
    wiki: 'https://www.museopiaggio.it/it/collezioni/1-vespa/23-180-rally-vsd1t',
    descrizione_it:
      "Nata nel 1968 (VSD1T 001001), la Rally 180 introduce l'ammissione rotante su un motore largeframe. Equipaggiata con carburatore Dell'Orto SI 20/20, è il degno successore della GS.",
    descrizione_en:
      "Born in 1968 (VSD1T 001001), the Rally 180 introduced rotary valve induction on a largeframe engine. Fitted with a Dell'Orto SI 20/20 carburettor, it is the worthy successor to the GS.",
  },
];

@Component({
  selector: 'app-collezione',
  imports: [FormsModule],
  templateUrl: './collezione.html',
  styleUrl: './collezione.scss',
})
export class Collezione {
  lang = inject(LanguageService);

  // ---- Ricerca testo ----
  ricerca = signal('');

  // ---- Filtro per decade ----
  readonly decadi = [1940, 1950, 1960, 1970, 1980] as const;
  filtroDecade = signal<number | null>(null);

  // ---- Slider anno ----
  readonly annoMin = 1948;
  readonly annoMax = 1980;
  sliderAnno = signal(this.annoMax);

  // ---- Lightbox ----
  lightboxModello = signal<Modello | null>(null);

  apriLightbox(m: Modello) {
    this.lightboxModello.set(m);
  }
  chiudiLightbox() {
    this.lightboxModello.set(null);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.chiudiLightbox();
  }

  // ---- Card accordion ----
  cardsAperte = signal<Set<number>>(new Set());

  modelliVisibili = computed(() => {
    const q = this.ricerca().toLowerCase().trim();
    const decade = this.filtroDecade();
    const maxAnno = this.sliderAnno();

    return MODELLI.filter((m) => {
      if (
        q &&
        !m.nome.toLowerCase().includes(q) &&
        !m.codice.toLowerCase().includes(q) &&
        !String(m.anno).includes(q)
      )
        return false;
      if (decade !== null && (m.anno < decade || m.anno >= decade + 10)) return false;
      if (m.anno > maxAnno) return false;
      return true;
    });
  });

  toggleDecade(d: number) {
    this.filtroDecade.set(this.filtroDecade() === d ? null : d);
  }

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
