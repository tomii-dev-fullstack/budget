import { useState, type ChangeEvent, type FormEvent } from "react";

interface ProposalItem {
  description: string;
  amount: number;
}

interface ProposalData {
  title: string;
  client: string;
  date: string;
  items: ProposalItem[];
}

export default function ProposalForm() {
  const [data, setData] = useState<ProposalData>({
    title: "",
    client: "",
    date: "",
    items: [{ description: "", amount: 0 }],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index?: number,
    field?: keyof ProposalItem
  ) => {
    const { name, value } = e.target;

    if (typeof index === "number" && field) {
      const newItems = [...data.items];
      newItems[index] = {
        ...newItems[index],
        [field]: field === "amount" ? parseFloat(value) : value,
      };
      setData({ ...data, items: newItems });
    } else {
      setData({ ...data, [name]: value });
    }
  };

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

  const isFormValid = () => {
    const { title, client, date, items } = data;
    return (
      title.trim() &&
      client.trim() &&
      date &&
      items.length > 0 &&
      items.every((item) => item.description.trim() && item.amount > 0)
    );
  };

  const getTotal = () => {
    return data.items.reduce((acc, item) => acc + item.amount, 0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Completa todos los campos antes de continuar.");
      return;
    }

    const response = await fetch("http://localhost:3001/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } else {
      alert("Error al generar el PDF");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Crear Propuesta</h2>

      <input
        name="title"
        placeholder="Título"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        value={data.title}
        onChange={handleChange}
      />

      <input
        name="client"
        placeholder="Cliente"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        value={data.client}
        onChange={handleChange}
      />

      <input
        name="date"
        type="date"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        value={data.date}
        onChange={handleChange}
      />

      <div className="space-y-4">
        {data.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <input
              placeholder="Descripción"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
              value={item.description}
              onChange={(e) => handleChange(e, idx, "description")}
            />
            <input
              placeholder="Monto"
              type="number"
              className="w-32 px-4 py-2 border border-gray-300 rounded-md"
              value={item.amount}
              onChange={(e) => handleChange(e, idx, "amount")}
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
        disabled={!isFormValid()}
        className={`w-full px-4 py-2 text-white rounded ${
          isFormValid()
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Generar PDF
      </button>
    </form>
  );
}
