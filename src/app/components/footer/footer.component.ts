import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  public author: any = {nombre: "Elvis", apellido:"Areiza"};
  
  constructor() { }

  ngOnInit() {
  }

}
