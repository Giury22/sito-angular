import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService, Lang } from '../language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // Servizio condiviso per la lingua
  lang = inject(LanguageService);

  // Stato aperto/chiuso del menu mobile
  menuAperto = signal(false);

  // Apre o chiude il menu hamburger
  toggleMenu(): void {
    this.menuAperto.update((v) => !v);
  }

  // Chiude il menu quando si clicca su un link
  chiudiMenu(): void {
    this.menuAperto.set(false);
  }

  // Cambia la lingua in base al valore selezionato nel <select>
  onLangChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as Lang;
    this.lang.setLang(value);
  }
}
