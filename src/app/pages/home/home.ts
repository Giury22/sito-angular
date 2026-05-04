import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../shared/language.service';

// Immagini del carosello nella cartella public/home
const SLIDES = [
  { src: 'home/carosello1.png', alt: 'Foto museo 1' },
  { src: 'home/carosello2.png', alt: 'Foto museo 2' },
  { src: 'home/carosello3.png', alt: 'Foto museo 3' },
  { src: 'home/carosello4.png', alt: 'Foto museo 4' },
];

const RECENSIONI = [
  {
    id: 1,
    autore: 'Marco T.',
    stelle: 5,
    data: 'Aprile 2026',
    testo_it:
      'Posto meraviglioso. I modelli esposti sono in condizioni perfette e le schede informative sono molto dettagliate. Tornerò sicuramente!',
    testo_en:
      'Wonderful place. The exhibited models are in perfect condition and the information cards are very detailed. I will definitely be back!',
  },
  {
    id: 2,
    autore: 'Sophie L.',
    stelle: 5,
    data: 'Marzo 2026',
    testo_it:
      'Incredibile collezione. Anche se non sono una grande appassionata di moto, la storia di ogni modello mi ha affascinato.',
    testo_en:
      "Incredible collection. Even though I'm not a big motorbike fan, the history behind each model fascinated me.",
  },
  {
    id: 3,
    autore: 'Giulia R.',
    stelle: 4,
    data: 'Febbraio 2026',
    testo_it:
      "Visita molto piacevole, ottima guida audio. Manca solo un piccolo bar o caffetteria all'interno.",
    testo_en:
      'Very enjoyable visit, great audio guide. The only thing missing is a small café inside.',
  },
];

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  lang = inject(LanguageService);

  slides = SLIDES;
  recensioni = RECENSIONI;
  indiceAttivo = signal(0);

  // Traccia audio
  audioAperto = signal(false);

  // Banner mostra: visibile finché non viene chiuso
  bannerAperto = signal(true);

  chiudiBanner() {
    this.bannerAperto.set(false);
  }

  // Seleziona il file audio in base alla lingua attiva
  audioSrc = computed(() =>
    this.lang.currentLang() === 'it' ? 'home/tracciaAudio.mp3' : 'home/tracciAudioEN.mp3',
  );

  // Mostra/nasconde il player audio
  toggleAudio() {
    this.audioAperto.update((v) => !v);
  }

  // Vai alla slide precedente
  precedente() {
    this.indiceAttivo.update((i) => (i === 0 ? this.slides.length - 1 : i - 1));
  }

  // Vai alla slide successiva
  successiva() {
    this.indiceAttivo.update((i) => (i === this.slides.length - 1 ? 0 : i + 1));
  }

  // Vai direttamente a una slide dal pallino
  vaiA(indice: number) {
    this.indiceAttivo.set(indice);
  }
}
