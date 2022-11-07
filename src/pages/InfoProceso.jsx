import { obtenerProceso, editarProceso } from "../api/procesos";
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useLoaderData, redirect, useNavigate } from "react-router-dom";



export async function loader({ params }) {
    const proceso = await obtenerProceso(params.procesoId);
    return proceso;
}

export async function action(request,params) {
    const proceso = await loader({ params });
    return {
        title: proceso.nombreProceso,
        component: <InfoProceso proceso={proceso} />,
    };
}

const InfoProceso = () => {
    const [form] = Form.useForm();
    const proceso = useLoaderData()
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
            rafagas: values.rafagas

        };



        editarProceso(proceso.id, data);
        return navigate('/');

        





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
        <>
            <h1>Detalles del proceso {proceso.nombreProceso}</h1>
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
                rafagas: proceso?.rafagas   



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
                <Input
                
                />
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
                <Input />

            </Form.Item>

            <Form.Item
                label="Prioridad"
                name="prioridad"
                rules={[
                    {

                    },
                ]}
            >
                <Input />

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
                                label={index === 0 ? 'Entradas' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Ingrese una rafaga o elimine este campo.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder={`Rafagas ${index + 1}`}
                                        style={{
                                            width: '80%',
                                        }}
                                    />
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
                    Editar Proceso
                </Button>
            </Form.Item>
            </Form>
            </>
    );

}



export default InfoProceso