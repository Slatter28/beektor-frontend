import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Colmena } from '../entities/colmena.entity';

@Injectable({
  providedIn: 'root',
})
export class ColmenaService {
  constructor(private http: HttpClient) {}

  getMyColmenas(): Observable<any> {
    return this.http.get<any>('api/colmenas/myColmenas').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getColmenas(): Observable<any> {
    return this.http.get<any>('api/colmenas').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  createColmena(colmena: Colmena): Observable<any> {
    return this.http.post<any>('api/colmenas', colmena).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteColmena(id: string): Observable<any> {
    return this.http.delete<any>(`api/colmenas/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  solicitudesColmena(): Observable<any> {
    return this.http.get<any>('api/colmenas/solicitudes').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  aceptarColmena(id: string): Observable<any> {
    return this.http.put<any>(`api/colmenas/solicitud/${id}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  rechazarColmena(id: string): Observable<any> {
    return this.http.put<any>(`api/colmenas/rechazar/${id}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  cambiarEstadoColmena(id: string): Observable<any> {
    return this.http.put<any>(`api/colmenas/cambiarEstado/${id}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getLastSensores(id: string): Observable<any> {
    return this.http.get<any>(`api/sensores/lastSensorByColmena/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
