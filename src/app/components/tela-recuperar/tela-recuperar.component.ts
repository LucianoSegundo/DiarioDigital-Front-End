import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { AcessoApiService } from '../../service/acesso-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-recuperar',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './tela-recuperar.component.html',
  styleUrl: './tela-recuperar.component.css'
})
export class TelaRecuperarComponent {
  aguardando:boolean= false;
  falha:boolean= false;
formulario = new FormGroup({
  nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
  palavra: new FormControl('', [Validators.required, Validators.minLength(4)]),
  novaSenha: new FormControl('', [Validators.required, Validators.minLength(4)])

});
constructor(private api: AcessoApiService, private router: Router) { }

telaLogin(){
  this.router.navigate(["/login"]);
}


}
