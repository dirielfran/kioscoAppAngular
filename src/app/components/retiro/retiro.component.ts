import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { RetiromodalService } from '../retiro/retiromodal.service'
import { Retiro } from './retiro';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent implements OnInit {

  @Input() cliente : Cliente;
  //arreglo para los errores
  public errores: string[];
  //Se crea atributo de titulo que se renderiza en el formulario
  public  titulo: string ='Retiro de Caja';
  public retiro: Retiro = new Retiro();

  constructor( public retiromodalService: RetiromodalService,
                private router: Router) { }

  ngOnInit(): void {
    this.retiro = new Retiro();
  }

  cerrarRetiro(){
    this.retiromodalService.cerrarModal();
  }

  create():void{
    this.retiro.cliente = this.cliente;
    //monto de efectivo
    let efectivo: number = 0.0;
    let retiros: number = 0.0;
    this.cliente.facturas.forEach( factura => {
      efectivo += (factura.total - factura.mercadopago);
    });
    this.cliente.retirosCaja.forEach( retiro => {
      retiros += retiro.monto;
    });
    if (this.retiro.monto > (efectivo - retiros)){
      swal.fire('Creacion de Retiro',
                  `El monto de retiro no debe ser mayor al disponible `, 'error');
    }else{
      /* console.log(this.retiro); */
      //Se llama al metodo de la clase de servicio
      this.retiromodalService.createRetiro(this.retiro).subscribe(
        json => {
          this.router.navigate(['/clientes']);
          this.cerrarRetiro();
          swal.fire('Creacion de Retiro',
                    `Retiro registrado con exito`, 'success');
      });
    }

  }

  update(): void{

  }

}
