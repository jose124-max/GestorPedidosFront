import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Divider, Avatar, Flex, Segmented, Tooltip, Select,Drawer } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import repartidor from './res/repartidor.png';
import administrador from './res/administrador.png';
import camarero from './res/camarero.png';
import cocinero from './res/cocinero.png';
import EditarEmpleado from './EditarEmpleado';
import anadir from './res/anadir.png';
import CrearEmpleadoForm from './crearempleado';

const { Option } = Select;

const Empleados = ({ }) => {
    const [selectedOficio, setSelectedOficio] = useState('Administradores');
    const [selectedSucursal, setSelectedSucursal] = useState(0);
    const [sucursales, setSucursales] = useState([]);
    const [loadingSucursales, setLoadingSucursales] = useState(true);
    const [opene, setOpene] = useState(false);

    const onClosee = () => {
        setSelectedOficio('Administradores');
        setOpene(false);
    };
    const showDrawere = () => {
        setOpene(true);
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/sucursal/sucusarleslist/')
            .then((response) => response.json())
            .then((data) => {
                setSucursales(data.sucursales);  // Utilizar data.sucursales en lugar de data
            })
            
            .catch((error) => {
                console.error('Error fetching sucursales:', error);
            })
            .finally(() => {
                setLoadingSucursales(false);
            });
    }, []);

    const handleOficioChange = (value) => {
        if (value == 'agregar') {
            showDrawere();
            return;
        }
        setSelectedOficio(value);
    };

    const handleSucursalChange = (value) => {
        setSelectedSucursal(value);
    };

    return (
        <>
            <div>
                <Divider>Empleados</Divider>
            </div>
            <Row>
                <Col md={12}>
                    <Segmented
                        options={[
                            {
                                label: (
                                    <Tooltip title="Administradores">
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} src={administrador} size="large" />
                                        </div>
                                    </Tooltip>
                                ),
                                value: 'Administradores',
                            },
                            {
                                label: (
                                    <Tooltip title="Motorizados">
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} size="large" src={repartidor} />
                                        </div>
                                    </Tooltip>
                                ),
                                value: 'Motorizados',
                            },
                            {
                                label: (
                                    <Tooltip title="Meseros">
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size="large" src={camarero} />
                                        </div>
                                    </Tooltip>
                                ),
                                value: 'Meseros',
                            },
                            {
                                label: (
                                    <Tooltip title="Jefes de cocina">
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size="large" src={cocinero} />
                                        </div>
                                    </Tooltip>
                                ),
                                value: 'JefesCocina',
                            },
                            {
                                label: (
                                    <Tooltip title="Agregar empleados">
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#ffff' }} icon={<UserOutlined />} size="large" src={anadir} />
                                        </div>
                                    </Tooltip>
                                ),
                                value: 'agregar',
                            },
                        ]}
                        onChange={handleOficioChange}
                        value={selectedOficio}
                    />
                </Col>
                <Col md={12}>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Seleccione una sucursal"
                        onChange={handleSucursalChange}
                        loading={loadingSucursales}
                    >
                        {sucursales.map((sucursal) => (
                            <Option key={sucursal.id_sucursal} value={sucursal.snombre}>
                                {sucursal.snombre}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col md={12}>
                    {console.log('Esto es : ' + selectedOficio)}
                    <EditarEmpleado oficio={selectedOficio} sucursal={selectedSucursal} />
                </Col>
            </Row>
            <Drawer
                title="Crear empleado"
                width={720}
                onClose={onClosee}
                open={opene}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <CrearEmpleadoForm></CrearEmpleadoForm>
            </Drawer>
        </>
    );
};

export default Empleados;