import { Injectable } from '@angular/core';
//Se importa la api que me permite llegar al endpoint
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../usuarios/auth.service';
import { Caja } from './caja';
//Se importa obj throwError
import { Observable, of, throwError } from 'rxjs';
// Se importa objeto Route para redirijir a un enlace
import { Router } from '@angular/router';
// Se importa de operadorla clase map y catchError, tap
import { map, catchError} from 'rxjs/operators';
import { Usuario } from '../usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  // Se alamacena en variable el endPoint
   private urlEndPoint = 'http://localhost:8080/api/caja';
  // private urlEndPoint = 'http://66.228.61.76/springAngular/api/caja';
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router,
    private authService:AuthService) { }


  getCajas(page:number): Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map(
        (response: any) => {
          (response.content as Caja[]).map(caja => {
            return caja;
          });
          return response;
        }
      )
    );
  }


  createCaja(caja: Caja): Observable<any>{
    this.usuario = this.authService.usuario;
    /* console.log(this.usuario); */
    //Se agrega pipe
    return this.http.post<any>(this.urlEndPoint, caja).pipe(
      //Se agrega el operador catchError, intercepta en caso de existir error
      catchError(e => {
        //Manejo de validacion que viene en el response del backend
        if(e.status == 400){
          return throwError(e);
        }
        //Se muestra por consola el error
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        //Se retorna obj observable
        return throwError(e);
      })
    );
  }


  //Se crea metodo que recupera un Cliente
  cerrarCaja(diferencia: any): Observable<number>{
    console.log(diferencia);
    //Se añade metodo pipe para para transformar la data
    return this.http.get<number>(`${this.urlEndPoint}/cerrarcaja/${diferencia}`).pipe(
      //Se añade obj que me permite detectar si hay errores
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }



   //Se crea metodo que recupera un Cliente
  getEstado(): Observable<boolean>{
    //Se añade metodo pipe para para transformar la data
    return this.http.get<boolean>(`${this.urlEndPoint}/estado`).pipe(
      //Se añade obj que me permite detectar si hay errores
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  //Se crea metodo que recupera un Cliente
  getClienteEstado(): Observable<number>{
    //Se añade metodo pipe para para transformar la data
    return this.http.get<number>(`${this.urlEndPoint}/buscacliente`).pipe(
      //Se añade obj que me permite detectar si hay errores
      catchError(e => {
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

}
