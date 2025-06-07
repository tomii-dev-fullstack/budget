import { handleChange } from "../helpers/handleChange";
import type { ProposalData } from "../types/proposal";
import type { Dispatch, SetStateAction } from "react";

const inputFields: { name: keyof ProposalData; placeholder: string }[] = [
    { name: "title", placeholder: "Título de la propuesta" },
    { name: "client", placeholder: "Nombre del cliente" },
    { name: "email", placeholder: "Email de contacto" },
    { name: "phone", placeholder: "Teléfono de contacto" },
    { name: "summary", placeholder: "Descripción general del proyecto" },
    { name: "terms", placeholder: "Términos y condiciones" },
];


export const generateInputText = (
    data: ProposalData,
    setData: Dispatch<SetStateAction<ProposalData>>
) => {
    return inputFields.map((field) => (
        <input
            key={field.name}
            type="text"
            name={field.name}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
            value={data[field.name] as string}
            onChange={(e) => handleChange(e, undefined, undefined, setData)}
        />
    ));
};
