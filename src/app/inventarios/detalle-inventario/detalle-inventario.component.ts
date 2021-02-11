import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Inventario } from '../inventario';
import { InventarioService } from '../inventario.service';
@Component({
  selector: 'app-detalle-inventario',
  templateUrl: './detalle-inventario.component.html',
  styleUrls: ['./detalle-inventario.component.css']
})
export class DetalleInventarioComponent implements OnInit {

  inventario: Inventario;
  titulo: string = 'Inventario';

  constructor(private activatedRoute: ActivatedRoute,
    private inventarioService: InventarioService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.inventarioService.getInventario(id).subscribe(inventario => this.inventario = inventario);
    })

  }

}
