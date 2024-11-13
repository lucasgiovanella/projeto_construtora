export interface Despesas {
  id: string;
  data_lancamento: string;
  fornecedor_id: string;
  num_nota: string;
  preco: number;
  descricao: string;
  empreendimento_id: string;
  empreendimento_nome: string;
  categoria_nome: string;
}

export interface Receitas {
  id: string;
  preco: string;
  descricao: string;
  data_lanc: string;
  empreendimento_id: string;
}

export interface Categoria {
  id: string;
  nome: string;
}

export interface Empreendimento {
  id: string;
  nome: string;
}
