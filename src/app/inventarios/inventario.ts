import { Producto } from '../facturas/models/producto';
import { ItemInventario } from './item-inventario';
import { Usuario } from '../usuarios/usuario';

export class Inventario {
  id:number;
  fechacreate: string;
  fechamod: string;
  descripcion: string;
  proveedor: string;
  total:number;
  items: Array<ItemInventario>=[];
  usuario: Usuario;
  metodopago: string;

  getTotalInventario(): number{
    this.total = 0;
    this.items.forEach((item:ItemInventario)=>{
      this.total += item.getTotal();
    });
    return this.total;
  }
}


