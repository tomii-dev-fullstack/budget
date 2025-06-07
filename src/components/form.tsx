import { useState, type FormEvent } from "react";
import { downloadPdf } from "../helpers/download";
import { generatePdf } from "../helpers/generate";
import { isFormValid } from "../validations/form";
import { handleChange } from "../helpers/handleChange";
import { generateInputText } from "./input";
import type { ProposalData } from "../types/proposal";
import { initialProposalData } from "../types/data";

export default function ProposalForm() {
    const [data, setData] = useState<ProposalData>(initialProposalData);
    const addItem = () => {
        setData((prev) => ({
            ...prev,
            items: [...prev.items, { description: "", amount: 0 }],
        }));
    };

    const removeItem = (index: number) => {
        setData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };



    const getTotal = () => {
        return data.items.reduce((acc, item) => acc + item.amount, 0);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid(data)) {
            alert("Completa todos los campos antes de continuar.");
            return;
        }

        // Armamos el objeto explícitamente (podés usar directamente 'data')
        const proposalToSend = {
            title: data.title,
            client: data.client,
            email: data.email,
            phone: data.phone,
            terms: data.terms,
            summary: data.summary,
            date: data.date,
            items: data.items.map(item => ({
                description: item.description,
                amount: item.amount,
            })),
        };

        generatePdf("generate-html", proposalToSend)



    };
    const handleDw = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!isFormValid(data)) {
            alert("Completa todos los campos antes de continuar.");
            return;
        }

        // Armamos el objeto explícitamente (podés usar directamente 'data')
        const proposalToSend = {
            title: data.title,
            client: data.client,
            email: data.email,
            phone: data.phone,
             terms: data.terms,
            summary: data.summary,
            date: data.date,
            items: data.items.map(item => ({
                description: item.description,
                amount: item.amount,
            })),
        };

        downloadPdf("generate-pdf", proposalToSend)

    };


    return (
        <form
            onSubmit={handleSubmit}
            className=" mx-auto p-6 bg-white rounded-lg space-y-6"
        >
            <h2 className="text-2xl font-semibold text-gray-800">Crear Propuesta</h2>

            {generateInputText(data, setData)}

            <input
                name="date"
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={data.date}
                onChange={(e) => handleChange(e, undefined, undefined, setData)}
            />

            <div className="space-y-4 overflow-y-auto max-h-36">
                {data.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <input
                            placeholder="Ítem 1 "
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                            value={item.description}
                            onChange={(e) => handleChange(e, idx, "description", setData)}
                        />
                        <input
                            placeholder="Monto"
                            type="number"
                            className="w-32 px-4 py-2 border border-gray-300 rounded-md"
                            value={item.amount}
                            onChange={(e) => handleChange(e, idx, "amount", setData)}
                        />
                        {data.items.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeItem(idx)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
       
            </div>

            <div className="flex justify-between items-center">
                <button
                    type="button"
                    onClick={addItem}
                    className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                    + Agregar ítem
                </button>

                <div className="text-right text-gray-700 font-medium">
                    Total: ${getTotal().toFixed(2)}
                </div>
            </div>

            <button
                type="submit"
                disabled={!isFormValid(data)}
                className={`w-full px-4 py-2 text-white rounded ${isFormValid(data)
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                Generar PDF
            </button>
            <button
                type="button"
                onClick={handleDw}
                className={"w-full px-4 py-2 text-white bg-blue-400 rounded"}
            >
                Descargar PDF
            </button>
        </form>
    );
}
