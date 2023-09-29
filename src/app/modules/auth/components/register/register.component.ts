import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class RegisterComponent implements OnInit {
  registerInForm!: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.registerInForm = this._formBuilder.group({
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmar: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register(): void {
    console.log(this.registerInForm.value);

    if (this.registerInForm.invalid) {
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario invalido',
      });
      return;
    }

    if (
      this.registerInForm.value.contrasena !==
      this.registerInForm.value.confirmar
    ) {
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error',
        detail: 'Las contraseñas no coinciden',
      });
      return;
    }
    this.registerInForm.disable();
    this._authService.register(this.registerInForm.value).subscribe(
      (res) => {
        this.messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Usuario',
          detail: 'Usuario creado correctamente',
        });
        this.registerInForm.enable();
        this._router.navigate(['/auth']);
      },
      (err) => {
        console.log(err);
        this.registerInForm.enable();
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Error',
          detail: err.error.msg,
        });
      }
    );
  }
}
