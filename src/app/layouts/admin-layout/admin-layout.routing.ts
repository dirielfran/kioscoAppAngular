import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { GastosComponent } from '../../components/gastos/gastos.component';
import { FormComponent } from '../../clientes/form.component';
import { ClientesComponent } from '../../clientes/clientes.component';
import { ProductofComponent } from '../../producto/productof.component';
import { ProductoComponent } from '../../producto/producto.component';
import { CajaComponent } from '../../caja/caja.component';
import { GastosformComponent } from '../../components/gastos/form/gastosform/gastosform.component';
import { GastosDetalleComponent } from '../../components/gastos/detalle/gastos-detalle/gastos-detalle.component';
import { InventariosComponent } from '../../inventarios/inventarios.component';
import { InventarioformComponent } from '../../inventarios/inventarioform.component';
import { DetalleInventarioComponent } from '../../inventarios/detalle-inventario/detalle-inventario.component';
import { ConsignacionComponent } from '../../components/consignacion/consignacion.component';
import { LoginComponent } from '../../usuarios/login.component';
import { DetalleFacturaComponent } from '../../facturas/detalle-factura.component';
import { FacturasComponent } from '../../facturas/facturas.component';

import { AuthGuard } from '../../usuarios/guards/auth.guard';
import { RoleGuard } from '../../usuarios/guards/role.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // },
    { path: 'dashboard',              component: DashboardComponent },
    { path: 'productos',              component: ProductoComponent,},
    { path: 'clientes',               component: ClientesComponent, },
    { path: 'cajas',                  component: CajaComponent, },
    { path: 'gastos',                 component: GastosComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    { path: 'inventarios',            component: InventariosComponent, },
    { path: 'consignacion',           component: ConsignacionComponent, },
    
    // Ruta con paginacion
    { path: 'productos/page/:page',   component: ProductoComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
    { path: 'gastos/page/:page',      component: GastosComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    { path: 'cajas/page/:page',       component: CajaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
    { path: 'inventarios/page/:page', component: InventariosComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},

    // Se mapea la ruta al formulario
    { path: 'clientes/form',          component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    { path: 'productos/form',         component: ProductofComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    { path: 'gastos/form',            component: GastosformComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    { path: 'inventarios/form',       component: InventarioformComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    

      // Url dond se renderiza metodo que busca cliente por id
    { path: 'clientes/form/:id',      component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    { path: 'productos/form/:id',     component: ProductofComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    { path: 'gastos/:id',             component: GastosDetalleComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
    { path: 'inventarios/:id',        component: DetalleInventarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},  
    { path: 'facturas/:id',           component: DetalleFacturaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
    { path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_USER'}},
    

    { path: 'user-profile',          component: UserProfileComponent },
    { path: 'table-list',            component: TableListComponent },
    { path: 'typography',            component: TypographyComponent },
    { path: 'icons',                 component: IconsComponent },
    { path: 'maps',                  component: MapsComponent },
    { path: 'notifications',         component: NotificationsComponent },
    { path: 'upgrade',               component: UpgradeComponent },
];
