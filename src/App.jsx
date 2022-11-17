import React from "react";
import { createRoot } from "react-dom/client";
import { Button, DatePicker, Layout, Space, version } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import ModalForm from "./Components/Modals/ModalForm";
import TabsAlgorithms from "./Components/Tabs/TabsAlgorithms";
import ProcesosCargados from "./Components/ProcesosCargados";
import TabsTablas from "./Components/Tabs/TabsTablas";
import Quantum from "./Components/Formularios/Quantum";
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

        <h1>Diagrama de Gantt</h1>

        <TabsAlgorithms />
      </Content>
    </Layout>
  );
};

export default App;
