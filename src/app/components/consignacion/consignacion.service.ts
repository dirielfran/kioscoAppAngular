import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Consignacion } from './consignacion';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConsignacionService {

  // Se alamacena en variable el endPoint
   private urlEndPoint = 'http://localhost:8080/api/consignaciones';
  // private urlEndPoint: string ='http://66.228.61.76/springAngular/api/consignaciones';

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getConsignaciones(): Observable<Consignacion[]>{
    return this.httpClient.get<Consignacion[]>(this.urlEndPoint).pipe(
      catchError(e => {
        if ( e.status === 401 && e.error.mensaje ){
          this.router.navigate(['/consignacion']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  crearGastoConsignacion(consignacion: Consignacion): Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint, consignacion).pipe(
      // Se agrega el operador catchError, intercepta en caso de existir error
      catchError(e => {
        // Manejo de validacion que viene en el response del backend
        if (e.status === 400){
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
}
