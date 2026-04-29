import { Component, inject } from '@angular/core';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  lang = inject(LanguageService);
}
