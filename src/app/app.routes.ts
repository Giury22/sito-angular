import { Routes } from '@angular/router';
import { Biglietti } from './pages/biglietti/biglietti';
import { Collezione } from './pages/collezione/collezione';
import { Contatti } from './pages/contatti/contatti';
import { Home } from './pages/home/home';

export const routes: Routes = [
	{ path: '', component: Home, title: 'Home | Museo Accessibilita' },
	{ path: 'collezione', component: Collezione, title: 'Collezione | Museo Accessibilita' },
	{ path: 'biglietti', component: Biglietti, title: 'Biglietti | Museo Accessibilita' },
	{ path: 'contatti', component: Contatti, title: 'Contatti | Museo Accessibilita' },
	{ path: '**', redirectTo: '' },
];
