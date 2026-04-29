import { Component, inject } from '@angular/core';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-biglietti',
  imports: [],
  templateUrl: './biglietti.html',
  styleUrl: './biglietti.scss',
})
export class Biglietti {
  lang = inject(LanguageService);
}
