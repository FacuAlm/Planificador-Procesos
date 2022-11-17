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

function calcularSrt() {
  let procesosListos = [];
  let procesosEjecutados = [];
  let tiempo = 0;
  let quantum = 3;

  resultado.map((proceso, index) => {
    if (index == 0) {
      procesosEjecutados.push(proceso);
      procesosEjecutados[0].tiempoEspera = 0;
      procesosEjecutados[0].tiempoRetorno =
        (procesosEjecutados[0].rafaga % quantum) + procesosEjecutados[0].rafaga;
      tiempo = procesosEjecutados[0].rafaga % quantum;
      procesosListos.push(proceso);
    } else {
      procesosListos.push(proceso);
      procesosListos[index].tiempoEspera = tiempo;
      procesosListos[index].tiempoRetorno =
        tiempo + procesosListos[index].rafaga;
      tiempo = tiempo + procesosListos[index].rafaga;
      procesosEjecutados.push(proceso);

      if (tiempo > proceso.instanteEntrada) {
        tiempo = tiempo - proceso.instanteEntrada;

        procesosListos[index].tiempoEspera =
          procesosEjecutados[index - 1].tiempoRetorno;

        procesosListos[index].tiempoRetorno =
          procesosListos[index].tiempoEspera + procesosListos[index].rafaga;
      }
    }
  });

  return procesosListos;
}

const Srt = () => {
  const data = calcularSrt().map((proceso) => {
    return {
      proceso: proceso.nombreProceso,
      tiempoEspera: proceso.tiempoEspera,
      tiempoRetorno: proceso.tiempoRetorno,
    };
  });
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
