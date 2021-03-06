import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
   private urlEndPoint: string = 'http://localhost:8080/api/facturas';
   private urlEndPointProd: string = 'http://localhost:8080/api/producto';
  // private urlEndPoint: string = 'http://66.228.61.76/springAngular/api/facturas';
  // private urlEndPointProd: string = 'http://66.228.61.76/springAngular/api/producto';

  constructor(private httpCliente: HttpClient) { }


  getFactura(id: number):Observable<Factura>{
    return  this.httpCliente.get<Factura>(`${this.urlEndPoint}/${id}`);
  }

  deleteFactura(id: number): Observable<void>{
    return this.httpCliente.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  // Metodo que filtra los productos en el backend por un parametro(term)
  getFiltroProducto(term: string): Observable<Producto[]>{
    return this.httpCliente.get<Producto[]>(`${this.urlEndPointProd}/filtrarProducto/${term}`);
  }

  crearFactura(factura:Factura): Observable<Factura>{
   /*  console.log(factura); */
    return this.httpCliente.post<Factura>(this.urlEndPoint, factura);
  }
}
