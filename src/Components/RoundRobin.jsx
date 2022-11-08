import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';
import { obtenerProcesos } from '../api/procesos';

const resultado = await obtenerProcesos();

function calcularRoundRobin() {
  let quantum = 2;
  let tiempo = 0;
  

  resultado.map((proceso, index) => {
    if (index == 0) {
      proceso.tiempoEspera = 0;
      proceso.tiempoRetorno = proceso.rafaga;
    } else {
      proceso.tiempoEspera =
        resultado[index - 1].tiempoEspera + resultado[index - 1].rafaga;
      proceso.tiempoRetorno =
        proceso.tiempoEspera + proceso.rafaga;
    }
  }
  );
  console.log(resultado);

  return resultado;
    

 

}







const RoundRobin = () => {
  const data = calcularRoundRobin().map((proceso) => ({
    type: proceso.nombreProceso,
    values: [proceso.tiempoEspera, proceso.tiempoRetorno],

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

export default RoundRobin;