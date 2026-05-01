import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../shared/language.service';

// Struttura di una cella del calendario
interface GiornoCalendario {
  data: string; // YYYY-MM-DD oppure '' per celle vuote di padding
  numero: number; // numero del giorno (0 per celle vuote)
  stato: 'vuoto' | 'passato' | 'chiuso' | 'esaurito' | 'quasi' | 'ok';
  posti: number; // posti disponibili nella giornata
}

@Component({
  selector: 'app-biglietti',
  // FormsModule: necessario per [(ngModel)] su input, select, checkbox
  imports: [FormsModule],
  templateUrl: './biglietti.html',
  styleUrl: './biglietti.scss',
})
export class Biglietti {
  lang = inject(LanguageService);

  // ===================================================================
  // WIDGET: CALENDARIO DISPONIBILITÀ
  // Nuovo nel sito: primo componente calendario interattivo custom.
  // Nessuna libreria esterna (CDK/Material) — costruito con segnali.
  // Gap a11y intenzionali: nessun role="grid", nessun aria-selected,
  // nessun aria-disabled, nessun focus management via tastiera.
  // ===================================================================

  // Mese e anno attualmente visualizzati nel calendario
  meseCalendario = signal<{ anno: number; mese: number }>({
    anno: new Date().getFullYear(),
    mese: new Date().getMonth(),
  });

  // Intestazioni colonne: settimana parte da Lunedì
  readonly GIORNI_IT = ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do'];
  readonly GIORNI_EN = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  readonly MESI_IT = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];
  readonly MESI_EN = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Disponibilità mock: YYYY-MM-DD → posti liberi
  // Generati proceduralmente fino a fine novembre (≈ 214 giorni da oggi).
  // Lunedì esclusi (museo chiuso il lunedì).
  // 0 posti = esaurito; 1-15 = ultimi posti; 16+ = disponibile.
  private readonly DISPONIBILITA: Record<string, number> = (() => {
    const map: Record<string, number> = {};
    const base = new Date();
    base.setHours(0, 0, 0, 0);
    // Calcola quanti giorni mancano a fine novembre dell'anno corrente
    const fineNov = new Date(base.getFullYear(), 11, 0); // 30 novembre
    const giorniTotali = Math.ceil((fineNov.getTime() - base.getTime()) / 86_400_000);
    // Pattern ciclico che simula un museo con giornate variabili
    const pattern = [0, 8, 38, 0, 22, 40, 12, 5, 0, 35, 3, 40, 0, 18, 40, 7, 0, 25, 40, 10];
    for (let i = 1; i <= giorniTotali; i++) {
      const d = new Date(base);
      d.setDate(d.getDate() + i);
      if (d.getDay() === 1) continue; // lunedì → chiuso, non inserire
      const key = d.toISOString().split('T')[0];
      map[key] = pattern[i % pattern.length];
    }
    return map;
  })();

  // Etichetta "Maggio 2026" / "May 2026" in base alla lingua
  titoloMese = computed(() => {
    const { anno, mese } = this.meseCalendario();
    const nomi = this.lang.currentLang() === 'it' ? this.MESI_IT : this.MESI_EN;
    return `${nomi[mese]} ${anno}`;
  });

  // Getter per le intestazioni giorni in base alla lingua
  get intestazioniGiorni(): string[] {
    return this.lang.currentLang() === 'it' ? this.GIORNI_IT : this.GIORNI_EN;
  }

  // Griglia del mese: array di celle (vuote + giorni)
  // Dipende da meseCalendario; la selezione è gestita solo via CSS nel template.
  giorniCalendario = computed((): GiornoCalendario[] => {
    const { anno, mese } = this.meseCalendario();
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0);

    const ultimoGiorno = new Date(anno, mese + 1, 0).getDate();
    const primoGiorno = new Date(anno, mese, 1);

    // Converti in settimana Lun-first: (Sun=0 → 6, Mon=1 → 0, ..., Sat=6 → 5)
    const startDow = (primoGiorno.getDay() + 6) % 7;

    const cells: GiornoCalendario[] = [];

    // Celle vuote di padding prima del primo giorno
    for (let i = 0; i < startDow; i++) {
      cells.push({ data: '', numero: 0, stato: 'vuoto', posti: 0 });
    }

    // Celle dei giorni del mese
    for (let d = 1; d <= ultimoGiorno; d++) {
      const date = new Date(anno, mese, d);
      const mm = String(mese + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      const dateStr = `${anno}-${mm}-${dd}`;
      const dow = date.getDay();

      let stato: GiornoCalendario['stato'];
      let posti = 0;

      if (date < oggi) {
        stato = 'passato';
      } else if (dow === 1) {
        // Lunedì: museo chiuso
        stato = 'chiuso';
      } else {
        posti = this.DISPONIBILITA[dateStr] ?? 40;
        if (posti === 0) stato = 'esaurito';
        else if (posti <= 15) stato = 'quasi';
        else stato = 'ok';
      }

      cells.push({ data: dateStr, numero: d, stato, posti });
    }

    return cells;
  });

  // Naviga al mese precedente (non oltre il mese corrente)
  mesePrecedente(): void {
    const { anno, mese } = this.meseCalendario();
    const oggi = new Date();
    if (anno === oggi.getFullYear() && mese === oggi.getMonth()) return;
    this.meseCalendario.set(mese === 0 ? { anno: anno - 1, mese: 11 } : { anno, mese: mese - 1 });
  }

  // Naviga al mese successivo (max: novembre dell'anno corrente)
  meseSuccessivo(): void {
    const { anno, mese } = this.meseCalendario();
    const annoCorrente = new Date().getFullYear();
    const nuovoMese = mese === 11 ? 0 : mese + 1;
    const nuovoAnno = mese === 11 ? anno + 1 : anno;
    // Blocca dopo novembre dell'anno corrente
    if (nuovoAnno > annoCorrente || (nuovoAnno === annoCorrente && nuovoMese > 10)) return;
    this.meseCalendario.set({ anno: nuovoAnno, mese: nuovoMese });
  }

  // Data minima selezionabile: oggi (formato YYYY-MM-DD)
  get dataMin(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Data massima: 30 novembre dell'anno corrente
  get dataMax(): string {
    const anno = new Date().getFullYear();
    return `${anno}-11-30`;
  }

  // Segnale per l'avviso inline quando l'input nativo sceglie una data non prenotabile
  avvisoData = signal('');

  // Controlla se una data (YYYY-MM-DD) è disponibile, chiusa o esaurita
  // Usato sia per la validazione dell'input nativo sia nella logica del form.
  private statoData(data: string): 'ok' | 'quasi' | 'esaurito' | 'chiuso' {
    const [y, m, d] = data.split('-').map(Number);
    const date = new Date(y, m - 1, d); // parse locale, evita bug UTC/timezone
    if (date.getDay() === 1) return 'chiuso'; // lunedì
    // Stesso fallback del calendario custom: undefined → 40 posti (disponibile)
    const posti = this.DISPONIBILITA[data] ?? 40;
    if (posti === 0) return 'esaurito';
    if (posti <= 15) return 'quasi';
    return 'ok';
  }

  // Click su un giorno del calendario custom: seleziona la data.
  // Il calendario disabilita già esaurito/chiuso via [disabled],
  // quindi qui non serve ricontrollare.
  selezionaGiorno(data: string): void {
    this.dataVisita.set(data);
    this.avvisoData.set('');
  }

  // Cambio dalla input[type="date"] nativa: valida la data scelta.
  // Se la data è chiusa (lunedì) o esaurita, annulla la selezione
  // e mostra un avviso inline — senza aspettare il click su "Prenota".
  onDataInputChange(valore: string): void {
    if (!valore) {
      this.dataVisita.set('');
      this.avvisoData.set('');
      return;
    }
    const stato = this.statoData(valore);
    const t = this.lang.t().biglietti;
    if (stato === 'chiuso') {
      this.dataVisita.set('');
      this.avvisoData.set(t.avvisoChiuso);
      return;
    }
    if (stato === 'esaurito') {
      this.dataVisita.set('');
      this.avvisoData.set(t.avvisoEsaurito);
      return;
    }
    this.avvisoData.set('');
    this.dataVisita.set(valore);
    const [anno, mese] = valore.split('-').map(Number);
    this.meseCalendario.set({ anno, mese: mese - 1 });
  }

  // Data formattata in IT/EN per mostrare nel riepilogo del form
  get dataFormattata(): string {
    if (!this.dataVisita()) return '';
    const [anno, mese, giorno] = this.dataVisita().split('-');
    const nomi = this.lang.currentLang() === 'it' ? this.MESI_IT : this.MESI_EN;
    return `${parseInt(giorno)} ${nomi[parseInt(mese) - 1]} ${anno}`;
  }

  // ===================================================================
  // FORM: data, orario, biglietti, totale, validazione, toast
  // ===================================================================

  // --- WIDGET: selezionato dal calendario (nessun input[type="date"]) ---
  dataVisita = signal('');

  // --- WIDGET: select (dropdown) — primo <select> del sito ---
  orarioScelto = signal('');

  // --- WIDGET: checkbox + number — tipo biglietto e quantità ---
  interoAttivo = signal(false);
  ridottoAttivo = signal(false);
  gratuitoAttivo = signal(false);
  qtaIntero = signal(1);
  qtaRidotto = signal(1);
  qtaGratuito = signal(1);

  // --- WIDGET: toast / popup di conferma ---
  toastVisibile = signal(false);

  // Errori di validazione
  errori = signal<string[]>([]);

  // Totale dinamico (solo biglietti a pagamento)
  get totale(): number {
    let tot = 0;
    if (this.interoAttivo()) tot += this.qtaIntero() * 12;
    if (this.ridottoAttivo()) tot += this.qtaRidotto() * 7;
    return tot;
  }

  prenota(): void {
    const err: string[] = [];
    const t = this.lang.t().biglietti;
    if (!this.dataVisita()) err.push(t.erroreData);
    if (!this.orarioScelto()) err.push(t.erroreOrario);
    if (!this.interoAttivo() && !this.ridottoAttivo() && !this.gratuitoAttivo()) {
      err.push(t.erroreQta);
    }
    this.errori.set(err);
    if (err.length > 0) return;
    this.toastVisibile.set(true);
  }

  chiudiToast(): void {
    this.toastVisibile.set(false);
    this.dataVisita.set('');
    this.orarioScelto.set('');
    this.interoAttivo.set(false);
    this.ridottoAttivo.set(false);
    this.gratuitoAttivo.set(false);
    this.qtaIntero.set(1);
    this.qtaRidotto.set(1);
    this.qtaGratuito.set(1);
    this.errori.set([]);
  }
}
