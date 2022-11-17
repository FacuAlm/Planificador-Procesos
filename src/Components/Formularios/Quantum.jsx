import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import React from "react";
import { agregarQuantum } from "../../api/procesos";
const Quantum = () => {
  const onFinish = (values) => {
      let quantum = {
          quantum: values.quantum,
      };

      agregarQuantum(quantum);
      

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      layout="inline"
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="quantum" label="Quantum">
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Quantum;
