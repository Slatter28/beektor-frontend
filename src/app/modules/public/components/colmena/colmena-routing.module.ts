import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaColmenaComponent } from './components/lista-colmena/lista-colmena.component';
import { CrearColmenaComponent } from './components/crear-colmena/crear-colmena.component';
import { SolicitudesColmenaComponent } from './components/solicitudes-colmena/solicitudes-colmena.component';
import { ViewColmenaComponent } from './components/view-colmena/view-colmena.component';

const routes: Routes = [
  {
    path: '',
    component: ListaColmenaComponent,
  },
  {
    path: 'nuevo',
    component: CrearColmenaComponent,
  },
  {
    path: 'solicitudes',
    component: SolicitudesColmenaComponent,
  },
  {
    path: 'view/:id',
    component: ViewColmenaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColmenaRoutingModule {}
