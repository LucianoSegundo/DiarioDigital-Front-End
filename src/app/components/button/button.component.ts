import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input("mensagem") mensagem:string= '';
  @Input("imagem") imagem:string= '';
  @Output("submit") onSubmit = new EventEmitter();
  @Input("classe") classe:string = '';

  submit(){
   this.onSubmit.emit();
  }
}
