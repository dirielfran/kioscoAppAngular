import { Producto } from '../facturas/models/producto';

export class ItemInventario {
  id: number;
  fechacreate:string;
  fechamod: string;
  producto: Producto;
  estado: string;
  stockinicial: number;
  stockadd: number;
  existencia: number;
  precioventa: number;
  preciocompra: number;

  public getTotal():number{
    return this.stockadd * this.preciocompra;
  }
}
