import { Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CapituloResponse } from '../../../../DTO/response/capitulo/CapituloResponse';
import { AcessoApiService } from '../../../../service/acesso-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatTableModule, MatPaginator],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  colunas:string[] = ["icone","titulo", "nCap"];
  totalPaginas: number= 0;
  baseDados: CapituloResponse[] = [];

  livroID:string | null = "";

    constructor(private router:Router, private activatedRoute:ActivatedRoute, private api:AcessoApiService){
      activatedRoute.paramMap.subscribe(params =>{
        this.livroID = params.get('livroID');
        console.log("valor do id:"+ this.livroID)
      });

      this.baseDados = this.coletarCapitulos();
    }

  acessarCapitulo(id:number){
    this.router.navigate(["/livros/"+this.livroID+"/capitulo/"+id]);
  }

  coletarCapitulos(pagina:number =0):CapituloResponse[]{
    if(this.livroID != null){
      this.api.listarCapitulos(this.livroID as string, pagina).subscribe({
        next: (data)=>{
          this.totalPaginas = data.totalPages;
          return data.content;

        },
        error: (error: HttpErrorResponse) =>{
        }
      })
    }
    return [];
  }

  paginador(evento: PageEvent){
    this.baseDados = this.coletarCapitulos(evento.pageIndex);
  }

}
