import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../entities/producto.entity';
import { Table } from 'primeng/table';
import { ProveedorService } from '../../../proveedor/services/proveedor.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ListaProductoComponent implements OnInit {
  producto!: Producto[];
  @ViewChild('filter') filter!: ElementRef;
  showDialogEdit = false;
  productoSeleccionado: any = {};
  loading = false;
  categorias: any[] = ['Temperatura', 'Humedad'];
  proveedores: any[] = [];

  constructor(
    private messageService: MessageService,
    private productoService: ProductoService,
    private confirmationService: ConfirmationService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.getProductos();
    this.getProveedores();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  showDialogEditProducto(producto: Producto): void {
    this.productoSeleccionado = producto;
    console.log(this.productoSeleccionado);
    this.showDialogEdit = true;
  }

  getProductos(): void {
    this.loading = true;
    this.productoService.getProducto().subscribe((resp: any) => {
      console.log(resp);
      this.producto = resp;
      this.loading = false;
    });
  }

  deleteProducto(id: string) {
    this.confirmationService.confirm({
      key: 'confirm',
      message: '¿Está seguro que desea eliminar este producto?',
      header: 'Confirmación',
      accept: () => {
        this.productoService.deleteProducto(id).subscribe((resp: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Producto eliminado correctamente',
          });
          this.getProductos();
        });
      },
    });
  }

  updateProducto(producto: Producto) {
    this.productoService
      .updateProducto(producto._id!, producto)
      .subscribe((resp: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: 'Producto actualizado correctamente',
        });
        this.getProductos();
        this.showDialogEdit = false;
        this.productoSeleccionado = {};
      });
  }

  getProveedores(): void {
    this.proveedorService.getProveedores().subscribe((resp: any) => {
      this.proveedores = resp;
      console.log(this.proveedores);
    });
  }
}
