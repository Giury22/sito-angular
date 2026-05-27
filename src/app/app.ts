import { Component, signal, HostListener, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';
import { LanguageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  lang = inject(LanguageService);
  private router = inject(Router);

  protected readonly title = signal('museo-accessibilita');

  // ---- Cookie banner ----
  cookieAccettati = signal(false);

  accettaCookie(valore: boolean): void {
    this.cookieAccettati.set(valore);
  }

  // ---- Back to top ----
  mostraTopBtn = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.mostraTopBtn.set(window.scrollY > 320);
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---- Breadcrumb ----
  breadcrumb = signal<{ label: string; url: string }[]>([]);

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.aggiornaBreakcrumb();
    });
  }

  private aggiornaBreakcrumb() {
    const url = this.router.url.split('?')[0];
    const t = this.lang.t();
    const crumbs: { label: string; url: string }[] = [{ label: t.nav.home, url: '/' }];
    if (url === '/collezione') crumbs.push({ label: t.nav.collezione, url: '/collezione' });
    else if (url === '/biglietti') crumbs.push({ label: t.nav.biglietti, url: '/biglietti' });
    else if (url === '/contatti') crumbs.push({ label: t.nav.contatti, url: '/contatti' });
    this.breadcrumb.set(crumbs);
  }
}
