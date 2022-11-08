import { useNavigate } from "react-router-dom";

export async function obtenerProcesos() {
  const respuesta = await fetch(import.meta.env.VITE_API_URL);
  const resultado = await respuesta.json();

  return resultado;
}

export async function obtenerProceso(id) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  const resultado = await respuesta.json();

  return resultado;
}

export async function agregarProceso(data) {
  const respuesta = await fetch(import.meta.env.VITE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await respuesta.json();
}

export async function editarProceso(id, data) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await respuesta.json();
}

export async function eliminarProceso(id) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
    method: "DELETE",
  });

  await respuesta.json();
}
