import type { ProposalData } from "./proposal";

// Solo exportás el valor inicial (no el useState)
export const initialProposalData: ProposalData = {
    title: "",
    client: "",
    date: "",
    email: "",
    phone: "",
    summary: "",
    terms: "",

    items: [{ description: "", amount: 0 }],
};
