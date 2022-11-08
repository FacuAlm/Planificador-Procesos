import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { agregarProceso } from '../api/procesos';

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
            rafagas: values.rafagas

        };

        console.log(data);

        agregarProceso(data);

        onReset();





    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 8,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 16,
            },
            sm: {
                span: 16,
            },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 20,
                offset: 4,
            },
        },
    };







    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                        message: 'Por favor ingrese el nombre del proceso',
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
                        message: 'Por favor ingrese el instante de entrada',
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
                        message: 'Por favor ingrese la prioridad',
                    },
                ]}
            >

                <InputNumber />

            </Form.Item>



            <Form.List
                name="rafagas"
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 2) {
                                return Promise.reject(new Error('Ingrese al menos dos rafagas'));
                            }
                        },

                        required: true,
                    },

                ]}
            >

                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Rafagas' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item

                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,

                                        },
                                    ]}
                                    noStyle
                                >
                                    <InputNumber style={{ width: '60%' }} />
                                </Form.Item>


                                {fields.length > 0 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="normal"
                                onClick={() => add()}
                                style={{
                                    width: '60%',
                                }}
                                icon={<PlusOutlined />}
                            >
                                Ingrese una rafaga
                            </Button>

                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>









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