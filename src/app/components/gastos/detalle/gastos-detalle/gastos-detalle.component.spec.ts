import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosDetalleComponent } from './gastos-detalle.component';

describe('GastosDetalleComponent', () => {
  let component: GastosDetalleComponent;
  let fixture: ComponentFixture<GastosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
