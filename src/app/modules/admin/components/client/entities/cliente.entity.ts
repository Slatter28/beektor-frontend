export class Cliente {
  _id?: string;
  nombre: string;
  apellido: string;
  cedula: string;
  correo: string;
  telefono: string;
  direccion: string;

  constructor(
    _id: string,
    nombre: string,
    apellido: string,
    cedula: string,
    correo: string,
    telefono: string,
    direccion: string
  ) {
    this._id = _id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.correo = correo;
    this.telefono = telefono;
    this.direccion = direccion;
  }
}
