import { Component, OnInit } from '@angular/core';
import { Gastos } from '../../gastos';
import { GastosService } from '../../gastos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gastos-detalle',
  templateUrl: './gastos-detalle.component.html',
  styleUrls: ['./gastos-detalle.component.css']
})
export class GastosDetalleComponent implements OnInit {

  gasto: Gastos;
  titulo: string = 'Gasto';

  constructor(private activatedRoute: ActivatedRoute,
    private gastoService: GastosService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.gastoService.getGasto(id).subscribe(gasto => this.gasto = gasto);
    })
  }
}
