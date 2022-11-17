import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
import { obtenerProcesos } from "../../api/procesos";

const resultado = await obtenerProcesos();

function calcularSPN() {
  let tiempo = 0;

  resultado.map((proceso, index) => {
    if (index == 0) {
      proceso.tiempoEspera = 0;
      proceso.tiempoRetorno = proceso.rafaga;
      tiempo = proceso.rafaga;
    } else {
      proceso.tiempoEspera = tiempo;
      proceso.tiempoRetorno = tiempo + proceso.rafaga + 3;
      tiempo = tiempo + proceso.rafaga;

      if (tiempo > proceso.instanteEntrada) {
        tiempo = tiempo - proceso.instanteEntrada;

        proceso.tiempoEspera = resultado[index - 1].tiempoRetorno;

        proceso.tiempoRetorno = proceso.tiempoEspera + proceso.rafaga;
      }
    }
  });

  return resultado;
}

const Spn = () => {
  const data = calcularSPN().map((proceso, index) => ({
    type: "Proceso " + proceso.id,
    values: [proceso.tiempoEspera, proceso.tiempoRetorno],
  }));

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

export default Spn;
