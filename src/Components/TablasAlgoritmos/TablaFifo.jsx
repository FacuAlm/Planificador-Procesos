import { Space, Table, Tag } from "antd";
import React from "react";
import { obtenerProcesos } from "../../api/procesos";

const resultado = await obtenerProcesos();

let resultadoOrdenado = resultado.sort(
  (a, b) => a.instanteEntrada - b.instanteEntrada
);

function calcularFIFO() {
  let tiempo = 0;
  let tiempoEspera = 0;
  let tiempoRetorno = 0;

  resultadoOrdenado.map((proceso, index) => {
    if (index == 0) {
      proceso.tiempoEspera = 0;
      proceso.tiempoRetorno = proceso.rafaga;
    } else {
      proceso.tiempoEspera =
        resultadoOrdenado[index - 1].tiempoEspera +
        resultadoOrdenado[index - 1].rafaga;
      proceso.tiempoRetorno = proceso.tiempoEspera + proceso.rafaga;
    }
  });

  return resultadoOrdenado;
}

const TablaFifo = () => {
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
  const data = calcularFIFO().map((proceso) => ({
    key: proceso.nombreProceso,
    nombreProceso: proceso.nombreProceso,
    tiempoLlegada: proceso.instanteEntrada,
    tiempoServicio: proceso.rafaga,
    tiempoFinalizacion: proceso.tiempoRetorno - 1,
    tr: proceso.tiempoRetorno - proceso.instanteEntrada - 1,
    trts:
      (proceso.tiempoRetorno - proceso.instanteEntrada - 1) / proceso.rafaga,
  }));

  return <Table columns={columns} dataSource={data} />;
};
export default TablaFifo;
