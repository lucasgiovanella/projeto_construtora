export interface Despesas {
  id: number;
  data_lancamento: string;
  data_pagamento?: string;
  fornecedor_id: number;
  categorias_id: number;
  empreendimento_id: number;
  num_nota: string;
  preco: number;
  descricao: string;
  fornecedor_nome?: string;
  categoria_nome?: string;
  empreendimento_nome?: string;
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
  id: number;
  nome: string;
}

export interface Fornecedor {
  id: number;
  nome: string;
  razaosocial: string;
  cnpj: string;
}
