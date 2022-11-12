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
      rafaga: values.rafaga,
      quantum: values.quantum,
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
        quantum : 1
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
        label="Quantum (RR)"
        name="quantum"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el quantum",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <p>El valor por default del quantum es 1</p>

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
