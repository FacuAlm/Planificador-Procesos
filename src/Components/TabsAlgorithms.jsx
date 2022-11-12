import { Tabs } from "antd";
import React from "react";
import Fifo from "./Fifo";
import RoundRobin from "./RoundRobin";
import Spn from "./Spn";
import Srt from "./Srt";
import { obtenerProcesos } from "../api/procesos";

const resultado = await obtenerProcesos();

console.log(resultado);

const TabsAlgorithms = () => (
  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="First In First Out (FIFO)" key="1">
      <Fifo />
    </Tabs.TabPane>
    <Tabs.TabPane tab={`Round Robin (RR) q=${resultado[0].quantum}`} key="2">
      <RoundRobin />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Short Process Next (SPN)" key="3">
      <Spn />
    </Tabs.TabPane>

    <Tabs.TabPane tab="Short Remaining Time (SRT)" key="4">
      <Srt />
    </Tabs.TabPane>
  </Tabs>
);
export default TabsAlgorithms;
