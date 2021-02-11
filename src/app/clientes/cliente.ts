import {Region} from './region';
import { Factura } from '../facturas/models/factura';
import { Usuario } from '../usuarios/usuario';
import { Retiro } from '../components/retiro/retiro';
export class Cliente {
    id: number;
    nombre: string;
    apellido: string ;
    fecha: string;
    email: string;
    foto: string;
    region: Region;
    usuario: Usuario;
    facturas: Array<Factura> =[];
    retirosCaja: Array<Retiro> =[];
}
