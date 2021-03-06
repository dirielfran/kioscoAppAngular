import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/clientes', title: 'Usuarios',  icon: 'flutter_dash', class: '' },
    { path: '/productos', title: 'Productos',  icon: 'bubble_chart', class: '' },
    { path: '/gastos', title: 'Gastos',  icon: 'paid', class: '' },
    { path: '/cajas', title: 'Cajas',  icon: 'savings', class: '' },
    { path: '/inventarios', title: 'Inventarios',  icon: 'list_alt', class: '' },
    { path: '/consignacion', title: 'Consignacion',  icon: 'mediation', class: '' },
 /*   { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' }*/
];

export const ROUTESUSER: RouteInfo[] = [
  { path: '/clientes', title: 'Usuarios',  icon: 'flutter_dash', class: '' },
  { path: '/productos', title: 'Productos',  icon: 'bubble_chart', class: '' },
  { path: '/cajas', title: 'Cajas',  icon: 'savings', class: '' },
  { path: '/inventarios', title: 'Inventarios',  icon: 'list_alt', class: '' },
  { path: '/consignacion', title: 'Consignacion',  icon: 'mediation', class: '' },
/*   { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' }*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  bandera: boolean = false;

  constructor( private authService: AuthService) { }

  ngOnInit() {
    this.bandera = this.authService.hasRole('ROLE_ADMIN');
    console.log(this.bandera);
    this.menuItems = !this.bandera ? ROUTESUSER.filter(menuItem => menuItem) : ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
