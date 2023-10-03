import { Component, ElementRef, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  model: any[] = [];
  modelUsuario: any[] = [];
  modelAdmin: any[] = [];
  usuario: any;
  loading = false;
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.modelAdmin = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        items: [
          {
            id: 0,
            label: 'Resumen',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: 'Clientes',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            id: 1,
            label: 'Lista',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/clientes'],
          },
          {
            id: 2,
            label: 'Crear',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/clientes/nuevo'],
          },
        ],
      },
      {
        label: 'Proveedores',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            id: 10,
            label: 'Lista',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/proveedores'],
          },
        ],
      },
      {
        label: 'Productos',
        icon: 'pi pi-fw pi-box',
        items: [
          {
            id: 11,
            label: 'Lista',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/productos'],
          },
          {
            id: 12,
            label: 'Crear',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/productos/nuevo'],
          },
        ],
      },

      {
        label: 'Colmenas',
        icon: 'pi pi-fw pi-bezier-curve',
        items: [
          {
            id: 5,
            label: 'Solicitudes',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/public/colmenas/solicitudes'],
          },
        ],
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            id: 8,
            label: 'Lista',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/usuarios'],
          },
        ],
      },
    ];
    this.modelUsuario = [
      {
        label: 'Colmenas',
        icon: 'pi pi-fw pi-bezier-curve',
        items: [
          {
            id: 3,
            label: 'Lista',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/public/colmenas'],
          },
          {
            id: 4,
            label: 'Crear',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/public/colmenas/nuevo'],
          },
        ],
      },
    ];
    this.getUsuario();
  }

  getUsuario() {
    this.loading = true;
    this.userService.user$.subscribe((user) => {
      this.usuario = user;
      if (this.usuario.rol == 'USER_ROLE') {
        this.router.navigate(['/public/colmenas']);
        this.model = this.modelUsuario;
      }
      if (this.usuario.rol == 'ADMIN_ROLE') {
        this.model = this.modelAdmin;
      }
      this.loading = false;
    });
  }
}
