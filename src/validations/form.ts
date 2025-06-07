import type { ProposalData } from "../types/proposal";

export const isFormValid = (data: ProposalData) => {
    const { title, client, date, items } = data;
    return (
        title.trim() &&
        client.trim() &&
        date &&
        items.length > 0 &&
        items.every((item) => item.description.trim() && item.amount > 0)
    );
};