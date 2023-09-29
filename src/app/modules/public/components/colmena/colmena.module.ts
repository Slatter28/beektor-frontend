import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColmenaRoutingModule } from './colmena-routing.module';
import { ListaColmenaComponent } from './components/lista-colmena/lista-colmena.component';
import { CrearColmenaComponent } from './components/crear-colmena/crear-colmena.component';
import { SolicitudesColmenaComponent } from './components/solicitudes-colmena/solicitudes-colmena.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewColmenaComponent } from './components/view-colmena/view-colmena.component';
import { NgxGaugeModule } from 'ngx-gauge';

@NgModule({
  declarations: [
    ListaColmenaComponent,
    CrearColmenaComponent,
    SolicitudesColmenaComponent,
    ViewColmenaComponent,
  ],
  imports: [
    CommonModule,
    ColmenaRoutingModule,
    TableModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    MessageModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    ToggleButtonModule,
    RippleModule,
    DropdownModule,
    MessagesModule,
    CascadeSelectModule,
    InputTextModule,
    TabMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGaugeModule,
  ],
})
export class ColmenaModule {}
