import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
// import { AuthGuard } from '../modules/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',

    loadChildren: () =>
      import('../modules/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
