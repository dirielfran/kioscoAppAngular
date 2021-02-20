import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../usuarios/auth.service';
import { ConsignacionService } from './consignacion.service';
import { Consignacion } from './consignacion';
import Swal from 'sweetalert2';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-consignacion',
  templateUrl: './consignacion.component.html',
  styleUrls: ['./consignacion.component.css']
})
export class ConsignacionComponent implements OnInit {

  public title  = 'Listado de Productos a consignacion';
  consignaciones: Consignacion[] = [];
  // Atributo para la paginacion
  paginador: any;
  // arreglo para los errores
  public errores: string[];

    // Deshabilitar boton
    habilitado = true;
    mercadoPago = false;
  
    disabled = false;
    checked = false;
    color: ThemePalette = 'primary';

  constructor(public authService: AuthService,
              private consignacionService: ConsignacionService
              ) { }

  ngOnInit(): void {
    this.consignacionService.getConsignaciones().subscribe(
      response => {
        this.consignaciones = (response as Consignacion[]);
      }
    );
  }

  mostrar(): void{
    this.mercadoPago = !this.mercadoPago;
  }

   // Se crea metodo invocado por el formulario
   public pagar(consignacion: Consignacion): void{
    // Se llama el metodo de la clase de servicio y se suscribe al observable
    this.consignacionService.crearGastoConsignacion(consignacion, this.mercadoPago).subscribe(
        // Se cambia a json que es lo que recibe
        json => {
        // Metodo de sweetAlert
        Swal.fire('Consignacion', `Pago de consiganacion creado con exito!`, 'success');
        this.ngOnInit();
      },
      // Recorrido de errores del backend
      err => {
        this.errores =  err.error.errores as string[];
        console.error('Codigo del error desde el backend ' + err.status);
        console.error(err.error.errores);
      }
    );
  }

}
