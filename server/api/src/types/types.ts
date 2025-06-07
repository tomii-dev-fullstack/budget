// Tipado para los datos de la propuesta (ajustalo según tu modelo real)
export interface ProposalItem {
  description: string;
  amount: number;
}

export interface Proposal {
  title: string;
  client: string;
  date: string;
  items: ProposalItem[];
}