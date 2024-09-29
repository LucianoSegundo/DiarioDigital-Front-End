export class RecuperarSenhaRequest {
    nome: string;
    senha: string;
    palavraSeguranca: string;
   
  
    constructor(nome: string, senha: string, palavraSeguranca: string) {
      this.nome = nome;
      this.senha = senha;
      this.palavraSeguranca = palavraSeguranca;
    }
  }
  