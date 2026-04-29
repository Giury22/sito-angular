import { Component, inject } from '@angular/core';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-contatti',
  imports: [],
  templateUrl: './contatti.html',
  styleUrl: './contatti.scss',
})
export class Contatti {
  lang = inject(LanguageService);
}
