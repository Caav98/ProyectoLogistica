// src/PedidoConsulta.js
import React, { useState } from 'react';
import './PedidoConsulta.css';

const PedidoConsulta = () => {
  const [numeroPedido, setNumeroPedido] = useState('');
  const [estadoPedido, setEstadoPedido] = useState('');
  const [eventos, setEventos] = useState([]);

  const consultarPedido = (e) => {
    e.preventDefault();
    // Simulación de respuesta de seguimiento
    if (numeroPedido) {
      setEstadoPedido(`El estado de tu pedido ${numeroPedido} es: En tránsito`);
      // Simulación de eventos de seguimiento
      setEventos([
        { time: '10:00 AM', description: 'Pedido recibido en el centro de distribución.' },
        { time: '12:00 PM', description: 'En proceso de empaquetado.' },
        { time: '2:00 PM', description: 'Pedido enviado.' },
        { time: '4:00 PM', description: 'En tránsito.' },
      ]);
    } else {
      setEstadoPedido('Por favor, ingresa un número de pedido válido.');
      setEventos([]);
    }
  };

  const limpiarBusqueda = () => {
    setNumeroPedido('');
    setEstadoPedido('');
    setEventos([]);
  };

  return (
    <div className="pedido-consulta">
      <h1>Consulta de Pedido</h1>
      <form onSubmit={consultarPedido}>
        <input
          type="text"
          placeholder="Número de Pedido"
          value={numeroPedido}
          onChange={(e) => setNumeroPedido(e.target.value)}
          required
        />
        <button type="submit">Consultar</button>
        <button type="button" onClick={limpiarBusqueda} className="limpiar-busqueda">
          Limpiar
        </button>
      </form>
      {estadoPedido && <p className="estado-pedido">{estadoPedido}</p>}
      
      {/* Sección de seguimiento */}
      {eventos.length > 0 && (
        <div className="tracking-section">
          <h2>Estado del Envío</h2>
          <div className="tracking-timeline">
            {eventos.map((evento, index) => (
              <div key={index} className="timeline-event">
                <div className="event-time">{evento.time}</div>
                <div className="event-description">{evento.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PedidoConsulta;