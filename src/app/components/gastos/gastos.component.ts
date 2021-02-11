import { Component, OnInit } from '@angular/core';
import { Gastos } from './gastos';
import { GastosService } from './gastos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../usuarios/auth.service';
import Swal from 'sweetalert2';
import { Cajachica } from './cajachica';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  gastos: Gastos[];
  // Atributo para la paginacion
  paginador: any;
  caja: Cajachica;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(  private ActivatedRoute: ActivatedRoute,
                private gastoService: GastosService,
                private router: Router,
                public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe( params => {
      // Se agrega atributo que recupera la pagina dinamicamente
      let pagina = +params.get('page');
      if ( !pagina ){
        pagina = 0;
      }
      this.gastoService.getGastos(pagina).subscribe(
        response => {
          this.gastos = (response.content as Gastos[]);
          // Se da valor al paginador
          this.paginador = response;
        }
      );
    });
    this.gastoService.getCaja().subscribe(
      response => {
        this.caja = response as Cajachica;
      }
    );
  }

  delete(gasto: Gastos): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Esta usted seguro?',
      text: `Desea eliminar el gasto ${gasto.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.gastoService.delete(gasto.id).subscribe(
          response => {
            this.gastos = this.gastos.filter(item => item !== gasto);
            swalWithBootstrapButtons.fire(
              'Gasto Eliminado!',
              `Gasto ${gasto.id} eliminado con exito.`,
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

}
