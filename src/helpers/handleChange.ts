import type { ChangeEvent } from "react";
import type { ProposalData } from "../types/proposal";


export function handleChange(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  index: number | undefined,
  field: "description" | "amount" | "terms"| undefined,
  setData: React.Dispatch<React.SetStateAction<ProposalData>>
) {
  const { name, value } = e.target;

  setData((prev) => {
    if (index !== undefined && field) {
      // Modificamos un item
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: field === "amount" ? parseFloat(value) : value,
      };
      return { ...prev, items: updatedItems };
    } else {
      // Modificamos campos generales como "title", "client", etc.
      return {
        ...prev,
        [name]: value,
      };
    }
  });
}
