import { BrowserModule } from '@angular/platform-browser';
// Se importa la constante LOCALE_ID
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
/*agrega el modulo HttpClient, que es el mecanismo que tiene
  angular para la comunicacion con el servidor remoto, atraves de peticiones
  http con dif verbos get, post, put o delete (CRUD)*/
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// DatePicker
import { MatDatepickerModule } from '@angular/material/datepicker';
//import { MatMomentDateModule } from '@angular/material-moment-adapter';
// Autocomplete de angular material
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
// Graficos
import { ChartsModule } from 'ng2-charts';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
// Se importa la clase creada
import { HeaderComponent} from './header/header.component';
// Se importa la clase FooterComponent
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import { PanginadorComponent } from './panginador/panginador.component';
import { PanginadorjComponent } from './panginadorj/panginadorj.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductofComponent } from './producto/productof.component';
import { PaginadorprodComponent } from './producto/paginadorprod/paginadorprod.component';
import { CajaComponent } from './caja/caja.component';
import { InventariosComponent } from './inventarios/inventarios.component';
import { InventarioformComponent } from './inventarios/inventarioform.component';
import { DetalleInventarioComponent } from './inventarios/detalle-inventario/detalle-inventario.component';
import { PaginadorinvComponent } from './inventarios/paginadorinv/paginadorinv.component';
import { PaginadorcajaComponent } from './caja/paginadorcaja/paginadorcaja.component';
import { LoadingComponent } from './components/comun/loading/loading.component';


// Se importa la clase de servicio
import { ClienteService } from './clientes/cliente.service';
import { ProductoService } from './producto/producto.service';
import { CajaService } from './caja/caja.service';
import { InventarioService } from './inventarios/inventario.service';


// importa el registerLocalData para localidad config
import { registerLocaleData } from '@angular/common';
// Import locale
import localeES from '@angular/common/locales/es-AR';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RetiroComponent } from './components/retiro/retiro.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { GastosformComponent } from './components/gastos/form/gastosform/gastosform.component';
import { GastosDetalleComponent } from './components/gastos/detalle/gastos-detalle/gastos-detalle.component';
import { PaggastosComponent } from './components/gastos/paginador/paggastos/paggastos.component';
import { ConsignacionComponent } from './components/consignacion/consignacion.component';

/* Rutas */
import { APP_ROUTING } from './app.routes';

// Se registra el locale
registerLocaleData(localeES, 'es');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    //MatMomentDateModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    // Se registran las rutas creadas
    APP_ROUTING,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent,
    PanginadorComponent,
    PanginadorjComponent,
    ProductoComponent,
    ProductofComponent,
    PaginadorprodComponent,
    CajaComponent,
    InventariosComponent,
    InventarioformComponent,
    DetalleInventarioComponent,
    PaginadorinvComponent,
    PaginadorcajaComponent,
    LoadingComponent,
    RetiroComponent,
    GastosComponent,
    GastosformComponent,
    GastosDetalleComponent,
    PaggastosComponent,
    ConsignacionComponent
  ],
   // Se agrega al modulo la clase de servicio
   // Se agrega confg de LOCALE_ID
   providers: [ClienteService,
    ProductoService,
    CajaService,
    InventarioService,
    {provide: LOCALE_ID, useValue: 'es' },
    MatDatepickerModule,
    //MatMomentDateModule,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
