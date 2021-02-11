import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
//import { FormComponent } from './clientes/form.component';
import { LoginComponent } from './usuarios/login.component';
//import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
//import { FacturasComponent } from './facturas/facturas.component';
//import { ProductoComponent } from './producto/producto.component';
//import { ProductofComponent } from './producto/productof.component';
//import { CajaComponent } from './caja/caja.component';
//import { InventariosComponent } from './inventarios/inventarios.component';
//import { InventarioformComponent } from './inventarios/inventarioform.component';
//import { DetalleInventarioComponent } from './inventarios/detalle-inventario/detalle-inventario.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
//import { GastosComponent } from './components/gastos/gastos.component';
//import { GastosformComponent } from './components/gastos/form/gastosform/gastosform.component';
//import { GastosDetalleComponent } from './components/gastos/detalle/gastos-detalle/gastos-detalle.component';
//import { ConsignacionComponent } from './components/consignacion/consignacion.component';

// Se crea constante que contiene arreglo con las rutas
// Se definen todas las rutas de la aplicacion
const APP_ROUTES: Routes =[
  // ruta por defecto de la aplicacion
  //{path: '', redirectTo: '/clientes', pathMatch: 'full'},
  //{path: 'clientes', component: ClientesComponent},
  //{path: 'productos', component: ProductoComponent},
  //{path: 'cajas', component: CajaComponent},
  //{path: 'inventarios', component: InventariosComponent},
  //{path: 'gastos', component: GastosComponent},
  //{path: 'consignacion', component: ConsignacionComponent},

  // Ruta con paginacion
  //{path: 'clientes/page/:page', component: ClientesComponent},
  //{path: 'productos/page/:page', component: ProductoComponent},
  //{path: 'cajas/page/:page', component: CajaComponent},
  //{path: 'inventarios/page/:page', component: InventariosComponent},
  //{path: 'gastos/page/:page', component: GastosComponent},
  // Se mapea la ruta al formulario
  //{path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  //{path: 'productos/form', component: ProductofComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  //{path: 'inventarios/form', component: InventarioformComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  //{path: 'gastos/form', component: GastosformComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},


  // Url dond se renderiza metodo que busca cliente por id
  // {path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  //{path: 'productos/form/:id', component: ProductofComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},

  //{path: 'login', component: LoginComponent},
  //{path: 'facturas/:id', component: DetalleFacturaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
  //{path: 'inventarios/:id', component:  DetalleInventarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  //{path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  //{path: 'gastos/:id', component:  GastosDetalleComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  
  { path: 'login',                  component: LoginComponent},

];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
