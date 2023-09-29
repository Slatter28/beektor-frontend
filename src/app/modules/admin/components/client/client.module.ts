import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ListaClienteComponent } from './components/lista-cliente/lista-cliente.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [ListaClienteComponent, CrearClienteComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
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
export class ClientModule {}
