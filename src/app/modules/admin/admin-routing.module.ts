import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./components/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'proveedores',
    loadChildren: () =>
      import('./components/proveedor/proveedor.module').then(
        (m) => m.ProveedorModule
      ),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./components/producto/producto.module').then(
        (m) => m.ProductoModule
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./components/usuarios/usuarios.module').then(
        (m) => m.UsuariosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
