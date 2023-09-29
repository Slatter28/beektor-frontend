import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { Cliente } from '../../entities/cliente.entity';
import { Table } from 'primeng/table';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ListaClienteComponent implements OnInit {
  clientes!: Cliente[];
  @ViewChild('filter') filter!: ElementRef;
  showDialogEdit = false;
  clienteSeleccionado: any = {};
  loading = false;
  constructor(
    private clienteService: ClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  showDialogEditCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.showDialogEdit = true;
  }

  getClientes(): void {
    this.loading = true;
    this.clienteService.getClientes().subscribe((resp: any) => {
      console.log(resp);
      this.clientes = resp;
      this.loading = false;
    });
  }

  deleteCliente(id: string) {
    this.confirmationService.confirm({
      key: 'confirm',
      message: '¿Está seguro que desea eliminar este cliente?',
      header: 'Confirmación',
      accept: () => {
        this.clienteService.deleteCliente(id).subscribe((resp: any) => {
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Cliente',
            detail: 'Cliente eliminado correctamente',
          });
          this.getClientes();
        });
      },
    });
  }

  updateCliente(cliente: Cliente): void {
    this.clienteService
      .updateCliente(cliente._id!, cliente)
      .subscribe((resp: any) => {
        this.messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Cliente',
          detail: 'Cliente actualizado correctamente',
        });
        this.showDialogEdit = false;
        this.getClientes();
      });
  }
}
