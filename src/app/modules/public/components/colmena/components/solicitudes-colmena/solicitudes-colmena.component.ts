import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ColmenaService } from '../../services/colmena.service';
import { Table } from 'primeng/table';
import { Colmena } from '../../entities/colmena.entity';

@Component({
  selector: 'app-solicitudes-colmena',
  templateUrl: './solicitudes-colmena.component.html',
  styleUrls: ['./solicitudes-colmena.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class SolicitudesColmenaComponent implements OnInit {
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
    private colmenaService: ColmenaService
  ) {}

  ngOnInit(): void {
    this.getColmenas();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getColmenas(): void {
    this.colmenaService.solicitudesColmena().subscribe((res: any) => {
      this.listaColmenas = res;
      console.log(this.listaColmenas);
    });
  }

  aceptarColmena(id: string): void {
    this.confirmationService.confirm({
      key: 'confirm',
      message: '¿Está seguro que desea aceptar esta solicitud?',
      accept: () => {
        this.colmenaService.aceptarColmena(id).subscribe((res: any) => {
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Aceptada',
            detail: 'Solicitud aceptada',
          });
          this.getColmenas();
        });
      },
    });
  }

  rechazarColmena(id: string): void {
    this.confirmationService.confirm({
      key: 'confirm',
      message: '¿Está seguro que desea rechazar esta solicitud?',
      accept: () => {
        this.colmenaService.rechazarColmena(id).subscribe((res: any) => {
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Rechazada',
            detail: 'Solicitud rechazada',
          });
          this.getColmenas();
        });
      },
    });
  }
}
