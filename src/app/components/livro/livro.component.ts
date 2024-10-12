import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './livro.component.html',
  styleUrl: './livro.component.css'
})
export class LivroComponent {

  blista: boolean = false;
  bcriar: boolean = false;
  bopcoes: boolean = false;

  livroID: string | null = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe(params => {
      this.livroID = params.get('livroID');
      localStorage.setItem("livroID", this.livroID as string);
      this.testarRotaInicial();

    });

  }
  trocarConteudo(alvo: string | null) {
    if (alvo == "lista") {
      this.blista = true;
      this.bcriar = false;
      this.bopcoes = false;
      this.router.navigate(["/livros/" + this.livroID]);
    }
    else if (alvo == "criar") {
      this.blista = false;
      this.bcriar = true;
      this.bopcoes = false;
      this.router.navigate(["/livros/" + this.livroID + "/criar"]);

    }
    else if (alvo == "opcoes") {
      this.blista = false;
      this.bcriar = false;
      this.bopcoes = true;
      this.router.navigate(["/livros/" + this.livroID + "/configuracoes"]);
    }

  }
  testarRotaInicial() {
    if (this.router.url == "/livros/" + this.livroID) {
      this.blista = true;
      this.bcriar = false;
      this.bopcoes = false;
    }
    else if (this.router.url == "/livros/" + this.livroID + "/criar") {
      this.blista = false;
      this.bcriar = true;
      this.bopcoes = false;
    }
    else if (this.router.url == "/livros/" + this.livroID + "/configuracoes") {
      this.blista = false;
      this.bcriar = false;
      this.bopcoes = true;
    }

  }

}
