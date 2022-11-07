import { Tabs } from 'antd';
import React from 'react';
import Fifo from './Fifo';
import RoundRobin from './RoundRobin';
import Spn from './Spn';
import Srt from './Srt';

const TabsAlgorithms = () => (
  <Tabs defaultActiveKey="1" className='tabs'>
    <Tabs.TabPane tab="FIFO" key="1">
      <Fifo />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Round Robin" key="2">
      <RoundRobin />
    </Tabs.TabPane>
    <Tabs.TabPane tab="SPN" key="3">
      <Spn />
    </Tabs.TabPane>
    <Tabs.TabPane tab="SRT" key="4">
      <Srt />
    </Tabs.TabPane>
  </Tabs>
);
export default TabsAlgorithms;
