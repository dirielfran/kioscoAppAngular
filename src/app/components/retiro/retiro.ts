import { Cliente } from '../../clientes/cliente';
import { Caja } from '../../caja/caja';
export class Retiro {
  id: number;
  tipo: string;
  monto: number;
  descripcion: string;
  cliente: Cliente;
  caja: Caja;
}
