import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Pessoa } from '../pessoas/model/pessoa';
import { PessoaService } from "../pessoa.service";

@Component({
  selector: 'app-pessoa-detalhe',
  templateUrl: './pessoa-detalhe.component.html',
  styleUrls: ['./pessoa-detalhe.component.css']
})
export class PessoaDetalheComponent implements OnInit {

  @Input() pessoa: Pessoa;

  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPessoa();
  }

  getPessoa(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pessoaService.getPessoa(id)
      .subscribe(pessoa => this.pessoa = pessoa);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.pessoaService.updatePessoa(this.pessoa)
      .subscribe(() => this.goBack());
  }

}
