import { obtenerProceso, editarProceso } from "../api/procesos";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";

export async function loader({ params }) {
  const proceso = await obtenerProceso(params.procesoId);
  return proceso;
}

export async function action(request, params) {
  const proceso = await loader({ params });
  return {
    title: proceso.nombreProceso,
    component: <InfoProceso proceso={proceso} />,
  };
}

const EditForm = () => {
  const [form] = Form.useForm();
  const proceso = useLoaderData();
  const navigate = useNavigate();
  console.log(proceso);

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    let data = {
      nombreProceso: values.nombreProceso,
      instanteEntrada: values.instanteEntrada,
      prioridad: values.prioridad,
      rafaga: values.rafaga,
    };

    console.log(data);

    editarProceso(proceso.id, data);
    return navigate("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,

          nombreProceso: proceso?.nombreProceso,
          instanteEntrada: proceso?.instanteEntrada,
          prioridad: proceso?.prioridad,
          rafaga: proceso?.rafaga,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Nombre del Proceso"
          name="nombreProceso"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el nombre del proceso",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Instante de Entrada"
          name="instanteEntrada"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el instante de entrada",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Prioridad"
          name="prioridad"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la prioridad",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Rafaga"
          name="rafaga"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la rafaga",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Editar Proceso
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditForm;
