import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';
import { obtenerProcesos } from '../api/procesos';

const resultado = await obtenerProcesos();



const Spn = () => {
  const data = resultado.map((proceso) => ({
    type: `${proceso.id} - ${proceso.nombreProceso}`,
    values: [parseInt(proceso.instanteEntrada), parseInt(proceso.instanteEntrada) + parseInt(proceso.rafagas)],
  }));




  const config = {
    data: data,
    xField: 'values',
    yField: 'type',
    isRange: true,
    label: {
      position: 'middle',
      layout: [
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  return <Bar {...config} />;
};

export default Spn;