import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
import { obtenerProcesos } from "../../api/procesos";
const resultado = await obtenerProcesos();

let resultadoOrdenado = resultado.sort(
  (a, b) => a.instanteEntrada - b.instanteEntrada
);
let arregloProcesos = [];

resultadoOrdenado.map((proceso) => {
  arregloProcesos.push(Object.values(proceso));
});

function shortRemainingTimeFirst(procesos) {
  let tiempo = 0;
  let tiempoRetorno = 0;
  let tiempoRetornoTotal = 0;
  let tiempoServicioRestante = 0;
  let procesoActual = null;
  let procesosListos = [];
  let procesosFinalizados = [];
  let procesosEnEspera = [];

  while (
    procesosFinalizados.length !== procesos.length ||
    procesosEnEspera.length !== 0
  ) {
    procesos.forEach((proceso) => {
      if (proceso.instanteEntrada === tiempo) {
        procesosListos.push(proceso);
      }
    });

    if (procesoActual === null) {
      if (procesosListos.length !== 0) {
        procesosListos.sort((a, b) => a.rafaga - b.rafaga);
        procesoActual = procesosListos.shift();
        tiempoServicioRestante = procesoActual.rafaga;
      }
    }

    if (procesoActual !== null) {
      tiempoServicioRestante--;
      tiempo++;

      if (tiempoServicioRestante === 0) {
        tiempoRetorno = tiempo;
        tiempoRetornoTotal += tiempoRetorno;
        procesoActual.tiempoRetorno = tiempoRetorno;
        procesosFinalizados.push(procesoActual);
        procesoActual = null;
      } else {
        procesosEnEspera = procesosListos.filter(
          (proceso) => proceso.rafaga < tiempoServicioRestante
        );

        if (procesosEnEspera.length !== 0) {
          procesosEnEspera.sort((a, b) => a.rafaga - b.rafaga);
          procesosListos = procesosListos.filter(
            (proceso) => proceso.rafaga >= tiempoServicioRestante
          );
          procesosListos.unshift(procesoActual);
          procesoActual = procesosEnEspera.shift();
          tiempoServicioRestante = procesoActual.rafaga;
        }
      }
    } else {
      tiempo++;
    }
  }

  return procesosFinalizados;
}

const Srt = () => {
  const data = [
    {
      type: "Proceso 1",
      values: [0, 2],
    },
    {
      type: "Proceso 2",
      values: [2, 3],
    },
    {
      type: "Proceso 3",
      values: [3, 7],
    },
    {
      type: "Proceso 5",
      values: [7, 9],
    },
    {
      type: "Proceso 2",
      values: [9, 14],
    },
    {
      type: "Proceso 4",
      values: [14, 19],
    },
  ]

  const config = {
    data: data,
    xField: "values",
    yField: "type",
    isRange: true,
    label: {
      position: "middle",
      layout: [
        {
          type: "adjust-color",
        },
      ],
    },
  };

  return <Bar {...config} />;
};

export default Srt;
