import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductoService } from 'src/app/modules/admin/components/producto/services/producto.service';
import { ColmenaService } from '../../services/colmena.service';

@Component({
  selector: 'app-crear-colmena',
  templateUrl: './crear-colmena.component.html',
  styleUrls: ['./crear-colmena.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CrearColmenaComponent implements OnInit {
  colmenaForm!: UntypedFormGroup;
  loading = false;

  productosTemperatura: any[] = [];
  productosHumedad: any[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _formBuilder: UntypedFormBuilder,
    private productoService: ProductoService,
    private colmenaService: ColmenaService
  ) {}

  ngOnInit(): void {
    this.colmenaForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      produccion: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      peso: ['', Validators.required],
      observacion: ['', Validators.required],
      productoTemperatura: ['', Validators.required],
      productoHumedad: ['', Validators.required],
    });
    this.getProductosTemperatura();
  }

  getProductosTemperatura(): void {
    this.productoService.getProducto().subscribe((res: any) => {
      res.forEach((element: any) => {
        if (element.categoria == 'Temperatura') {
          element.label = ' $ ' + element.precio + ' - ' + element.nombre;
          this.productosTemperatura.push(element);
        } else {
          element.label = ' $ ' + element.precio + ' - ' + element.nombre;
          this.productosHumedad.push(element);
        }
      });
    });
  }

  saveColmena(): void {
    if (this.colmenaForm.valid) {
      this.loading = true;
      this.colmenaService
        .createColmena(this.colmenaForm.value)
        .subscribe((resp: any) => {
          this.loading = false;
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Success',
            detail: 'Colmena creada correctamente',
          });
          this.colmenaForm.reset();
        });
    } else {
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error',
        detail: 'Debe completar todos los campos',
      });
    }
  }
}
