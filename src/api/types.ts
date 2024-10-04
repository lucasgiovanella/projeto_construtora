export type User = {
  id: number;
  name: string;
  email: string;
};

export type Despesa = {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  user: User;
};
