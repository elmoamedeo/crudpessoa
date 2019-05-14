import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PainelComponent } from "./painel/painel.component";
import { PessoasComponent } from "./pessoas/pessoas.component"
import { PessoaDetalheComponent } from "./pessoa-detalhe/pessoa-detalhe.component";

const routes: Routes = [
  { path: '', redirectTo: '/painel', pathMatch: 'full' },
  { path: 'painel', component: PainelComponent },
  { path: 'detalhe/:id', component: PessoaDetalheComponent },
  { path: 'pessoas', component: PessoasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
