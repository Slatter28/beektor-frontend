import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/modules/auth/interfaces/user';
import { UsuariosService } from '../../services/usuarios.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ListaUsuariosComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  loading = false;
  listaUsuarios!: User[];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getUsuarios(): void {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe(
      (res: any) => {
        this.listaUsuarios = res.usuarios;
        console.log(this.listaUsuarios);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener los usuarios',
        });
      }
    );
  }

  hacerAdmin(id: any): void {
    this.usuarioService.putAdmin(id).subscribe(
      (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Se ha hecho admin al usuario',
        });
        this.getUsuarios();
      },
      (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al hacer admin al usuario',
        });
      }
    );
  }

  quitarAdmin(id: any): void {
    this.usuarioService.putUsuario(id).subscribe(
      (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Se ha hecho usuario al usuario',
        });
        this.getUsuarios();
      },
      (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al hacer usuario al usuario',
        });
      }
    );
  }
}
