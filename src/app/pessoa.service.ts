import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Pessoa} from "./pessoas/model/pessoa";
import { MensagemService } from "./mensagem.service";

const httpOptions = {
  headers: new HttpHeaders({ 'ContentType': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private pessoasUrl = 'api/pessoas';

  constructor(
    private http: HttpClient,
    private mensagemService: MensagemService) { }

  /** GET pessoas do servidor */
  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.pessoasUrl)
      .pipe(
        tap(_ => this.log('buscando pessoas')),
        catchError(this.handleError<Pessoa[]>('getPessoas', []))
      );
  }

  /** GET pessoa pelo id. Returnar `não encontrado` se o id não for encontrado */
  getPessoaNo404<Data>(id: number): Observable<Pessoa> {
    const url = `${this.pessoasUrl}/?id=${id}`;
    return this.http.get<Pessoa[]>(url)
      .pipe(
        map(pessoas => pessoas[0]),
        tap(h => {
          const outcome = h ? `encontrado` : `não encontrado`;
          this.log(`${outcome} pessoa id=${id}`);
        }),
        catchError(this.handleError<Pessoa>(`getPessoa id=${id}`))
      );
  }

  /** GET pessoa by id. Will 404 if id not found */
  getPessoa(id: number): Observable<Pessoa> {
    const url = `${this.pessoasUrl}/${id}`;
    return this.http.get<Pessoa>(url).pipe(
      tap(_ => this.log(`encontrada pessoa com id=${id}`)),
      catchError(this.handleError<Pessoa>(`getPessoa id=${id}`))
    );
  }

  /* GET pessoas cujo nome contém termo de pesquisa */
  searchPessoas(term: string): Observable<Pessoa[]> {
    if (!term.trim()) {
      // if not search term, return empty pessoa array.
      return of([]);
    }
    return this.http.get<Pessoa[]>(`${this.pessoasUrl}/?nome=${term}`).pipe(
      tap(_ => this.log(`encontrado pessoas de acordo "${term}"`)),
      catchError(this.handleError<Pessoa[]>('searchPessoas', []))
    );
  }

  // Métodos para Salvar //

  /** POST: adicionar uma nova pessoa ao servidor */
  addPessoa (pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, httpOptions).pipe(
      tap((newPessoa: Pessoa) => this.log(`pessoa adicionada com id=${newPessoa.id}`)),
      catchError(this.handleError<Pessoa>('addPessoa'))
    );
  }

  /** DELETE: deletar pessoa do servidor */
  deletePessoa (pessoa: Pessoa | number): Observable<Pessoa> {
    const id = typeof pessoa === 'number' ? pessoa : pessoa.id;
    const url = `${this.pessoasUrl}/${id}`;

    return this.http.delete<Pessoa>(url, httpOptions).pipe(
      tap(_ => this.log(`deletada pessoa com id=${id}`)),
      catchError(this.handleError<Pessoa>('deletePessoa'))
    );
  }

  /** PUT: update the pessoa on the server */
  updatePessoa (pessoa: Pessoa): Observable<any> {
    return this.http.put(this.pessoasUrl, pessoa, httpOptions).pipe(
      tap(_=> this.log(`pessoa atualizada id=${pessoa.id}`)),
      catchError(this.handleError<any>('updatePessoa'))
    );
  }

  /**
   * Manejar operação http que falhou
   * Deixar que a app continue funcionando
   * @param operação - nome da operação que falhou
   * @param resultado - valor opcional para retornar como resultado observável
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log mensagem PessoaService **/
  private log(mensagem: string) {
    this.mensagemService.add(`PessoaService: ${mensagem}`);
  }
}
