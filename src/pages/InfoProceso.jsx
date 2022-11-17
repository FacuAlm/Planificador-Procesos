import React from "react";
import EditForm from "../Components/Formularios/EditForm";
import EditModal from "../Components/Modals/EditModal";
import {
  obtenerProceso,
  editarProceso,
  eliminarProceso,
} from "../api/procesos";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";
import DatosProcesos from "../Components/DatosProcesos";
import { Button, Checkbox, Form, Input, InputNumber, Layout } from "antd";
const { Header, Content, Footer } = Layout;

export async function loader({ params }) {
  const proceso = await obtenerProceso(params.procesoId);
  return proceso;
}

const InfoProceso = () => {
  const proceso = useLoaderData();

  const navigate = useNavigate();

  function handleDelete() {
    eliminarProceso(proceso.id);
    navigate("/");
  }
  return (
    <>
      <Layout className="layout">
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <h1>{proceso.nombreProceso}</h1>
          <h2>Detalles del proceso</h2>

          <DatosProcesos proceso={proceso} />

          <EditModal />

          <Button type="primary" danger onClick={() => handleDelete()}>
            Eliminar Proceso
          </Button>
        </Content>
      </Layout>
    </>
  );
};

export default InfoProceso;
