interface LoginUsuario {
  EMAIL: string,
  PASSWORD: string
};

interface RespuestLogin {
  message: string,
  token: string
}

export { LoginUsuario, RespuestLogin };
