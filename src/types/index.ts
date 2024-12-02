export interface Despesas {
  id: string;
  data_lancamento: string;
  categorias_id: string;
  fornecedor_id: string;
  num_nota: string;
  preco: number;
  descricao: string;
  empreendimento_id: string;
  categoria_nome?: string; // Novo campo
  fornecedor_nome?: string; // Novo campo
  empreendimento_nome?: string; // Novo campo
}

export interface Entradas {
  id: string;
  data_lanc: string;
  data_pag?: string;
  preco?: number;
  descricao?: string;
  categorias_id?: string;
  empreendimento_id?: string;
  clientes_id?: string;
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
