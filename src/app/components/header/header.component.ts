import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
autorizado:boolean= false;
 localizacao:string="";

  constructor(private router: Router){
    this.router.events.pipe(

      filter(event => event instanceof NavigationEnd)

    ).subscribe((event: NavigationEnd) => {
      this.localizacao= event.url;
      })
  }

  botaoEntrar(){
    this.router.navigate(["/login"]);
  }
}
