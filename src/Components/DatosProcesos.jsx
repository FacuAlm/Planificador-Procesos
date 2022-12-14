import { Button, Col, Row, Statistic } from 'antd';
import React from 'react';
const DatosProcesos = ({ proceso }) => {

    return (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Instante de Entrada" value={proceso?.instanteEntrada} />
    </Col>
    <Col span={12}>
      <Statistic title="Rafaga de CPU" value={proceso?.rafaga} />
     
    </Col>
    <Col span={12}>
      <Statistic title="Prioridad" value={proceso?.prioridad} />
    </Col>
  </Row>
    );
};
export default DatosProcesos;
