import { Component, inject } from '@angular/core';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-collezione',
  imports: [],
  templateUrl: './collezione.html',
  styleUrl: './collezione.scss',
})
export class Collezione {
  lang = inject(LanguageService);
}
