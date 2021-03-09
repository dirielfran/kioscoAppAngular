import { Injectable } from '@angular/core';
//Se importa la api que me permite llegar al endpoint
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent  } from '@angular/common/http';
// Api Observable y of, soporte para el pase de mensajes entre partes de una aplicacion
// Se importa obj throwError
import { Observable, of, throwError } from 'rxjs';
// Se importa de operadorla clase map y catchError, tap
import { map, catchError, tap} from 'rxjs/operators';
import { AuthService } from '../usuarios/auth.service';
// Se importa objeto Route para redirijir a un enlace
import { Router } from '@angular/router';
import { Producto } from '../facturas/models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Se alamacena en variable el endPoint
  // private urlEndPoint: string ='http://localhost:8080/api/producto';
  private urlEndPoint: string ='http://66.228.61.76/springAngular/api/producto';

  constructor(private http: HttpClient, private router: Router,
    private authService:AuthService) { }

  // metodo que recupera un objeto pageable del backend
  getProductos(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      tap(
          (response: any) => {
          (response.content as Producto[]).forEach(
            producto => {/* console.log(producto.nombre) */ }
          );
        }
      ),
      map(
          (response: any) => {
          (response.content as Producto[]).map(producto => {
            //Se agrega formato de mayuscula
            producto.nombre = producto.nombre.toUpperCase();
            return producto;
          });
          //Se retorna el observable
          return response;
        }
      )
    );
  }

  //Se crea metodo que crea el cliente
  createProducto(producto: Producto): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, producto).pipe(
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
        return throwError(e);
      })
    );
  }

  //Se crea metodo que recupera una Persona Fisica
  getProducto(id): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/producto']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //Metodo de modificacion del cliente
  update(producto: Producto): Observable<Producto>{
    return this.http.put(`${this.urlEndPoint}/${producto.id}`, producto).pipe(
      map((response: any) => response.producto as Producto),
      catchError( e => {
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

  //Metodo delete de cliente
  delete(id:number): Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e => {
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  //Metodo que filtra los productos en el backend por un parametro(term)
  getFiltroProducto(term: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrarProducto/${term}`);
  }
}
