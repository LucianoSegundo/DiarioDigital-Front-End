import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../DTO/request/Usuario/LoginRequest';
import { UsuarioRequest } from '../DTO/request/Usuario/UsuarioRequest';
import { Observable } from 'rxjs';
import { LivroResponse } from '../DTO/response/livro/LivroResponse';
import { RecuperarSenhaRequest } from '../DTO/request/Usuario/RecuperarSenhaReques';
import { Router } from '@angular/router';
import { PaginacaoLivroResponse } from '../DTO/response/livro/PaginacaoLivroResponse';
import { LoginResponse } from '../DTO/response/usuario/LoginResponse';
import { UsuarioResponse } from '../DTO/response/usuario/UsuarioResponse';

@Injectable({
  providedIn: 'root',
})
export class AcessoApiService {
  private userUrl: string = `${environment.urlBase}/api/v1/usuario/`;
  private livroUrl: string = `${environment.urlBase}/api/v1/livro/`;

  constructor(private http: HttpClient, private router: Router) {}

  private createHeaders(): HttpHeaders {
    const token: string = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  //Lidando com usuarios

  cadastrarUsu(usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.userUrl, usuario);
  }

  login(usuario: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.userUrl}login`, usuario);
  }

  recuperarSenha(usuario: RecuperarSenhaRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.userUrl}recuperarSenha`, usuario);
  }

  //Lidando com Livros

  criarLivro(titulo: string): Observable<LivroResponse> {
    return this.http.post<LivroResponse>(`${this.livroUrl}criar`, titulo, { headers: this.createHeaders() });
  }

  listarLivro(pagina:number = 0):Observable<PaginacaoLivroResponse> {
    return this.http.get<PaginacaoLivroResponse>(this.livroUrl + 'listar?pagina='+pagina, { headers: this.createHeaders() });
  }

  //Lidando com Capitulos

  //Outros

  validarToken(error: HttpErrorResponse): void {
    if (error.status === 401) {
      localStorage.removeItem('token');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }
  }
}
