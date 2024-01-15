import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Form, Input, Modal, Drawer,Popconfirm, Tooltip,message } from 'antd';
import { UploadOutlined, EditTwoTone, DeleteFilled } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import CrearUnidadMedida from './CrearUM';

const EditarUnidadesMedida = () => {
  const [unidadesMedida, setUnidadesMedida] = useState([]);
  const [selectedUnidad, setSelectedUnidad] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [openum, setOpenum] = useState(false);

  const showDrawerUM = () => {
    setOpenum(true);
  };

  const onCloseum = () => {
    setOpenum(false);
    fetchUnidadesMedida();
  };

  const fetchUnidadesMedida = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/producto/listarum/');
      const data = await response.json();
      setUnidadesMedida(data.unidades_medida);
    } catch (error) {
      console.error('Error al obtener la lista de unidades de medida:', error);
    }
  };

  const openEditModal = (unidad) => {
    setSelectedUnidad(unidad);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setSelectedUnidad(null);
    setEditModalVisible(false);
  };

  const eliminartp = async (idca) => {
    try {
      console.log('A');
      const formData = new FormData();
      console.log('B');
      formData.append('sestado', 0);
      console.log('C');
      const response = await fetch(`http://127.0.0.1:8000/producto/editarum/${idca}/`, {
        method: 'POST',
        body: formData,
      });
      console.log('D');

      if (response.ok) {
        message.success('Unidad de medida eliminada con exito');
        fetchUnidadesMedida();
      } else {
        message.error(responseData.error || 'Hubo un error al realizar la solicitud');
      }
    } catch (error) {
      message.error('Hubo un error al realizar la solicitud');
    }
  }

  const handleEdit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('nombreum', values.nombre_um);

      const response = await fetch(`http://127.0.0.1:8000/producto/editarum/${selectedUnidad.id_um}/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Unidad de medida editada con éxito:', data);
        fetchUnidadesMedida();
        closeEditModal();
        Modal.success({
          title: 'Éxito',
          content: 'Unidad de medida editada con éxito',
        });
        fetchUnidadesMedida();
      } else {
        console.error('Error al editar unidad de medida:', data.error);
        Modal.error({
          title: 'Error',
          content: `Error al editar unidad de medida: ${data.error}`,
        });
      }
    } catch (error) {
      console.error('Error en la solicitud de edición:', error);
      Modal.error({
        title: 'Error',
        content: 'Error en la solicitud de edición',
      });
    }
  };

  useEffect(() => {
    fetchUnidadesMedida();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id_um',
      key: 'id_um',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre_um',
      key: 'nombre_um',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Tooltip title='Editar unidad de medida'>
                <Button
                  type="link"
                  style={{ fontSize: '24px', marginLeft: 'auto' }}
                  icon={<EditTwoTone style={{ fontSize: '30px', color: '#eb2f96', marginLeft: '5%', border: '1px solid #268A2E' }} />}
                  onClick={() => openEditModal(record)}
                />
              </Tooltip>
          <Popconfirm
            title="Eliminar unidad de medida"
            description="¿Estas seguro que que deseas eliminar la unidad de medida?"
            onConfirm={() => eliminartp(record.id_um)}
            onCancel={'cancel'}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              style={{ fontSize: '24px', marginLeft: 'auto' }}
              icon={<DeleteFilled style={{ fontSize: '30px', marginLeft: '2%', border: '1px solid red', color: 'red' }} />}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Col md={12}>
          <Button type="primary" style={{ width: '100%', margin: '2%' }} onClick={showDrawerUM}>
            Crear unidad de medida
          </Button>
        </Col>
        <Col>
          <Table dataSource={unidadesMedida} columns={columns} />
        </Col>
      </Row>


      <Modal
        title="Editar Unidad de Medida"
        visible={editModalVisible}
        onCancel={closeEditModal}
        footer={null}
      >
        <Form onFinish={handleEdit} initialValues={selectedUnidad}>
          <Form.Item label="Nombre de la Unidad" name="nombre_um" rules={[{ required: true, message: 'Por favor ingresa el nombre de la unidad.' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal>

      <Drawer
        title="Crear unidad de medida"
        width={720}
        open={openum}
        onClose={onCloseum}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <CrearUnidadMedida />
      </Drawer>
    </div>
  );
};

export default EditarUnidadesMedida;
