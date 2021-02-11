import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { AuthService } from '../../usuarios/auth.service';
import { Observable,  throwError } from 'rxjs';
// Se importa de operadorla clase map y catchError, tap
import { map, catchError, tap} from 'rxjs/operators';
// Se importa objeto Route para redirijir a un enlace
import { Router } from '@angular/router';
import { Retiro } from './retiro';

@Injectable({
  providedIn: 'root'
})
export class RetiromodalService {
  // Se alamacena en variable el endPoint
   private urlEndPoint: string ='http://localhost:8080/api/retiros';
  // private urlEndPoint: string ='http://66.228.61.76/springAngular/api/retiros';

  modal: boolean = false;
  constructor( private http: HttpClient,
    private authService:AuthService,
    private router: Router ) { }

  // Metodo que recuperalas cajas del backend
  getRetiros(): Observable<any> {
    return this.http.get(this.urlEndPoint).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/cliente']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  createRetiro(retiro: Retiro): Observable<any>{
    console.log(retiro);
    return this.http.post<any>(this.urlEndPoint, retiro).pipe(
      catchError(
        e => {
          if(e.status == 400){
            return throwError(e);
          }
          if(e.error.mensaje){
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
    );
  }

  abrirModal(){
      this.modal = true;
  }

  cerrarModal(){
    this.modal= false;
  }
}
