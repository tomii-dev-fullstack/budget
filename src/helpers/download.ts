import type { ProposalData } from "../types/proposal";

const downloadFile = async (endpoint: string, proposalToSend: ProposalData): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3001/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proposalToSend),
    });

    if (!response.ok) {
      alert("Error al generar el PDF");
      return;
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'propuesta.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    alert("Error al conectar con el servidor");
    console.error(error);
  }
};


export const downloadPdf = (endpoint: string, proposalToSend: ProposalData): Promise<void> => {
  return downloadFile(endpoint, proposalToSend);
};