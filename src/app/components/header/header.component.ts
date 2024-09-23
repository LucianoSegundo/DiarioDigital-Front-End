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
autorizado:boolean= false;
 caminhoRetorno:string="";

  constructor(private router: Router){
    this.router.events.pipe(

      filter(event => event instanceof NavigationEnd)

    ).subscribe((event: NavigationEnd) => {
        this.gestorCabecalho(event.url);
      })
  }

  gestorCabecalho(url: string){
    let local:string="principal";
    switch(url){
      case'/home':
      this.autorizado = false;
      this.caminhoRetorno = ""
      break;
      case'/login':
      this.autorizado = false;
      this.caminhoRetorno = ""
      break;
      case'/'+local:
      this.autorizado = true;
      this.caminhoRetorno = ""
      break;
      case'/'+local+'/criarLivro':
      this.autorizado = true;
      this.caminhoRetorno = "/"+ local
      break;
      case'/'+local+'/livro':
      this.autorizado = true;
      this.caminhoRetorno = "/"+ local
      break;
      case'/'+local+'/livro/escrever':
      this.autorizado = true;
      this.caminhoRetorno = "/"+ local+"livro"
      break;
      case'/'+local+'/livro/capitulo':
      this.autorizado = true;
      this.caminhoRetorno = "/"+ local+"livro"
      break;
    }
  }

  voltarPaginaAnterior(){
    this.router.navigate([this.caminhoRetorno]);
  }
}
