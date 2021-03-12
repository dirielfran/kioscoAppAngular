import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CajaService } from './caja.service';
import { Caja } from './caja';
import { AuthService } from '../usuarios/auth.service';
@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  // Se crea la lista de objs Cliente
  cajas: Caja[];
  // Atributo para la paginacion
  paginador: any;

  constructor(  private activatedRoute: ActivatedRoute,
                private cajaService: CajaService,
                private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      // Se agrega atributo que recupera la pagina dinamicamente
      let page: number = +params.get('page');
      if (!page){
        page = 0;
      }
      // se suscribe el observable al observador
      // Observador
      // se añade pipe, para añadir operadores
      this.cajaService.getCajas(page).subscribe(
        // funcion anonima
        // observador, actualiza el listado de clientes
        response => {
          this.cajas = (response.content as Caja[]);
          // Se da valor al paginador
          this.paginador = response;
        });
    });
  }
}
