import React from 'react'
import EditForm from '../Components/EditForm'
import EditModal from '../Components/EditModal'
import { obtenerProceso, editarProceso, eliminarProceso } from "../api/procesos";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";
import DatosProcesos from '../Components/DatosProcesos';
import { Button, Checkbox, Form, Input, InputNumber } from "antd";

export async function loader({ params }) {
    const proceso = await obtenerProceso(params.procesoId);
    return proceso;
}

const InfoProceso = () => {
    const proceso = useLoaderData()
    return (
        <>
            <h1>{proceso.nombreProceso}</h1>
            <h2>Detalles del proceso</h2>
           
            <DatosProcesos
                proceso={proceso}
            />

            <EditModal />

            <Button type="primary" danger onClick={() => eliminarProceso(proceso.id)}>
                Eliminar Proceso
            </Button>

            

        </>
    )
}

export default InfoProceso