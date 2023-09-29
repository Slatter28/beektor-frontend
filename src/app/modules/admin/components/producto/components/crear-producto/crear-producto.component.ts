import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProveedorService } from '../../../proveedor/services/proveedor.service';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CrearProductoComponent implements OnInit {
  productoForm!: UntypedFormGroup;
  loading = false;
  proveedores: any[] = [];
  categorias: any[] = ['Temperatura', 'Humedad'];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _formBuilder: UntypedFormBuilder,
    private proveedorService: ProveedorService,
    private productoService: ProductoService
  ) {
    this.getProveedores();
  }

  ngOnInit(): void {
    this.productoForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      detalle: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      categoria: ['', Validators.required],
      proveedor: ['', Validators.required],
    });
  }

  saveProducto(): void {
    if (this.productoForm.valid) {
      this.loading = true;
      this.productoService
        .createProducto(this.productoForm.value)
        .subscribe((resp: any) => {
          this.loading = false;
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Success',
            detail: 'Proveedor creado correctamente',
          });
          this.productoForm.reset();
        });
    } else {
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, ingrese los datos correctamente',
      });
    }
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe((resp: any) => {
      this.proveedores = resp;
    });
  }
}
