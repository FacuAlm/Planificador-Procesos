import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
import { obtenerProcesos } from "../api/procesos";

const resultado = await obtenerProcesos();

let resultadoOrdenado = resultado.sort((a, b) => a.instanteEntrada - b.instanteEntrada);

console.table(resultadoOrdenado);

function calcularFIFO() {
  

  let tiempo = 0;
  let tiempoEspera = 0;
  let tiempoRetorno = 0;

  resultado.map((proceso, index) => {
    if (index == 0) {
      proceso.tiempoEspera = 0;
      proceso.tiempoRetorno = proceso.rafaga;
    } else {
      proceso.tiempoEspera =
        resultado[index - 1].tiempoEspera + resultado[index - 1].rafaga;

      proceso.tiempoRetorno = proceso.tiempoEspera + proceso.rafaga;
    }
  });
  console.log(resultado);

  return resultado;
}

const Fifo = () => {
  const data = calcularFIFO().map((proceso) => ({
    type: proceso.nombreProceso,
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

export default Fifo;
