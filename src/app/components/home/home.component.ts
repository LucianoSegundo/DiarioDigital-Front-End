import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ButtonComponent } from "../button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioRequest } from '../../DTO/UsuarioRequest';
import { AcessoApiService } from '../../service/acesso-api.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  erroForm: boolean = false;
  mensagemErro: string = "";
  suceesoform: boolean = false;

  constructor(private api: AcessoApiService) { }
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(4)]),
    palavraSegu: new FormControl('', [Validators.required, Validators.minLength(4)]),
    idade: new FormControl(0, [Validators.required, Validators.min(18)]),
    confsenha: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  Cadastrar() {
    if (this.formulario.valid) {

      if (this.formulario.value.senha == this.formulario.value.confsenha) {

        this.api.cadastrarUsu(this.formulario.value as UsuarioRequest).subscribe({
          next: (data) => {
            console.log('Dados recebidos:', data);
            this.suceesoform = true;
            this.formulario.reset();
          },
          error: (error) => {
            console.error('Erro ao fazer a requisição:', error.error.message);
            this.mensagemErro = error.error.message;
            this.erroForm = true;
          }

        });

      }
      else this.formulario.value.confsenha = null;

    }
  }

}
