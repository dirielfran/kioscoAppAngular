import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from './inventario.service';
import { Inventario } from './inventario';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {

  inventarios: Inventario[];
  //Atributo para la paginacion
  paginador: any;
  constructor( private ActivatedRoute: ActivatedRoute,
                private router: Router,
                public authService: AuthService,
                private inventarioService:InventarioService) { }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe( params => {
      //Se agrega atributo que recupera la pagina dinamicamente
      let pagina = +params.get('page');
      if(!pagina){
        pagina = 0;
      }
      this.inventarioService.getInventarios(pagina).subscribe(
        response => {
          this.inventarios = (response.content as Inventario[]);
          /* console.log(this.inventarios); */
          //Se da valor al paginador
          this.paginador = response;
        }
      )
    })
  }

  delete(inventario: Inventario): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta usted seguro?',
      text: `Desea eliminar el inventario ${inventario.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.inventarioService.delete(inventario.id).subscribe(
          response => {
            this.inventarios = this.inventarios.filter(item => item !== inventario);
            swalWithBootstrapButtons.fire(
              'Inventario Eliminado!',
              `Inventario ${inventario.id} eliminado con exito.`,
              'success'
            )
          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La opcion de eliminar ha sido cancelada.',
          'error'
        )
      }
    })
  }
}
