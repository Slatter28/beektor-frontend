import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from '../../entities/proveedor.entity';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProveedorService } from '../../services/proveedor.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ListaProveedorComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  loading = false;
  listaProveedor!: Proveedor[];
  showDialogEdit = false;
  showDialogCreate = false;
  proveedorSeleccionado: any = {};
  proveedorForm!: UntypedFormGroup;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private proveedorService: ProveedorService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.getProveedores();
    this.proveedorForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  showDialogEditProveedor(proveedor: Proveedor): void {
    this.proveedorSeleccionado = proveedor;
    this.showDialogEdit = true;
  }

  getProveedores(): void {
    this.loading = true;
    this.proveedorService.getProveedores().subscribe((resp: any) => {
      this.listaProveedor = resp;
      this.loading = false;
    });
  }

  deleteProveedor(id: string) {
    this.confirmationService.confirm({
      key: 'confirm',
      message: '¿Está seguro que desea eliminar este proveedor?',
      header: 'Confirmación',
      accept: () => {
        this.proveedorService.deleteProveedor(id).subscribe((resp: any) => {
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Correcto',
            detail: 'Proveedor eliminado correctamente',
          });
          this.getProveedores();
        });
      },
    });
  }

  updateProveedor(proveedor: Proveedor) {
    this.proveedorService
      .updateProveedor(proveedor._id!, proveedor)
      .subscribe((resp: any) => {
        this.messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Correcto',
          detail: 'Proveedor actualizado correctamente',
        });
        this.getProveedores();
      });
  }

  saveProveedor(): void {
    if (this.proveedorForm.valid) {
      this.loading = true;
      this.proveedorService
        .createProveedor(this.proveedorForm.value)
        .subscribe((resp: any) => {
          this.loading = false;
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Correcto',
            detail: 'Proveedor creado correctamente',
          });
          this.proveedorForm.reset();
          this.getProveedores();
        });
    } else {
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario inválido',
      });
    }
  }
}
