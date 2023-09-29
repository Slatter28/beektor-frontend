import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CrearClienteComponent implements OnInit {
  clienteForm!: UntypedFormGroup;
  loading = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _formBuilder: UntypedFormBuilder,
    private clienteService: ClientService
  ) {}

  ngOnInit(): void {
    this.clienteForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
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
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  saveCliente(): void {
    if (this.clienteForm.valid) {
      this.loading = true;
      this.clienteService
        .createCliente(this.clienteForm.value)
        .subscribe((resp: any) => {
          this.loading = false;
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Cliente',
            detail: 'Cliente creado correctamente',
          });
          this.clienteForm.reset();
        });
    } else {
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Cliente',
        detail: 'Por favor ingrese todos los campos',
      });
    }
  }
}
