import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const userName = "Tomás Ruglio"; // Reemplazalo por props o contexto si querés

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">

      <h1 className="text-xl font-bold text-gray-800">Generador de Propuestas</h1>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <span className="font-medium">{userName}</span>
          <ChevronDown size={18} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
            <ul className="py-1">
              <li>
                <button
                  onClick={() => alert("Cerrar sesión")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-gray-700"
                >
                  <LogOut size={16} />
                  Cerrar sesión
                </button>
              </li>
                   <li>
                <button
                  onClick={() => alert("Cerrar sesión")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm text-gray-700"
                >
             
                  Planillas
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
