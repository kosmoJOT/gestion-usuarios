interface Usuario {
  NOMBRE: string,
  APELLIDO: string,
  FECHA_NACIMIENTO: Date,
  EMAIL: string,
  CARGO: string,
  PASSWORD: string
};

interface PeticionListaUsuarios {
  data: Usuario[],
  message: string
}
export { Usuario, PeticionListaUsuarios };
