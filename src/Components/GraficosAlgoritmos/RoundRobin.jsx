import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
import { obtenerProcesos, obtenerQuantum } from "../../api/procesos";

const resultado = await obtenerProcesos();
const quantumApi = await obtenerQuantum();

const q = quantumApi.map((quantum) => {
  return quantum.quantum;
});

let quantumVariable = q[0];

function calcularRoundRobin() {
  let procesosListos = [];
  let procesosEjecutados = [];
  let tiempo = 0;
  let quantum = quantumVariable;

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

const RoundRobin = () => {
  const data = calcularRoundRobin().map((proceso, index) => ({
    type: "Proceso " + proceso.id,
    values: [proceso.tiempoEspera, proceso.tiempoRetorno],
  }));

  const config = {
    data: data,
    xField: "values",
    yField: "type",
    isRange: true,
  };

  return <Bar {...config} />;
};

export default RoundRobin;
