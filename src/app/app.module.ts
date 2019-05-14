import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PessoasComponent } from "./pessoas/pessoas.component";
import { PessoaDetalheComponent } from './pessoa-detalhe/pessoa-detalhe.component';
import { MensagensComponent } from './mensagens/mensagens.component';
import { PainelComponent } from './painel/painel.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // O módulo HttpClientInMemoryWebApiModule intercepta solicitações HTTP
    // e retorna respostas do servidor simuladas.
    // Remover quando um servidor real estiver pronto para receber solicitações.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    PessoasComponent,
    PessoaDetalheComponent,
    MensagensComponent,
    PainelComponent,
    PessoaPesquisaComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
