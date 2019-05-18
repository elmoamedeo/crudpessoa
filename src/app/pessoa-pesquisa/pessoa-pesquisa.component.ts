import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from "rxjs";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { Pessoa } from "../pessoas/model/pessoa";
import { PessoaService } from "../pessoa.service";

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  pessoas$: Observable<Pessoa[]>;
  private searchTerms = new Subject<string>();

  constructor(private pessoaService: PessoaService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.pessoas$ = this.searchTerms.pipe(
      // aguarde 300 ms após cada pressionamento de tecla antes de considerar o termo
      debounceTime(300),
      // ignora novo termo se igual ao termo anterior
      distinctUntilChanged(),
      // muda para nova pesquisa observável cada vez que o termo muda
      switchMap((term:string) => this.pessoaService.searchPessoas(term)),
    );
  }

}
