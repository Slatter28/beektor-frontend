import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cliente } from '../entities/cliente.entity';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getClientes(): Observable<any> {
    return this.http.get<any>('api/clientes').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCliente(id: number): Observable<any> {
    return this.http.get<any>('api/clientes/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  createCliente(cliente: any): Observable<any> {
    return this.http.post<any>('api/clientes', cliente).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateCliente(id: any, cliente: Cliente): Observable<any> {
    return this.http.put<any>(`api/clientes/${id}`, cliente).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteCliente(id: string): Observable<any> {
    return this.http.delete<any>('api/clientes/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
