import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Colmena } from '../../entities/colmena.entity';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ColmenaService } from '../../services/colmena.service';
import { Table } from 'primeng/table';
import { SocketsService } from 'src/app/shared/services/sockets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-colmena',
  templateUrl: './lista-colmena.component.html',
  styleUrls: ['./lista-colmena.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ListaColmenaComponent implements OnInit {
  listaColmenas!: Colmena[];
  @ViewChild('filter') filter!: ElementRef;
  loading = false;
  estado: any[] = [
    { label: 'Habilitada', value: true },
    { label: 'Deshabilitada', value: false },
  ];
  solicitud: any[] = [
    { label: 'Aceptada', value: true },
    { label: 'Proceso', value: false },
  ];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private colmenaService: ColmenaService,
    private socket: SocketsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getColmenas();
    this.getSensores();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getColmenas(): void {
    this.colmenaService.getMyColmenas().subscribe((res: any) => {
      this.listaColmenas = res;
      console.log(this.listaColmenas);
    });
  }

  deleteColmena(id: string): void {
    this.confirmationService.confirm({
      key: 'confirm',
      message: '¿Está seguro que desea eliminar esta colmena?',
      accept: () => {
        this.colmenaService.deleteColmena(id).subscribe((res: any) => {
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Colmena eliminada correctamente',
          });
          this.getColmenas();
        });
      },
    });
  }

  cambiarEstado(colmena: Colmena): void {
    this.confirmationService.confirm({
      key: 'confirm',
      message: '¿Está seguro que desea cambiar el estado de esta colmena?',
      accept: () => {
        this.colmenaService
          .cambiarEstadoColmena(colmena._id)
          .subscribe((res: any) => {
            this.messageService.add({
              key: 'tst',
              severity: 'success',
              summary: 'Actualizado',
              detail: 'Estado de colmena actualizado correctamente',
            });
            this.getColmenas();
          });
      },
    });
  }

  getSensores(): void {
    this.socket.getSensores().subscribe((res: any) => {
      console.log(res);
    });
  }

  viewColmena(id: string): void {
    this.router.navigateByUrl(`/public/colmenas/view/${id}`);
  }
}
