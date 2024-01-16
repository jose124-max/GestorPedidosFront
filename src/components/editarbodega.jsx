import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, message } from 'antd';

const EditarBodegaForm = ({ bodega, onClose }) => {
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'ID de Sucursal',
            dataIndex: 'id_sucursal',
            key: 'id_sucursal',
        },
        {
            title: 'Nombre de la Bodega',
            dataIndex: 'nombrebog',
            key: 'nombrebog',
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={handleCancelar}>Cancelar</Button>
                    <Button type="primary" onClick={handleGuardar}>Guardar</Button>
                </Space>
            ),
        },
    ];

    const handleCancelar = () => {
        onClose();
    };

    const handleGuardar = async () => {
        try {
            if (!bodega || !bodega.id) {
                console.error('No se ha seleccionado ninguna bodega para editar o la bodega no tiene un ID válido.');
                console.log(bodega);
                return;
            }

            const values = await form.validateFields();
            const response = await fetch(`http://127.0.0.1:8000/bodega/editar/${bodega.id_bodega}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });



            if (response.ok) {
                const data = await response.json();
                message.success(data.mensaje);
                onClose();
            } else {
                const data = await response.json();
                message.error(data.error || 'Error al editar la bodega');
            }
        } catch (error) {
            console.error('Error al editar la bodega:', error);
        }
    };

    useEffect(() => {
        if (bodega) {
            form.setFieldsValue(bodega);
        }
    }, [bodega, form]);

    return (
        <div>
            <Table columns={columns} dataSource={[bodega]} rowKey="id" pagination={false} />
            <Form form={form} layout="vertical">
                <Form.Item label="Nombre de la Bodega" name="nombrebog">
                    <Input />
                </Form.Item>
                <Form.Item label="Descripción" name="descripcion">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditarBodegaForm;
