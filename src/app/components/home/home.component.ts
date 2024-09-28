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

  redirecionar(){
    this.router.navigate(["/login"]);
  }
  
  Cadastrar() {
    if (this.formulario.valid) {

      if (this.formulario.value.senha == this.formulario.value.confsenha) {

        this.aguardando = true;

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
        this.aguardando = false;
      }
      else this.formulario.value.confsenha = null;

    }
  }

}
