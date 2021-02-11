import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosformComponent } from './gastosform.component';

describe('GastosformComponent', () => {
  let component: GastosformComponent;
  let fixture: ComponentFixture<GastosformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
