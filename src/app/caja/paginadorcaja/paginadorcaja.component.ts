import { Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-paginadorcaja',
  templateUrl: './paginadorcaja.component.html',
  styleUrls: ['./paginadorcaja.component.css']
})
export class PaginadorcajaComponent implements OnInit, OnChanges {

  @Input() paginador: any;
  paginas: number[];

  desde: number;
  hasta: number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

   // se activa cuando hay un cambio en el elemento paginador
  ngOnChanges( changes: SimpleChanges): void{
    let paginadorActualizado = changes['paginador'];
    if(paginadorActualizado.previousValue){
      this.initPaginator();
    }
  }

  // Se desarrolla calculo para los link de paginacion
  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5 );
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

    if (this.paginador.totalPages > 5){
      this.paginas = new Array( this.hasta - this.desde + 1 ).fill(0).map((valor, indice) => indice + this.desde);
    }else{
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
