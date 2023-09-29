import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProveedorComponent } from './components/lista-proveedor/lista-proveedor.component';

const routes: Routes = [
  {
    path: '',
    component: ListaProveedorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedorRoutingModule {}
