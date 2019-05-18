import { Component, OnInit } from '@angular/core';
import { Pessoa } from "../pessoas/model/pessoa";
import { PessoaService } from "../pessoa.service";

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getPessoas();
  }

  getPessoas(): void {
    this.pessoaService.getPessoas()
      .subscribe(pessoas => this.pessoas = pessoas.slice(1, 5));
  }

}
