import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService } from '../usuarios/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class DashboardComponent implements OnInit {
  basicData: any;

  basicOptions: any;
  loading = false;
  dataUsuarios: any;
  UsuarioOption: any;
  totalUser = 0;

  dataProveedor: any;
  ProveedorOption: any;
  totalProveedor = 0;

  dataColmenasVendidas: any;
  ColmenasVendidasOption: any;
  totalColmenasVendidas = 0;

  dataSensores: any;
  SensoresOption: any;
  totalSensores = 0;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.getDashboard();
  }

  getDashboard(): void {
    this.loading = true;
    this.usuarioService.getDashboard().subscribe(
      (res: any) => {
        console.log(res);
        this.totalUser = res.usuarios.length;

        this.dataUsuarios = {
          labels: ['Usuarios'],
          datasets: [
            {
              label: 'Usuarios',
              backgroundColor: '#66BB6A',
              data: [res.usuarios.length],
            },
          ],
        };
        this.UsuarioOption = {
          plugins: {
            legend: {
              labels: {
                color: '#495057',
              },
            },
            title: {
              display: true,
              text: 'Usuarios registrados',
              fontSize: 16,
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
            y: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
          },
        };

        this.totalProveedor = res.proveedores.length;
        this.dataProveedor = {
          labels: ['Proveedores'],
          datasets: [
            {
              label: 'Proveedores',
              backgroundColor: '#68346A',
              data: [res.proveedores.length],
            },
          ],
        };

        this.ProveedorOption = {
          plugins: {
            legend: {
              labels: {
                color: '#495057',
              },
            },
            title: {
              display: true,
              text: 'Proveedores registrados',
              fontSize: 16,
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
            y: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
          },
        };

        this.totalColmenasVendidas = res.colmenasVendidas.length;

        this.dataColmenasVendidas = {
          labels: ['Colmenas vendidas'],
          datasets: [
            {
              label: 'Colmenas vendidas',
              backgroundColor: '#FFA726',
              data: [res.colmenasVendidas.length],
            },
          ],
        };

        this.ColmenasVendidasOption = {
          plugins: {
            legend: {
              labels: {
                color: '#495057',
              },
            },
            title: {
              display: true,
              text: 'Colmenas vendidas',
              fontSize: 16,
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
            y: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
          },
        };

        this.totalSensores = res.sensores.length;

        this.dataSensores = {
          labels: ['Sensores'],
          datasets: [
            {
              label: 'Sensores',
              backgroundColor: '#FF7043',
              data: [res.sensores.length],
            },
          ],
        };

        this.SensoresOption = {
          plugins: {
            legend: {
              labels: {
                color: '#495057',
              },
            },
            title: {
              display: true,
              text: 'Sensores registrados',
              fontSize: 16,
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
            y: {
              ticks: {
                color: '#495057',
              },
              grid: {
                color: '#ebedef',
              },
            },
          },
        };

        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener el dashboard',
        });
      }
    );
  }
}
