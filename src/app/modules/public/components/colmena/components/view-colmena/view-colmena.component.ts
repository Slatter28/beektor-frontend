import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGauge } from 'ngx-gauge';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SocketsService } from 'src/app/shared/services/sockets.service';
import { ColmenaService } from '../../services/colmena.service';

@Component({
  selector: 'app-view-colmena',
  templateUrl: './view-colmena.component.html',
  styleUrls: ['./view-colmena.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ViewColmenaComponent implements OnInit {
  gaugeType = 'arch' as const;
  gaugeValue = 0;
  gaugeValueHumedad = 0;
  gaugeLabel = 'Temperatura';
  gaugeAppendText = '°C';
  backgroundColor = '#eee';
  thresholdConfig = {
    '0': { color: 'green', bgOpacity: 0.2 },
    '40': { color: 'orange', bgOpacity: 0.2 },
    '75.5': { color: 'red', bgOpacity: 0.2 },
  };

  nombreColmena: string = '';
  loadingNombre: boolean = false;

  id: string = '';
  constructor(
    private socket: SocketsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private activated: ActivatedRoute,
    private colmenaService: ColmenaService
  ) {}

  ngOnInit(): void {
    this.getSensores();
    this.id = this.activated.snapshot.params['id'];

    this.getLastSensores();
  }

  getSensores(): void {
    this.socket.getSensores().subscribe((res: any) => {
      console.log(res);
      this.gaugeValue = parseFloat(res.temperatura);
      this.gaugeValueHumedad = parseFloat(res.humedad);
      this.messageService.add({
        key: 'tst',
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Sensores actualizados',
      });
    });
  }

  getLastSensores(): void {
    this.colmenaService.getLastSensores(this.id).subscribe((res: any) => {
      console.log(res);
      this.nombreColmena = res.colmena.nombre;
      this.loadingNombre = true;
      if (res.colmena._id == this.id) {
        this.gaugeValue = parseFloat(res.temperatura);
        this.gaugeValueHumedad = parseFloat(res.humedad);
      }
    });
  }
}
