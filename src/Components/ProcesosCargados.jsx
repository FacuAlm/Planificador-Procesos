import { List } from "antd";
import React from "react";
import { obtenerProcesos } from "../api/procesos";
import { useNavigate } from "react-router-dom";



const resultado = await obtenerProcesos();

const data = resultado.map((proceso) => ({
    id: proceso.id,
  title: `${proceso.id} - ${proceso.nombreProceso}`,
  description: `Instante de entrada: ${proceso.instanteEntrada} - Prioridad: ${proceso.prioridad} - Rafagas: ${proceso.rafagas}`,
}));

const ProcesosCargados = () => {
    const navigate = useNavigate();
  return (
    <>
      <h2>Procesos Cargados</h2>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a onClick={() => navigate(`/procesos/${item.id}`)}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default ProcesosCargados;
