import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Gastos } from './gastos';
import { Cajachica } from './cajachica';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

    // Se alamacena en variable el endPoint

    // private urlEndPoint = 'http://localhost:8080/api/gastos';
     private urlEndPoint: string ='http://66.228.61.76/springAngular/api/gastos';

    constructor( private httpClient: HttpClient,
                 private router: Router) {  }
    
    getGanacias(): Observable<number>{
      return this.httpClient.get(this.urlEndPoint+'/ganancias').pipe(
        map( ( response: number ) => {
          console.log( response )
          return response;
        })
      );
    }

    getGastosxMes(): Observable<number>{
      return this.httpClient.get(this.urlEndPoint+'/gastosxmes').pipe(
        map( (response:number) => {
          console.log( response );
          return response;
        })
      );
    }

    getGastos(page: number): Observable<any>{
      return this.httpClient.get(this.urlEndPoint + '/page/' + page).pipe(
        map( (response: any) => {
          // tslint:disable-next-line: no-unused-expression
          response.content as Gastos[];
          return response;
        } )
      );
    }


  // Metodo delete de Gasto
  delete(id: number): Observable<Gastos>{
    console.log(id);
    return this.httpClient.delete<Gastos>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        if ( e.error.mensaje ){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  creategasto(gasto: Gastos, user: string): Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint + '?user=' + user, gasto).pipe(
      // Se agrega el operador catchError, intercepta en caso de existir error
      catchError(e => {
        // Manejo de validacion que viene en el response del backend
        if ( e.status === 400){
          return throwError(e);
        }
        // Se muestra por consola el error
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getGasto(id: number): Observable<Gastos>{
    return this.httpClient.get<Gastos>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if ( e.status === 401 && e.error.mensaje ){
          this.router.navigate(['/gastos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getCaja(): Observable<Cajachica>{
    return this.httpClient.get<Cajachica>(`${this.urlEndPoint}`).pipe(
      catchError(e => {
        if ( e.status === 401 && e.error.mensaje){
          this.router.navigate(['/gastos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
