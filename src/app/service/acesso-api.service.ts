import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioRequest } from '../DTO/UsuarioRequest';
@Injectable({
  providedIn: 'root'
})
export class AcessoApiService {
  private userUrl:string = environment.urlBase +"/api/v1/usuario/";
  constructor(private http: HttpClient) { }

  cadastrarUsu(usuario: UsuarioRequest){
    console.log(usuario)
    console.log(environment.urlBase)
    return this.http.post(this.userUrl, usuario);
  }
}
