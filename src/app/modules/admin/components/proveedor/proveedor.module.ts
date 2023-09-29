import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ListaProveedorComponent } from './components/lista-proveedor/lista-proveedor.component';
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

@NgModule({
  declarations: [ListaProveedorComponent],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
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
  ],
})
export class ProveedorModule {}
