export interface ProposalItem {
    description: string;
    amount: number;
}

export interface ProposalData {
    title: string;
    client: string;
    email?: string; // Opcional si no siempre se usa
    phone?: string; // Opcional si no siempre se usa
    summary?: string; // Opcional si no siempre se usa
    terms?: string; // Opcional si no siempre se usa
    date: string;
    items: ProposalItem[];
}