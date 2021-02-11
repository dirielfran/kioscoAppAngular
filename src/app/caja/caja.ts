import { Cliente } from '../clientes/cliente';
export class Caja {
    id: number;
    fechaopen: string;
    fechaclose: string;
    fechamod: string;
    venta: number;
    mercadopago: number;
    retiros:number;
    diferencia: number;
    ganancia: number;
    iniciocaja: number;
    estado: string;
    observacion: string;
    cliente: Cliente;
}
