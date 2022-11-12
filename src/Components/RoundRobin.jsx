import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
import { obtenerProcesos } from "../api/procesos";

const resultado = await obtenerProcesos();





const RoundRobin = () => {
  const data =[]

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

export default RoundRobin;
