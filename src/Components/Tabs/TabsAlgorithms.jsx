import { Tabs } from "antd";
import React from "react";
import Fifo from "../GraficosAlgoritmos/Fifo";
import RoundRobin from "../GraficosAlgoritmos/RoundRobin";
import Spn from "../GraficosAlgoritmos/Spn";
import Srt from "../GraficosAlgoritmos/Srt";
import { obtenerProcesos } from "../../api/procesos";
import TablaFifo from "../TablasAlgoritmos/TablaFifo";
import TablaRoundRobin from "../TablasAlgoritmos/TablaRoundRobin";
import TablaSPN from "../TablasAlgoritmos/TablaSPN";
import TablaSRT from "../TablasAlgoritmos/TablaSRT";
import Quantum from "../Formularios/Quantum";

const resultado = await obtenerProcesos();

const TabsAlgorithms = () => (
  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="First In First Out (FIFO)" key="1">
      <Fifo />

      <h1>Informe</h1>

      <TablaFifo />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Round Robin (RR)" key="2">
      <Quantum/>
      <RoundRobin />

      <h1>Informe</h1>

      <TablaRoundRobin />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Short Process Next (SPN)" key="3">
      <Spn />

      <h1>Informe</h1>

      <TablaSPN />
    </Tabs.TabPane>

    <Tabs.TabPane tab="Short Remaining Time (SRT)" key="4">
      <Srt />

      <h1>Informe</h1>

      <TablaSRT />
    </Tabs.TabPane>
  </Tabs>
);
export default TabsAlgorithms;
