import { Tabs } from 'antd';
import React from 'react';
import Fifo from './Fifo';
import RoundRobin from './RoundRobin';
import Spn from './Spn';
import Srt from './Srt';

const TabsAlgorithms = () => (
  
  <Tabs defaultActiveKey="1" >
    <Tabs.TabPane tab="FIFO" key="1">
      <Fifo />
    </Tabs.TabPane>
    <Tabs.TabPane tab="SPN" key="2">
      <Spn />
    </Tabs.TabPane>
    <Tabs.TabPane tab="SRT" key="3">
      <Srt />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Round Robin" key="4">
      <RoundRobin />
    </Tabs.TabPane>
  </Tabs>
  
  

      
  
);
export default TabsAlgorithms;
