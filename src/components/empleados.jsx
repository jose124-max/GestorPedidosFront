import React,{useState} from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Divider, Avatar, Flex, Segmented, Tooltip } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import repartidor from './res/repartidor.png'
import administrador from './res/administrador.png'
import camarero from './res/camarero.png';
import cocinero from './res/cocinero.png';
import EditarEmpleado from './EditarEmpleado';
import anadir from './res/anadir.png'

const Empleados = ({ }) => {
    const [selectedOficio, setSelectedOficio] = useState('Administradores');

    const handleOficioChange = (value) => {
        setSelectedOficio(value);
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
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size="large" src={camarero}/>
                                        </div>
                                    </Tooltip>
                                ),
                                value: 'Meseros',
                            },
                            {
                                label: (
                                    <Tooltip title="Jefes de cocina">
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size="large" src={cocinero}/>                                        </div>
                                    </Tooltip>
                                ),
                                value: 'JefesCocina',
                            },
                            {
                                label: (
                                    <Tooltip title="Agregar empleados">
                                        <div style={{ padding: 4 }}>
                                            <Avatar style={{ backgroundColor: '#ffff' }} icon={<UserOutlined />} size="large" src={anadir}/>                                        </div>
                                    </Tooltip>
                                ),
                                value: 'agregar',
                            },
                        ]}
                        onChange={handleOficioChange}
                    />
                </Col>
                <Col md={12}>
                    {console.log('Estp es : '+selectedOficio)}
                    <EditarEmpleado oficio={selectedOficio}/>
                </Col>
            </Row>
        </>
    );
};

export default Empleados;
