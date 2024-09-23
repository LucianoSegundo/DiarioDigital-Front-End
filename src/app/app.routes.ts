import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrincipalComponent } from './components/principal/principal.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'principal', component: PrincipalComponent},
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
