import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { TelaRecuperarComponent } from './components/tela-recuperar/tela-recuperar.component';
import { LivroComponent } from './components/livro/livro.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'principal', component: PrincipalComponent},
    { path: 'login', component: LoginComponent},
    { path: 'recuperar', component: TelaRecuperarComponent},
    { path: 'livros/:livroID', component: LivroComponent},

    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
