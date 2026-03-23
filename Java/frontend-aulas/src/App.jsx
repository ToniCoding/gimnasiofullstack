import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [aulas, setAulas] = useState([]);
  const [nuevaAula, setNuevaAula] = useState({
    numeroAula: '',
    comentarios: '',
    esAulaOrdenadores: false,
    centro: ''
  });
  const [filtroOrdenadores, setFiltroOrdenadores] = useState(false);
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [centros, setCentros] = useState([]);

  const API_AULA_URL = 'http://localhost:8080/api/aula';
  const API_CENTRO_URL = 'http://localhost:8080/api/centro';

  // ========== CARGAR AULAS Y CENTROS AL INICIAR LA APPLICACION ==========
  useEffect(() => {
    cargarAulas();
    cargarCentros();
  }, []);

  const cargarAulas = async () => {
    setCargando(true);
    try {
      const response = await fetch(API_AULA_URL);
      if (!response.ok) throw new Error('Error al cargar aulas');
      const data = await response.json();
      setAulas(data);
      setError('');
    } catch (err) {
      setError('No se pudieron cargar las aulas.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const cargarCentros = async () => {
    try {
      const response = await fetch(API_CENTRO_URL);
      if (!response.ok) throw new Error('Error al cargar centros');
      const data = await response.json();
      setCentros(data);
    } catch (err) {
      console.error('Error al cargar centros:', err);
    }
  };

  // ========== BORRAR UN AULA ==========
  const borrarAula = async (id) => {
    if (!confirm('¿Seguro que quieres borrar este aula?')) return;

    try {
      const response = await fetch(`${API_AULA_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response.status === 204) {
        setAulas(aulas.filter(aula => aula.id !== id));
      } else if (response.status === 404) {
        alert('El aula no existe');
      } else {
        throw new Error('Error al borrar');
      }
    } catch (err) {
      alert('Error al borrar el aula');
      console.error(err);
    }
  };

  // ========== CREAR UN AULA ==========
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nuevaAula.numeroAula || nuevaAula.numeroAula === '') {
      alert('El número de aula es obligatorio');
      return;
    }

    if (!nuevaAula.centro || nuevaAula.centro === '') {
      alert('Debes seleccionar un centro');
      return;
    }

    const aulaParaEnviar = {
      numeroAula: nuevaAula.numeroAula,
      comentarios: nuevaAula.comentarios,
      esAulaOrdenadores: nuevaAula.esAulaOrdenadores,
      centro: nuevaAula.centro
    };

    try {
      const response = await fetch(API_AULA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(aulaParaEnviar)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error('Error al crear aula');
      }

      const aulaCreada = await response.json();
      setAulas([...aulas, aulaCreada]);

      setNuevaAula({
        numeroAula: '',
        comentarios: '',
        esAulaOrdenadores: false,
        centro: ''
      });

    } catch (err) {
      alert('Error al crear el aula. Revisa que el centro exista.');
      console.error(err);
    }
  };

  // ========== ORDENAR (no fetch) ==========
  const aulasOrdenadas = [...aulas].sort((a, b) => {
    const valA = a.numeroAula;
    const valB = b.numeroAula;

    const esNumeroA = /^\d+$/.test(valA);
    const esNumeroB = /^\d+$/.test(valB);

    if (esNumeroA && esNumeroB) {
      const numA = parseInt(valA, 10);
      const numB = parseInt(valB, 10);
      return ordenAsc ? numA - numB : numB - numA;
    } else {
      if (ordenAsc) {
        return valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
      } else {
        return valB.localeCompare(valA, undefined, { numeric: true, sensitivity: 'base' });
      }
    }
  });

  // ========== FILTRAR ==========
  const aulasFiltradas = filtroOrdenadores
    ? aulasOrdenadas.filter(aula => aula.esAulaOrdenadores === true)
    : aulasOrdenadas;

  // ========== RENDERIZADO ==========
  return (
    <div className="container">
      <h1>Gestión de Aulas</h1>

      {error && <div className="error">{error}</div>}

      <div className="botones-acciones">
        <button onClick={() => setOrdenAsc(true)} className="btn">
          Ordenar Asc ↑
        </button>
        <button onClick={() => setOrdenAsc(false)} className="btn">
          Ordenar Desc ↓
        </button>
        <button
          onClick={() => setFiltroOrdenadores(!filtroOrdenadores)}
          className="btn"
        >
          {filtroOrdenadores ? 'Mostrar todas' : 'Mostrar solo ordenadores'}
        </button>
      </div>

      <div className="listado-aulas">
        <h2>Aulas ({aulasFiltradas.length})</h2>

        {cargando && <p>Cargando aulas...</p>}

        {!cargando && aulasFiltradas.length === 0 && (
          <p className="mensaje-vacio">No hay aulas en la base de datos</p>
        )}

        {!cargando && aulasFiltradas.length > 0 && (
          <ul className="aulas-lista">
            {aulasFiltradas.map(aula => (
              <li key={aula.id} className="aula-item">
                <div className="aula-info">
                  <span className="aula-numero">
                    {aula.esAulaOrdenadores && <span className="icono-ordenador">🖥️</span>}
                    Aula {aula.numeroAula}
                  </span>
                  <span className="aula-comentario">{aula.comentarios}</span>
                  {aula.centro && (
                    <span className="aula-centro"> Centro - {aula.centro}</span>
                  )}
                </div>
                <button onClick={() => borrarAula(aula.id)} className="btn-borrar">Eliminar aula</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="formulario-crear">
        <h2>Crear nueva aula</h2>
        <form onSubmit={handleSubmit}>
          <div className="campo-formulario">
            <label>Número de aula *:</label>
            <input
              type="text"
              value={nuevaAula.numeroAula}
              onChange={(e) => setNuevaAula({...nuevaAula, numeroAula: e.target.value})}
              placeholder="Ej: 101, B-12, Laboratorio 3"
              required
            />
          </div>

          <div className="campo-formulario">
            <label>Comentarios:</label>
            <textarea
              value={nuevaAula.comentarios}
              onChange={(e) => setNuevaAula({...nuevaAula, comentarios: e.target.value})}
              placeholder="Ej: Planta baja, 30 ordenadores, cerca del laboratorio..."
              rows="3"
            />
          </div>

          <div className="campo-formulario checkbox">
            <label>
              <input
                type="checkbox"
                checked={nuevaAula.esAulaOrdenadores}
                onChange={(e) => setNuevaAula({...nuevaAula, esAulaOrdenadores: e.target.checked})}
              />
              Es aula de ordenadores
            </label>
          </div>

          <div className="campo-formulario">
            <label>Centro *:</label>
            <select
              value={nuevaAula.centro}
              onChange={(e) => setNuevaAula({...nuevaAula, centro: e.target.value})}
              required
            >
              <option value="">Selecciona un centro</option>
              {centros.map(centro => (
                <option key={centro.id} value={centro.nombre}>
                  {centro.nombre} ({centro.localidad})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-crear">Crear nueva aula</button>
        </form>
      </div>
    </div>
  );
}

export default App;