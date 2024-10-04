interface Despesas {
  id: string;
  preco: string; 
  data_lancamento: string; 
  fornecedor_id: string; 
  num_nota: string; 
  categorias_id: string;
  empreendimento_id: string; 
}

interface Receitas {
  id: string;
  preco: string; 
  descricao: string;
  data_lanc: string;
  empreendimento_id: string;
}
