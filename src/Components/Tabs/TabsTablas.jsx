import { Tabs } from "antd";
import React from "react";
import TablaFifo from "../TablasAlgoritmos/TablaFifo";
import TablaRoundRobin from "../TablasAlgoritmos/TablaRoundRobin";
import TablaSPN from "../TablasAlgoritmos/TablaSPN";

const TabsTablas = () => (
  <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="First In First Out (FIFO)" key="1">
      <TablaFifo />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Round Robin (RR)" key="2">
      <TablaRoundRobin/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Short Process Next (SPN)" key="3">
      <TablaSPN/>
    </Tabs.TabPane>

    <Tabs.TabPane tab="Short Remaining Time (SRT)" key="4">
      <TablaFifo />
    </Tabs.TabPane>
  </Tabs>
);
export default TabsTablas;
