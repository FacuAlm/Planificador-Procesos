import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import EditForm from './EditForm';
import ProcessForm from './ProcessForml';
const EditModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Editar Proceso
            </Button>
            <Modal title="Cargar Proceso" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <EditForm />
            </Modal>
        </>
    );
};
export default EditModal;