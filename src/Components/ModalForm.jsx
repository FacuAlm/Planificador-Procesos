import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import ProcessForm from './ProcessForml';
const ModalForm = () => {
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
                Crear Proceso
            </Button>
            <Modal title="Cargar Proceso" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <ProcessForm />
            </Modal>
        </>
    );
};
export default ModalForm;