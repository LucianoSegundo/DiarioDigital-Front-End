import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  localizacao: string = "";

  constructor(private router: Router) {
    this.coletarRota();
  }

  botaoEntrar() {
    setTimeout(() => {
      this.router.navigate(["/login"]);
    }, 500);
  }

  botaoEncerrar() {
    setTimeout(() => {
      localStorage.removeItem("token");
      this.router.navigate(["/login"]);
    }, 500);

  }

  botaoPerfil() {
    setTimeout(() => {
      this.router.navigate(["/perfil"]);
    }, 500);
  }

  coletarRota() {
    this.router.events.pipe(

      filter(event => event instanceof NavigationEnd)

    ).subscribe((event: NavigationEnd) => {
      this.localizacao = event.url;

    })
  }
}
