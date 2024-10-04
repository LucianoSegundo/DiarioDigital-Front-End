import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcessoApiService } from '../../service/acesso-api.service';
import { ButtonComponent } from "../button/button.component";
import { HttpErrorResponse } from '@angular/common/http';
import { LivroResponse } from '../../DTO/response/livro/LivroResponse';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  clique: boolean = true;
  falha: boolean = false;
  sucesso: boolean = false;
  aguardando: boolean = false;
  mensagemErro: string = "";
  campoTitulo: string = "borverde";
  paginaAtual: number = 1;
  ultimaPagina: number = 0;
  tabelaMaior: LivroResponse[] = [];
  tabelaMenor: LivroResponse[] = [];
  
  constructor(private api: AcessoApiService) {
    this.PreencherTabelas()
      
  }
  
  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(4)]),

  });

  ConferirCampoPrinci(alvo: string) {
    if (this.formulario.get(alvo)?.hasError("required") || this.formulario.get(alvo)?.hasError("minlength")) {
      if (alvo == "titulo") this.campoTitulo = "borVer";
    }
    else { this.campoTitulo = "borverde"; }
  }

  PreencherTabelas() {
    this.api.listarLivro().subscribe({
      next: (data) => {
        this.ultimaPagina = data.totalPages;
        this.tabelaMaior = data.content;
      },
      error: (error) => {
        this.respostaErro(error);
      }

    })

  }

  CriarLivro() {
    this.aguardando = true;
    this.falha = false;
    this.api.criarLivro(this.formulario.value.titulo as string).subscribe({
      next: (data) => {
        this.criarSucesso(data);
      },
      error: (error: HttpErrorResponse) => {
        this.respostaErro(error);
      }
    });
  }

  acessarLivro(id: number) { }

  private criarSucesso(data: LivroResponse) {
    this.aguardando = false;
    this.sucesso = true;
    if (this.tabelaMaior.length < 10) {
      this.tabelaMaior.push(data);
    }
    setTimeout(() => {
      this.sucesso = false;
    }, 2000)
  }
  private respostaErro(error: HttpErrorResponse) {
    this.falha = true;
    this.aguardando = false;
    if (error.status == 401) {
      this.mensagemErro = "sessão expirou, necessário refazer o login"
      this.api.validarToken(error);
    }
    else
      this.mensagemErro = error.error.message;
  }

}
