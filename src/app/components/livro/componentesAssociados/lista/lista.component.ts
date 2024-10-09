import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {  MatTableModule } from '@angular/material/table';
import { CapituloResponse } from '../../../../DTO/response/capitulo/CapituloResponse';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatTableModule, MatPaginator],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  colunas:string[] = ["icone","titulo", "nCap"];
  baseDados: CapituloResponse[] = [
    {id:1, Conteudo:"", numeroCapitulo:1, titulo: "ababa"},
    {id:2, Conteudo:"", numeroCapitulo:20, titulo: "ababa"},
    {id:3, Conteudo:"", numeroCapitulo:300, titulo: "ababa"},
    {id:4, Conteudo:"", numeroCapitulo:4000, titulo: "ababa"},
    {id:5, Conteudo:"", numeroCapitulo:5, titulo: "ababa"},
    {id:6, Conteudo:"", numeroCapitulo:6, titulo: "ababa"},
    {id:7, Conteudo:"", numeroCapitulo:7, titulo: "ababa"},
    {id:8, Conteudo:"", numeroCapitulo:8, titulo: "ababa"},
    {id:9, Conteudo:"", numeroCapitulo:9, titulo: "ababa"},
    {id:10, Conteudo:"", numeroCapitulo:10, titulo: "ababa"},
  
  ];

  acessarCapitulo(id:number){ console.log(id)}

}
