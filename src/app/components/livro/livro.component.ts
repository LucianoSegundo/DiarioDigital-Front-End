import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {

    blista:boolean = true;
    bcriar:boolean = false;
    bopcoes:boolean = false;

    livroID:number = 0;

    constructor(private router:Router){
    }
  trocarConteudo(alvo:string){
    if(alvo == "lista"){
      this.blista = true;
      this.bcriar =false;
      this.bopcoes =false;
      this.router.navigate(["/livros/"+this.livroID+"/"]);
    }
    else if(alvo == "criar"){
      this.blista = false;
      this.bcriar = true;
      this.bopcoes = false;
      this.router.navigate(["/livros/"+this.livroID+"/criar"]);

    }
    else if(alvo == "opcoes"){
      this.blista = false;
      this.bcriar =false;
      this.bopcoes =true;
      this.router.navigate(["/livros/"+this.livroID+"/configuracoes"]);
    }

  }

}
