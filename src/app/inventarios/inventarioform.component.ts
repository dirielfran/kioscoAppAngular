import { Component, OnInit } from '@angular/core';
import { Inventario } from './inventario';
// Se importan las librerias para el autocomplete de anfular material
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { Producto } from '../facturas/models/producto';
import { InventarioService } from './inventario.service';
import { FacturasService } from '../facturas/services/facturas.service';
import { ActivatedRoute, Router } from '@angular/router';
import {map, flatMap} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemInventario } from './item-inventario';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-inventarioform',
  templateUrl: './inventarioform.component.html',
  styleUrls: ['./inventarioform.component.css']
})
export class InventarioformComponent implements OnInit {

  titulo: string;
  usuario: string;
  inventario: Inventario = new Inventario();
  // Atributos del autocomplete de angular materia
  autoCompleteControl = new FormControl();
  // Areglo de productos filtrados
  productosFiltrados: Observable<Producto[]>;
  // Deshabilitar boton
  habilitado = true;
  consignacion = false;

  disabled = false;
  checked = false;
  color: ThemePalette = 'primary';

  constructor( private inventarioService: InventarioService,
               private facturasService: FacturasService,
               private ActivatedRoute: ActivatedRoute,
               private router: Router,
               public authService: AuthService
  ) { }

  ngOnInit(): void {

    this.usuario = this.authService.usuario.username;
    // recupero los productos filtrados
    this.productosFiltrados = this.autoCompleteControl.valueChanges
      .pipe(
        // retorna todos antes de que cambie el imput
        // startWith(''),
        // Evalua si el item del observable es string en caso contrario accede al atributo nambre del obj
        map(value => typeof value === 'string' ? value : value.nombre),
        // Se evalua si hay valor lo retorna en caso contrario
        flatMap(value => value ? this._filter(value) : [])
      );
  }


  mostrar(): void{
    this.consignacion = !this.consignacion;
  }

  // Metodo filter para el autocomplete de angular material
  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    // filtra el valor pasado por parametro en el arreglo de productos
    return this.facturasService.getFiltroProducto(filterValue);
  }

  // Metodo que resuelve el nombre del producto en la vista
  public mostrarNombre(producto?: Producto): string | undefined{
    return producto ? producto.nombre : undefined;
  }

  actCantidad(idProducto: number, event: any): void{
    // Se obtiene la cantidad del objeto event y se castea a number
    const cantidad = event.target.value as number;

    // Valida la cantidad, si es 0 elimina el item
    if (cantidad === 0){
      return this.deleteItem(idProducto);
    }
    // se modifica la cantidad de cada item con el map
    this.inventario.items = this.inventario.items.map((item: ItemInventario) => {
      // Se valida el id del producto para poder modificar la cantidad
      if (idProducto === item.producto.id){
        item.stockadd = cantidad;
      }
      return item;
    });
  }


  actPrecioCompra(idProducto: number, event: any): void{
    // Se obtiene la cantidad del objeto event y se castea a number
    const precio = event.target.value as number;
    // se modifica la cantidad de cada item con el map
    this.inventario.items = this.inventario.items.map((item: ItemInventario) => {
      // Se valida el id del producto para poder modificar la cantidad
      if (idProducto === item.producto.id){
        item.preciocompra = precio;
        console.log(item);
      }
      return item;
    });
  }

  actPrecioVenta(idProducto: number, event: any): void{
    // Se obtiene la cantidad del objeto event y se castea a number
    const precio = event.target.value as number;

    // se modifica la cantidad de cada item con el map
    this.inventario.items = this.inventario.items.map((item: ItemInventario) => {
      // Se valida el id del producto para poder modificar la cantidad
      if (idProducto === item.producto.id){
        item.precioventa = precio;
      }
      return item;
    });
  }



  // Metodo que captura el producto del autocomplete agrega un item a la factura
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void{
    // Se optiene el objeto del evento y se castea a producto
    const producto = event.option.value as Producto;

    // Valida si existe e incrementa, en caso contrario, crea un item a la factura
    if (this.existeItem(producto.id)){
      this.incrementaCant(producto.id);
    }else{
      // se crea nuevo itemFactura
      const newItem = new ItemInventario();
      // Se le asigna el producto al nuevo Item
      newItem.producto = producto;
      newItem.precioventa = producto.precio;
      newItem.preciocompra = producto.preciocosto;
      // Se agrega la linea a la factura
      this.inventario.items.push(newItem);
    }

    // Se blanquea el autocomplete
    this.autoCompleteControl.setValue('');
    // Se deseclecciona
    event.option.focus();
    event.option.deselect();
  }

  // valida si existe o no recorriendo la lista de items de la factura
  existeItem(idProducto: number): boolean{
    let existe = false;
    this.inventario.items.forEach((item: ItemInventario) => {
      if (idProducto === item.producto.id){
        existe = true;
      }
    });
    return existe;
  }

  // incrementa la cantidad del producto en el item
  incrementaCant(idProducto: number): void {
    this.inventario.items = this.inventario.items.map((item: ItemInventario) => {
      if (idProducto === item.producto.id){
        ++item.stockadd;
      }
      return item;
    });
  }

  // Metodo que elimina item
  deleteItem(idProducto: number): void{
    this.inventario.items = this.inventario.items.filter((item: ItemInventario) => idProducto !== item.producto.id);
  }

  // Creacion de Inventario
  crearInventario( inventarioForm ): void{
    this.habilitado = false;
    const usuario: string = this.authService.usuario.username;
    console.log(this.consignacion);
    // Se valida si la factura es igual a 0
    if (this.inventario.items.length === 0){
      this.autoCompleteControl.setErrors({ 'invalid': true});
    }
    if(inventarioForm.form.valid && this.inventario.items.length > 0){
      this.inventarioService.createInventario(this.inventario, usuario, this.consignacion).subscribe(inventario => {
        Swal.fire(this.titulo, `El inventario fue creado con exito.`, 'success');
        this.router.navigate(['/inventarios']);
      });
    }
  }

}
