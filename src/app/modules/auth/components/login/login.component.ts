import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup;
  msgs: any[] = [];
  loading = false;
  showAlert: boolean = false;
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      correo: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
      contrasena: ['', Validators.required],
    });
  }

  padCode(event: any) {
    const code = event.target.value;
    const newCode = code.padStart(5, '0');
    this.signInForm.get('usuario')?.setValue(newCode);
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error',
        detail: 'Formulario invalido',
      });
      return;
    }

    this.loading = true;

    this._authService.signIn(this.signInForm.value).subscribe(
      () => {
        this.loading = false;

        this._router.navigateByUrl('');
      },
      (response) => {
        console.log(response);
        this.loading = false;
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Error',
          detail: response.error.msg,
        });
      }
    );
  }
}
