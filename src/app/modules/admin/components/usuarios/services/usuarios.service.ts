import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get<any>('api/usuarios').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  putAdmin(id: any): Observable<any> {
    return this.http.get<any>(`api/usuarios/admin/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  putUsuario(id: any): Observable<any> {
    return this.http.get<any>(`api/usuarios/user/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getDashboard(): Observable<any> {
    return this.http.get<any>('api/dashboard').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
