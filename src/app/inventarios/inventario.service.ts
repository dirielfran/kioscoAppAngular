import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inventario } from './inventario';
import { map, catchError } from 'rxjs/operators';
// Se importa objeto Route para redirijir a un enlace
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  // Se alamacena en variable el endPoint

   private urlEndPoint = 'http://localhost:8080/api/inventarios';
  // private urlEndPoint: string ='http://66.228.61.76/springAngular/api/inventarios';
  constructor( private httpClient: HttpClient,
               private router: Router) {  }

  getInventarios(page: number): Observable<any>{
    return this.httpClient.get(this.urlEndPoint + '/page/' + page).pipe(
      map( (response: any) => {
        // tslint:disable-next-line: no-unused-expression
        response.content as Inventario[];
        return response;
      } )
    );
  }

  createInventario(inventario: Inventario, user: string, consignacion: boolean): Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint + '?user=' + user + '&consignacion=' + consignacion, inventario).pipe(
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

  getInventario(id: number): Observable<Inventario>{
    return this.httpClient.get<Inventario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status === 401 && e.error.mensaje){
          this.router.navigate(['/inventarios']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Metodo de modificacion del inventario
  update(inventario: Inventario): Observable<Inventario>{
    return this.httpClient.put(`${this.urlEndPoint}/${inventario.id}`, inventario).pipe(
      map((response: any) => response.inventario as Inventario),
      catchError( e => {
        if (e.status === 400){
          return throwError(e);
        }
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  // Metodo delete de Inventario
  delete(id: number): Observable<Inventario>{
    return this.httpClient.delete<Inventario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        if (e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
