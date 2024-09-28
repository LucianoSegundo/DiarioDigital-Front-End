import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../DTO/LoginRequest';
import { UsuarioRequest } from '../DTO/UsuarioRequest';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AcessoApiService {
  private userUrl:string = environment.urlBase +"/api/v1/usuario/";
  constructor(private http: HttpClient) { }

  cadastrarUsu(usuario: UsuarioRequest){
   
    return this.http.post(this.userUrl, usuario);
  }

  login(usuario: LoginRequest): Observable<any>{
    return this.http.post(this.userUrl+"login", usuario);
  }
}
