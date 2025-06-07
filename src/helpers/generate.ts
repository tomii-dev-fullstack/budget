import type { ProposalData } from "../types/proposal";

const generateFile = async (endpoint: string, proposalToSend: ProposalData): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proposalToSend),
        });

        if (!response.ok) {
            alert('Error al generar la vista previa');
            return;
        }

        const html = await response.text();
        // Mostralo en un modal, un iframe, o un div
        document.getElementById('preview')!.innerHTML = html;
    } catch (error) {
        alert('Error al conectar con el servidor');
    }

}
export const generatePdf = (endpoint: string, proposalToSend: ProposalData): Promise<void> => {
    return generateFile(endpoint, proposalToSend);
};