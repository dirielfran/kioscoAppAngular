import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'paginadorprod-nav',
  templateUrl: './paginadorprod.component.html',
  styleUrls: ['./paginadorprod.component.css']
})
export class PaginadorprodComponent implements OnInit, OnChanges {

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
    const paginadorActualizado = changes['paginador'];
    if(paginadorActualizado.previousValue){
      this.initPaginator();
    }
  }

  // Se desarrolla calculo para los link de paginacion
  private initPaginator(): void {
    this.desde = Math.min(Math.max(1,this.paginador.number - 4), this.paginador.totalPages -5);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);

    if(this.paginador.totalPages > 5){
      this.paginas = new Array(this.hasta - this.desde +1).fill(0).map((valor, indice) => indice + this.desde);
    }else{
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }

}
