import { Component, OnInit } from '@angular/core';

import { Pessoa } from './model/pessoa';
import { PessoaService } from "../pessoa.service";

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})

export class PessoasComponent implements OnInit {

  pessoas: Pessoa[];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getPessoas();
  }

  getPessoas(): void {
    this.pessoaService.getPessoas()
      .subscribe(pessoas => this.pessoas = pessoas);
  }

  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.pessoaService.addPessoa({ nome } as Pessoa)
      .subscribe(pessoa => {
        this.pessoas.push(pessoa);
      });
  }

  delete(pessoa: Pessoa): void {
    this.pessoas = this.pessoas.filter(h => h !== pessoa);
    this.pessoaService.deletePessoa(pessoa).subscribe();
  }

}
