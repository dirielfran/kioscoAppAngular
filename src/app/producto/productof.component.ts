import { Component, OnInit } from '@angular/core';
import { Producto } from '../facturas/models/producto';
import { Router, ActivatedRoute} from '@angular/router';
import { ProductoService } from './producto.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productof',
  templateUrl: './productof.component.html',
  styleUrls: ['./productof.component.css']
})
export class ProductofComponent implements OnInit {
  //Se crea atributo de la clase databinding con el form
  public producto: Producto = new Producto();
  //Se crea atributo de titulo que se renderiza en el formulario
  public  titulo: string ='Crear Producto';
  //arreglo para los errores
  public errores: string[];

  //Se instancia atributos en el constructor
  constructor(private productoService: ProductoService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //Se llama al metodo cargar producto
    this.cargarProducto();
  }
  //Se crea metodo que llama al metodo de la clase de servicio para obtener producto por id
  cargarProducto(): void{
    //Obtine los parametros del formulario
    this.actRoute.params.subscribe(
      params => {
        //Obtirene el valor del id
        let id = params['id'];
        if(id){
          //Se llama al metodo de la clase de servicio
          this.productoService.getProducto(id).subscribe(
            producto => this.producto = producto
          )
        }
      }
    )
  }

  //Se crea metodo invocado por el formulario
  public create(): void{
    //Se llama al metodo de la clase de servicio
    this.productoService.createProducto(this.producto).subscribe(
      json => {
        this.router.navigate(['/productos']);
        Swal.fire('Nuevo Producto',
          `Producto ${json.producto.nombre} creado con exito`,
          'success'
        )
      },
      //Recorrido de errorres del backend
      err => {
        this.errores = err.error.errores as string[];
        console.error('Codigo del error desde el backend '+err.status);
        console.error(err.error.errores);
      }
    )
  }

  //Metodo update de producto
  update():void{

    //Se llama a la clase de servici y se suscribe al metodo update
    this.productoService.update(this.producto).subscribe(

      producto => {
        //Se navega hasta la url clientes
        this.router.navigate(['/productos'])
        //Se realiza interpolacion `` para poder mostrar el nombre del cliente modificado
        Swal.fire('Producto Actualizado', `Producto ${producto.nombre} actualizado con exito!`, 'success')
      },
      //Recorrido de errores del backend
      err => {
        this.errores =  err.error.errores as string[];
        console.error('Codigo del error desde el backend '+err.status);
        console.error(err.error.errores);
      }
    )
  }

}
