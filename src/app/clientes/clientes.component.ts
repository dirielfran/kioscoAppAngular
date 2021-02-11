import { Component, OnInit } from '@angular/core';
// Se importa la clase cliente
import { Cliente } from './cliente';
// Se importa la clase de servicio
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
// Se importa la libreria de sweetAlert ya instalada
import Swal from 'sweetalert2';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { CajaService } from '../caja/caja.service';
import { Caja } from '../caja/caja';
import { ItemFactura } from '../facturas/models/item-factura';
import { RetiromodalService } from '../components/retiro/retiromodal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  // Se crea la lista de objs Cliente
  clientes: Cliente[];
  // Atributo para la paginacion
  paginador: any;
  // Atributo para el upload
  clienteSeleccionado: Cliente;
  clienteSeleccionadoRetiro: Cliente;
  caja: Caja = new Caja();
  // arreglo para los errores
  public errores: string[];
  clienteConEstado: number;
  loading = false;
  habilitado = true;

  cajaEstado: boolean;

  // Se crea variable en el const. y se le inyecta la clase de servicio
  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              public modalService: ModalService,
              public retiromodalService: RetiromodalService,
              private cajaService: CajaService,
              private router: Router,
              public authService: AuthService) { }

  // Se crea cuando se inicia el componente
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.cargarEstado();
    // Se le añade observador paramMap
    this.activatedRoute.paramMap.subscribe( params => {
        // Se agrega atributo que recupera la pagina dinamicamente
        let page: number = +params.get('page');
        if (!page){
          page = 0;
        }
        // se suscribe el observable al observador
        // Observador
        // ae añade pipe, para añadir operadores
        this.clienteService.getClientes(page).pipe(
          tap(response => {
              (response.content as Cliente[]).forEach(element => {/* console.log(element.nombre) */});
          })
        ).subscribe(
          // funcion anonima
          // observador, actualiza el listado de clientes
          response => {
            this.clientes = (response.content as Cliente[]);
            // Se da valor al paginador
            this.paginador = response;
          });
      });

    this.modalService.notificarUpload.subscribe( cliente => {
        this.clientes = this.clientes.map(clienteOriginal => {
          if (cliente.id === clienteOriginal.id){
            clienteOriginal.foto = cliente.foto;
          }
          return clienteOriginal;
        });
      });
    this.clienteEstado();
  }

  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Esta usted seguro?',
      text: `Desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente );
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con exito.`,
              'success'
            );
          }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La opcion de eliminar ha sido cancelada.',
          'error'
        );
      }
    });
  }

  abrirModal(cliente: Cliente): void{
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

  abrirRetiro(cliente: Cliente): void{
    this.clienteSeleccionadoRetiro = cliente;
    this.retiromodalService.abrirModal();
  }

  abrirCaja(idCliente: number): void{
    this.habilitado = false;
    this.cajaEstado = true;
    this.caja.cliente = this.clientes.find(cliente => cliente.id === idCliente);
    this.clientes = this.clientes.filter(cliente => cliente.id === idCliente);
    console.log(this.caja);
    this.cajaService.createCaja(this.caja).subscribe(
      json => {
        Swal.fire('Caja', `Caja ${json.caja.id} en estado Open!`, 'success');
      },
      // Recorrido de errores del backend
      err => {
        this.errores =  err.error.errores as string[];
        console.error('Codigo del error desde el backend ' + err.status);
        console.error(err.error.errores);
      }
    );
  }

  cerrarCaja(idCliente: number): void{
    // Desactiva la caja
    this.cajaEstado = false;

    Swal.fire({
        title: 'Regitro de Diferencia en Caja',
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
    })
    .then(resultado => {
        if (resultado.value) {
            const diferencia = resultado.value;
            Swal.fire(`Tu diferencia registrada es de  ${diferencia}`);
            this.cajaService.cerrarCaja(+diferencia).subscribe(
              json => {
                this.ngOnInit();
                Swal.fire('Caja', `Caja  en estado Close!`, 'success');
              },
              // Recorrido de errores del backend
              err => {
                this.errores =  err.error.errores as string[];
                console.error('Codigo del error desde el backend ' + err.status);
                console.error(err.error.errores);
              }
            );
        }
    });
  }

  // Se crea metodo que llama al metodo de la clase de servicio para obtener el estado de la caja
  cargarEstado(): void{
    this.cajaService.getEstado().subscribe((estado) => {
      this.cajaEstado = estado;
    });
  }

  // Se crea metodo que llama al metodo de la clase de servicio para obtener el estado de la caja
  clienteEstado(): void{
    this.cajaService.getClienteEstado().subscribe((cliente) => {
      this.clienteConEstado = cliente;
    });
  }
}
