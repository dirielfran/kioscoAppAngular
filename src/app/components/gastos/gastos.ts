import { Inventario } from '../../inventarios/inventario';
export class Gastos {
  id : number;
  montoPesos: number;
  descripcion: string;
  fechaFact: string;
	fechaCarga: string;
	usuario: string;
	proveedor: string;
	imagen: string= "+58kiosco.png";
	clasificacion: string;
	montoDolar: number;
	tasaDolar: number;
	inventario: Inventario;
	metodopago: string;
}
