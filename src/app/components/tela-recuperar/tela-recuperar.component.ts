import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecuperarSenhaRequest } from '../../DTO/RecuperarSenhaReques';
import { AcessoApiService } from '../../service/acesso-api.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-tela-recuperar',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './tela-recuperar.component.html',
  styleUrl: './tela-recuperar.component.css'
})
export class TelaRecuperarComponent {
  aguardando: boolean = false;
  falha: boolean = false;
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    palavra: new FormControl('', [Validators.required, Validators.minLength(4)]),
    novaSenha: new FormControl('', [Validators.required, Validators.minLength(4)])

  });
  constructor(private api: AcessoApiService, private router: Router) { }

  telaLogin() {
    this.router.navigate(["/login"]);
  }

  recuperar() {
    if (this.formulario.valid) {
      this.aguardando = true;
      this.falha = false;
      this.api.recuperarSenha(this.formulario.value as RecuperarSenhaRequest).subscribe({
        next: (data) => {
          console.log('Sucesso na recuperação');
          setTimeout(() => {
            this.aguardando = false;
            this.telaLogin();
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

}
