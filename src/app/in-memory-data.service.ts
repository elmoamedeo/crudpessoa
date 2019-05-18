import { InMemoryDbService } from "angular-in-memory-web-api";
import { Pessoa } from "./pessoas/model/pessoa";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const pessoas = [
      { id: 11, nome: 'Júlia' },
      { id: 12, nome: 'Roberto' },
      { id: 13, nome: 'Paulo' },
      { id: 14, nome: 'Bruno' },
      { id: 15, nome: 'Fábio' },
      { id: 16, nome: 'Ana' },
      { id: 17, nome: 'Clara' },
      { id: 18, nome: 'Geovanna' },
      { id: 19, nome: 'Stella' },
      { id: 20, nome: 'Tim' }
    ];
    return {pessoas};
  }

  // Substitui o método genId para garantir que uma pessoa sempre tenha um id.
  // Se o array pessoas estiver vazio,
  // o método abaixo retorna o número inicial (11).
  // se o array heroes não estiver vazio, o método abaixo retorna o valor mais alto
  // pessoa id + 1.

  genId(pessoas: Pessoa[]): number {
    return pessoas.length > 0 ? Math.max(...pessoas.map(pessoa => pessoa.id)) + 1 : 11;
  }

}
