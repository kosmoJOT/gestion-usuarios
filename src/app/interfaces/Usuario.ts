interface Usuario {
  NOMBRE: string,
  APELLIDO: string,
  FECHA_NACIMIENTO: Date,
  EMAIL: string,
  ID_CARGO: number,
  PASSWORD: string
};

interface EliminarUsuario {
  EMAIL: string,
  PASSWORD: string
};

interface PeticionListaUsuarios {
  data: Usuario[],
  message: string
}
export { Usuario, EliminarUsuario, PeticionListaUsuarios };
