import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioRequest } from '../../DTO/UsuarioRequest';
import { AcessoApiService } from '../../service/acesso-api.service';
import { ButtonComponent } from "../button/button.component";
import { HeaderComponent } from "../header/header.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private api: AcessoApiService, private router: Router) { }


  mensagemErro: string = "";
  erroForm: boolean = false;
  aguardando: boolean = false;
  suceesoform: boolean = false;

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(4)]),
    palavraSegu: new FormControl('', [Validators.required, Validators.minLength(4)]),
    idade: new FormControl(0, [Validators.required, Validators.min(18)]),
    confsenha: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  redirecionar() {
    this.router.navigate(["/login"]);
  }

  Cadastrar() {
    if (this.formulario.valid) {

      if (this.formulario.value.senha == this.formulario.value.confsenha) {

        this.aguardando = true;
        this.erroForm = false;

        this.api.cadastrarUsu(this.formulario.value as UsuarioRequest).subscribe({
          next: (data) => {
            console.log('Sucesso');

            this.aguardando = false;
            setTimeout(() => {
              this.suceesoform = true;
              this.formulario.reset();
              this.redirecionar();
            }, 2000)
          },
          error: (error) => {
            console.error('Erro ao fazer a requisição:', error.error.message);
            this.mensagemErro = error.error.message;
            this.erroForm = true;
            this.aguardando = false;
          }

        });

      }
      else this.formulario.value.confsenha = null;

    }
  }

  campoNome: string = "borverde";
  campoIdade: string = "borverde";
  campoSenha: string = "borverde";
  campoPalavra: string = "borverde";
  campoConfSenha: string = "borverde";

  //
  ConferirCampoHome(alvo: string) {
    if (alvo == "confsenha") {

      if (this.formulario.value.senha != this.formulario.value.confsenha) {
        this.campoConfSenha = "borVer";

      } else this.campoConfSenha = "borverde";
    }
    else if (this.formulario.get(alvo)?.hasError("required") || this.formulario.get(alvo)?.hasError("minlength") || this.formulario.get(alvo)?.hasError("min")) {
      console.log("clicado")
      if (alvo == "nome") this.campoNome = "borVer";
      else if (alvo == "senha") this.campoSenha = "borVer";
      else if (alvo == "palavraSegu") this.campoPalavra = "borVer";
      else if (alvo == "idade") this.campoIdade = "borVer";


    } else {
      if (alvo == "nome") this.campoNome = "borverde";
      else if (alvo == "senha") this.campoSenha = "borverde";
      else if (alvo == "palavraSegu") this.campoPalavra = "borverde";
      else if (alvo == "idade") this.campoIdade = "borverde";

    }
  }

}
