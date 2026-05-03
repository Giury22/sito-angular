import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-contatti',
  // FormsModule: [(ngModel)] su input text, select, radio, textarea
  imports: [FormsModule],
  templateUrl: './contatti.html',
  styleUrl: './contatti.scss',
})
export class Contatti {
  lang = inject(LanguageService);

  // ===================================================================
  // FORM DI CONTATTO
  // Widget nuovi rispetto al sito:
  //   - input[type="text"]     → nome e cognome
  //   - input[type="email"]    → indirizzo email (nuovo tipo di input)
  //   - input[type="tel"]      → telefono opzionale (keyboard numerica mobile)
  //   - input[type="radio"]    → tipo di visitatore (primo radio del sito)
  //   - input[type="checkbox"] → consenso privacy GDPR (checkbox boolean)
  //   - select                 → oggetto della richiesta
  //   - textarea               → messaggio libero (primo textarea del sito)
  // Gap a11y intenzionali: span invece di label, nessun fieldset/legend
  // per i radio, nessun aria-required, nessun aria-describedby,
  // nessun aria-live sugli errori.
  // ===================================================================

  nome = signal('');
  email = signal('');

  // Telefono opzionale — input[type="tel"], primo nel sito
  telefonoForm = signal('');

  // Oggetto della richiesta — primo <select> su questa pagina
  oggetto = signal('');

  // Tipo visitatore — primo gruppo di radio button del sito
  tipoVisitatore = signal('privato');

  // Messaggio libero — primo <textarea> del sito
  messaggio = signal('');

  // Consenso privacy GDPR — checkbox boolean
  privacyAccettata = signal(false);

  // Errori di validazione inline
  errori = signal<string[]>([]);

  // Toast di conferma invio
  toastVisibile = signal(false);

  // Validazione semplice senza reactive forms
  invia(): void {
    const err: string[] = [];
    const t = this.lang.t().contatti;

    if (!this.nome().trim()) err.push(t.erroreNome);
    // Controllo email base: contiene @ e almeno un punto dopo
    if (!this.email().trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email())) {
      err.push(t.erroreEmail);
    }
    if (!this.messaggio().trim()) err.push(t.erroreMessaggio);
    if (!this.privacyAccettata()) err.push(t.errorePrivacy);

    this.errori.set(err);
    if (err.length > 0) return;

    this.toastVisibile.set(true);
  }

  chiudiToast(): void {
    this.toastVisibile.set(false);
    // Reset form
    this.nome.set('');
    this.email.set('');
    this.telefonoForm.set('');
    this.oggetto.set('');
    this.tipoVisitatore.set('privato');
    this.messaggio.set('');
    this.privacyAccettata.set(false);
    this.errori.set([]);
  }
}
