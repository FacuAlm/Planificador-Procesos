import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';
import { obtenerProcesos } from '../api/procesos';

const resultado = await obtenerProcesos();



const Fifo = () => {
  const data = resultado.map((proceso) => ({
    type: `${proceso.id} - ${proceso.nombreProceso}`,
    values: [parseInt(proceso.instanteEntrada), parseInt(proceso.instanteEntrada) + parseInt(proceso.rafagas)],
  }));
  const config = {
    data: data,
    xField: 'values',
    yField: 'type',
    isRange: true,
    };

  return <Bar {...config} />;
};

export default Fifo;


