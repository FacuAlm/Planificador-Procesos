import { Space, Table, Tag } from "antd";
import React from "react";
import { obtenerProcesos, obtenerQuantum } from "../../api/procesos";

const resultado = await obtenerProcesos();
const quantumApi = await obtenerQuantum();

const q = quantumApi.map((quantum) => {
  return quantum.quantum;
});

let quantumVariable = q[q.length - 1];

console.log(quantumVariable);

let resultadoOrdenado = resultado.sort(
  (a, b) => a.instanteEntrada - b.instanteEntrada
);

let arregloProcesos = [];

resultadoOrdenado.map((proceso) => {
  arregloProcesos.push(Object.values(proceso));
});

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
        (procesosEjecutados[0].rafaga % quantum);
      tiempo = procesosEjecutados[0].rafaga % quantum;
      procesosListos.push(proceso);
    } else {
      procesosEjecutados.push(proceso);
      procesosEjecutados[index].tiempoEspera = tiempo;
      procesosEjecutados[index].tiempoRetorno =
        (procesosEjecutados[index].rafaga % quantum) +
        procesosEjecutados[index].rafaga +
        procesosEjecutados[index].rafaga +
        procesosEjecutados[index].instanteEntrada;
      tiempo = procesosEjecutados[index].rafaga % quantum;
      procesosListos.push(proceso);
    }
  });

  return procesosEjecutados;
}

const TablaRoundRobin = () => {
  const columns = [
    {
      title: "Proceso",
      dataIndex: "nombreProceso",
      key: "nombreProceso",
    },
    {
      title: "Tiempo de llegada",
      dataIndex: "tiempoLlegada",
      key: "tiempoLlegada",
    },
    {
      title: "Tiempo de Servicio",
      dataIndex: "tiempoServicio",
      key: "tiempoServicio",
    },
    {
      title: "Tiempo de Finalización",
      dataIndex: "tiempoFinalizacion",
      key: "tiempoFinalizacion",
    },

    {
      title: "TR",
      dataIndex: "tr",
      key: "tr",
    },
    {
      title: "TR/TS",
      dataIndex: "trts",
      key: "trts",
    },
  ];
  const data = calcularRoundRobin().map((proceso) => {
    return {
      key: proceso.nombreProceso,
      nombreProceso: proceso.nombreProceso,
      tiempoLlegada: proceso.instanteEntrada,
      tiempoServicio: proceso.rafaga,
      tiempoFinalizacion: proceso.tiempoRetorno,
      tr: proceso.tiempoRetorno - proceso.instanteEntrada,
      trts: proceso.tiempoRetorno / proceso.rafaga,
    };
  });

  return <Table columns={columns} dataSource={data} />;
};
export default TablaRoundRobin;
