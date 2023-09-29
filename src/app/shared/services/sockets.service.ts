import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketsService {
  public socket: any;

  constructor() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io('http://localhost:8080', {
      transports: ['websocket', 'polling', 'flashsocket'],
      extraHeaders: {
        'my-custom-header': '1234',
      },
      query: {
        'my-custom-header': localStorage.getItem('accessToken'),
      },
    });
  }

  desconectar() {
    this.socket.on('disconnect', () => {
      console.log('desconectado');
    });
  }

  emit(event: string, payload?: any, callback?: Function): void {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return new Observable((resp) => {
      this.socket.on(event, (data: any) => {
        resp.next(data);
      });
    });
  }

  getSensores(): Observable<any> {
    return this.listen('newDataSensores');
  }
}
