import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import React, { useState } from "react";
import { agregarProceso } from "../api/procesos";

const ProcessForm = () => {
  const [form] = Form.useForm();

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

    agregarProceso(data);

    onReset();
  };

 

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
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
          Crear Proceso
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ProcessForm;
