import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
 clique:boolean = true;
 falha:boolean = false;
 aguardando:boolean = false;
 mensagemErro:string = "";

 formulario = new FormGroup({
  titulo: new FormControl('', [Validators.required, Validators.minLength(4)]),

});
 campoTitulo:string =  "borverde";
 ConferirCampoPrinci(alvo:string){
  if (this.formulario.get(alvo)?.hasError("required") || this.formulario.get(alvo)?.hasError("minlength")) {
    if (alvo == "titulo") this.campoTitulo = "borVer"; } 
    else { this.campoTitulo = "borverde";}
}

  CriarLivro(){}

}
