import { Component, OnInit } from '@angular/core';
import { Producto } from '../facturas/models/producto';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
//Se importa la clase de servicio
import { ProductoService } from './producto.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
//Se importan las librerias para el autocomplete de anfular material
import {FormControl} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {map, flatMap} from 'rxjs/operators';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  //Se crea lista de objetos Producto
  productos : Producto[];
  //Atributo para la paginacion
  paginador: any;
  //Atributo para el upload
  productoSeleccionado: Producto;
  //Areglo de productos filtrados
  productosFiltrados: Observable<Producto[]>;
  //Atributos del autocomplete de angular materia
  autoCompleteControl = new FormControl();

  //Se crea variable en el const. y se le inyecta la clase de servicio
constructor(private productoService: ProductoService,
  private activatedRoute: ActivatedRoute,
  /*public modalService: ModalService,*/
  public authService: AuthService) { }

  ngOnInit(): void {
    //Se le añade observador paramMap
    this.activatedRoute.paramMap.subscribe( params => {
      //Se agrega atributo que recupera la pagina dinamicamente
      let page:number = +params.get('page');
      if(!page){
        page =0;
      }
      this.productoService.getProductos(page).pipe().subscribe(
        response => {
          this.productos = (response.content as Producto[]);
          //Se da valor al paginador
          this.paginador = response;
        });
    });
    //recupero los productos filtrados
    this.productosFiltrados = this.autoCompleteControl.valueChanges
      .pipe(
        //retorna todos antes de que cambie el imput
        //startWith(''),
        //Evalua si el item del observable es string en caso contrario accede al atributo nambre del obj
        map(value => typeof value === 'string' ? value : value.nombre),
        //Se evalua si hay valor lo retorna en caso contrario
        flatMap(value => value ? this._filter(value): [])
      );
  }

  //Metodo filter para el autocomplete de angular material
  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    //filtra el valor pasado por parametro en el arreglo de productos
    return this.productoService.getFiltroProducto(filterValue);
  }

  //Metodo que resuelve el nombre del producto en la vista
  public mostrarNombre(producto?:Producto):string | undefined{
    return producto ? producto.nombre : undefined;
  }

  //Metodo que captura el producto del autocomplete agrega un item a la factura
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void{
    //Se optiene el objeto del evento y se castea a producto
    let producto = event.option.value as Producto;


    this.productos = [];
    this.productoService.getProducto(producto.id).subscribe(
      producto => this.productos.push(producto)
    )
    //Se blanquea el autocomplete
    this.autoCompleteControl.setValue('');
    //Se deseclecciona
    event.option.focus();
    event.option.deselect();
  }



  delete(producto: Producto): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Esta usted seguro?',
      text: `Desea eliminar el producto ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.productoService.delete(producto.id).subscribe(
          response => {
            this.productos = this.productos.filter(cli => cli !== producto);
            swalWithBootstrapButtons.fire(
              'Producto Eliminado!',
              `Producto ${producto.nombre} eliminado con exito.`,
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
