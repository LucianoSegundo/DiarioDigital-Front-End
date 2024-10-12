import { Component } from '@angular/core';

@Component({
  selector: 'app-opcoes-livro',
  standalone: true,
  imports: [],
  templateUrl: './opcoes-livro.component.html',
  styleUrl: './opcoes-livro.component.css'
})
export class OpcoesLivroComponent {
  livroID: string| null= "";
  constructor() { 
    this.livroID = localStorage.getItem("livroID");

  }
}
