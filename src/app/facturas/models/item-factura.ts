import { Producto } from './producto';

export class ItemFactura {
  producto: Producto;
  cantidad: number = 1;
  importe: number;
  precio: number;
  comision: number= 0;

  public getTotal(): number{
    return this.cantidad * this.producto.precio + this.comision;
  }
}
