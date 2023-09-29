import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ListaClienteComponent,
  },
  {
    path: 'nuevo',
    component: CrearClienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
