import { Component, OnInit } from '@angular/core';
import { Gastos } from '../../gastos';
import { GastosService } from '../../gastos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../usuarios/auth.service';

@Component({
  selector: 'app-gastosform',
  templateUrl: './gastosform.component.html',
  styleUrls: ['./gastosform.component.css']
})
export class GastosformComponent implements OnInit {

  titulo = 'Creacion de Gasto';
  gasto: Gastos = new Gastos();
  usuario: string;

  constructor( private gastoService: GastosService,
               private router: Router,
               public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.usuario.username;
  }

   // Creacion de Inventario
   crearGasto(gastoForm ): void{
    let usuario = this.authService.usuario.username;
    /* console.log(this.gasto); */

    if ( gastoForm.form.valid){
      this.gastoService.creategasto(this.gasto, usuario).subscribe(gasto => {
        Swal.fire(this.titulo, `El Gasto fue creado con exito.`, 'success');
        // this.router.navigate(['/clientes']);
        this.router.navigate(['/gastos']);
      });
    }
  }

}
