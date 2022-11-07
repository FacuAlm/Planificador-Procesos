import React from "react";
import { createRoot } from "react-dom/client";
import { Button, DatePicker, Layout, Space, version } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import ModalForm from "./Components/ModalForm";
import TabsAlgorithms from "./Components/TabsAlgorithms";
import ProcesosCargados from "./Components/ProcesosCargados";
const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <h1>Planificador de Procesos</h1>
        <ModalForm />

        <div>
          <ProcesosCargados />
        </div>
        <h2>Algoritmos</h2>

        <TabsAlgorithms size="large" />
      </Content>
    </Layout>
  );
};

export default App;
