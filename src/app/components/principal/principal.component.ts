import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { LivroResponse } from '../../DTO/response/livro/LivroResponse';
import { AcessoApiService } from '../../service/acesso-api.service';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, MatTableModule, MatPaginatorModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  criarClique: boolean = true;
  falhaCriacao: boolean = false;
  sucessoCriacao: boolean = false;
  aguardandoCriacao: boolean = false;

  mensagemErro: string = "";
  campoTitulo: string = "borverde";

  tamanho: number = 0;
  pageSize: number = 1;
  paginaAtual: number = 0;

  baseDados: LivroResponse[] = [];
  colunas: string[] = ["icone", "titulo", "capitulos"]

  constructor(private api: AcessoApiService) {
    this.PreencherTabelas();

  }

  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(4)]),

  });

  CriarLivro() {
    if (this.formulario.value != null) {
      this.aguardandoCriacao = true;
      this.falhaCriacao = false;
      this.api.criarLivro(this.formulario.value.titulo as string).subscribe({
        next: (data) => {
          this.criarSucesso(data);
        },
        error: (error: HttpErrorResponse) => {
          this.respostaErro(error);
        }
      });
    }
  }

  PreencherTabelas(index: number = 0) {
    this.api.listarLivro(index).subscribe({
      next: (data) => {
        this.tamanho = data.totalPages;
        this.baseDados = data.content;
      },
      error: (error) => {
        this.respostaErro(error);
      }

    })

  }
  acessarLivro(id: number) {
    console.log(id);
  }
  
  paginar(evento: PageEvent) {
    this.paginaAtual = evento.pageIndex;
    this.PreencherTabelas(evento.pageIndex);

  }

  private criarSucesso(data: LivroResponse) {
    this.aguardandoCriacao = false;
    this.sucessoCriacao = true;
    this.PreencherTabelas(this.paginaAtual);
    this.formulario.reset();

    setTimeout(() => {
      this.sucessoCriacao = false;
    }, 2000)
  }
  private respostaErro(error: HttpErrorResponse) {

    this.falhaCriacao = true;
    this.aguardandoCriacao = false;

    if (error.status == 401) {
      this.mensagemErro = "sessão expirou, necessário refazer o login"
      this.api.validarToken(error);
    }
    else
      this.mensagemErro = error.error.message;
    this.formulario.reset();

    setTimeout(() => {
      this.falhaCriacao = false;
    }, 3500)
  }

}
