export class Proveedor {
  _id?: string;
  nombre: string;
  direccion: string;
  telefono: string;

  constructor(
    _id: string,
    nombre: string,
    direccion: string,
    telefono: string
  ) {
    this._id = _id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
  }
}
