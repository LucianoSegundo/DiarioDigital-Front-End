import { Component } from '@angular/core';
import { AcessoApiService } from '../../service/acesso-api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { LoginRequest } from '../../DTO/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private api: AcessoApiService, private router: Router) { }
  aguardando: boolean = false;
  falha: boolean = false;
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(4)])

  });

  logar() {
    if (this.formulario.valid) {
      this.aguardando = true;
      this.falha = false;
      this.api.login(this.formulario.value as LoginRequest).subscribe({
        next: (data) => {
          let acesso = data.accessToken;
          console.log(acesso);
          localStorage.setItem("token", acesso);

          setTimeout(() => {
            this.aguardando = false;
            this.router.navigate(["/principal"]);
          }, 550);

        },
        error: (error) => {
          console.error('Erro ao fazer a requisição:', error.error.message);
          this.aguardando = false;
          this.falha = true;



        }
      })
    }
  }

  telaRecu() {
    this.router.navigate(["/recuperar"]);
  }

  CampoNome: string = "borbranco";
  campoSenha: string = "borbranco";


  ConferirCampoLogin(alvo: string) {
    if (this.formulario.get(alvo)?.hasError("required") || this.formulario.get(alvo)?.hasError("minlength") || this.formulario.get(alvo)?.hasError("min")) {
      console.log("clicado")
      if (alvo == "nome") this.CampoNome = "borVer";
      else if (alvo == "senha") this.campoSenha = "borVer";

    } else {
      if (alvo == "nome") this.CampoNome = "borbranco";
      else if (alvo == "senha") this.campoSenha = "borbranco";

    }
  }
}
