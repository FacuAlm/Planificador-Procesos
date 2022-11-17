import { Space, Table, Tag } from "antd";
import React from "react";
import { obtenerProcesos } from "../../api/procesos";

const resultado = await obtenerProcesos();

let resultadoOrdenado = resultado.sort(
  (a, b) => a.instanteEntrada - b.instanteEntrada
);

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
const TablaSRT = () => {
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
  const data = shortRemainingTimeFirst(resultadoOrdenado).map((proceso) => {
    return {
      key: proceso.id,
      nombreProceso: proceso.nombreProceso,
      tiempoLlegada: proceso.instanteEntrada,
      tiempoServicio: proceso.rafaga,
      tiempoFinalizacion: proceso.tiempoRetorno,
      tr: proceso.tiempoRetorno - proceso.rafaga,
      trts: (proceso.tiempoRetorno - proceso.rafaga) / proceso.rafaga,
    };
  });

  return <Table columns={columns} dataSource={data} />;
};
export default TablaSRT;
