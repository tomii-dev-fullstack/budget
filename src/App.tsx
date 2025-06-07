import './App.css';
import ProposalForm from './components/form';
import Header from './components/header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda: Formulario */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <ProposalForm />
          </div>

          {/* Columna derecha: Vista previa */}
          <div className="bg-white p-4 rounded-xl shadow-md">

            <div className="mx-auto p-6 bg-white rounded-lg space-y-6">
              <div id="preview" className="vista-previa text-sm text-gray-800" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
