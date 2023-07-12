interface Cargo {
  ID_CARGO: number,
  CARGO: string
}

interface ListaCargos {
  data: Cargo[],
  message: string
};

export { Cargo, ListaCargos };
