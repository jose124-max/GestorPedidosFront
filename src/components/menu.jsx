import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Image, Avatar, Card, Badge, Tooltip } from 'antd';
import { Container, Row, Col, Button, Form, Nav, Navbar, NavDropdown, Dropdown, Offcanvas } from 'react-bootstrap';
import imgempresa from './res/imgempresa.png';
import imgempleado from './res/imgempleado.png';
import imgproductos from './res/imgproductos.png';
import imgaviso from './res/imgaviso.png';
import imgmesas from './res/imgmesas.png';
import imgcombos from './res/imgcombos.png';
import imgrecompensa from './res/imgrecompensa.png';
import Empresa from './Empresa';
import Empleados from './empleados.jsx';
import Sucursales from './sucursales.jsx';
import subsidiario from './res/subsidiario.png'


const MenuG = () => {
    const { Meta } = Card;
    const tooltipTitle = 'Configura tu empresa';
    const tooltipTitle2 = 'Agrega y edita tus empleados';
    const tooltipTitle3 = 'Agrega y edita productos';
    const tooltipTitle4 = 'Agrega y edita anuncios para los clientes';
    const tooltipTitle5 = 'Agrega y edita mesas para las sucursales';
    const tooltipTitle6 = 'Agrega y edita combos de los productos';
    const tooltipTitle7 = 'Agrega y gestiona las rescompensas de los productos';
    const tooltipTitle8 = 'Agrega y gestiona tus sucursales';
    const [currentPage, setCurrentPage] = useState('home');

    const handleCardClick = (page) => {
        console.log('Clicked on:', page);
        setCurrentPage(page);
    };

    const handleAtrasClick = (page) => {
        console.log('Clicked on:', page);
        setCurrentPage('home');
    };

    const cardStyle = {
        width: '100%',
        height: '50%',
        margin: '16px',
        marginLeft: '1px',
        backgroundColor: '#CDEECC',
        border: '1px solid #A4A4A4',
    };

    const titleStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

    

    return (
        <>

            <Row >
                {currentPage === 'home' && (
                    <>
                        <Col xs={24} sm={12} md={5} lg={3}>
                            <Badge.Ribbon text="Empresa">
                                <Tooltip title={tooltipTitle}>
                                    <Card
                                        hoverable
                                        style={cardStyle}
                                        cover={
                                            <Image
                                                alt="Empresa"
                                                src={imgempresa}
                                                style={{ padding:'5%',height: '150px', width:'auto'}}
                                                preview={false}
                                            />}
                                        className="text-center"
                                        onClick={() => handleCardClick('empresa')}
                                    >
                                        <Meta title={tooltipTitle}></Meta>
                                    </Card>
                                </Tooltip>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={24} sm={12} md={5} lg={3}>
                            <Badge.Ribbon text="Empleados" color="pink">
                                <Tooltip title={tooltipTitle2}>
                                    <Card
                                        hoverable
                                        style={cardStyle}
                                        cover={
                                            <Image
                                                alt="Empleados"
                                                src={imgempleado}
                                                style={{ padding:'5%',height: '150px', width:'auto'}}
                                                preview={false}
                                            />}
                                        className="text-center"
                                        onClick={() => handleCardClick('empleado')}
                                    >
                                        <Meta title={tooltipTitle2}></Meta>
                                    </Card>
                                </Tooltip>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={24} sm={12} md={5} lg={3}>
                            <Badge.Ribbon text="Productos" color="red">
                                <Tooltip title={tooltipTitle3}>
                                    <Card
                                        hoverable
                                        style={cardStyle}
                                        cover={
                                            <Image
                                                alt="Productos"
                                                src={imgproductos}
                                                style={{ padding:'5%',height: '150px', width:'auto'}}
                                                preview={false}
                                            />}
                                        className="text-center"
                                    >
                                        <Meta title={tooltipTitle3}></Meta>
                                    </Card>
                                </Tooltip>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={24} sm={12} md={5} lg={3}>
                            <Badge.Ribbon text="Combos" color="green">
                                <Tooltip title={tooltipTitle6}>
                                    <Card
                                        hoverable
                                        style={cardStyle}
                                        cover={
                                            <Image
                                                alt="Combos"
                                                src={imgcombos}
                                                style={{ padding:'5%',height: '150px', width:'auto'}}
                                                preview={false}
                                            />}
                                        className="text-center"
                                    >
                                        <Meta title={tooltipTitle6}></Meta>
                                    </Card>
                                </Tooltip>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={24} sm={12} md={5} lg={3}>
                            <Badge.Ribbon text="Anuncios principales" color="cyan">
                                <Tooltip title={tooltipTitle4}>
                                    <Card
                                        hoverable
                                        style={cardStyle}
                                        cover={
                                            <Image
                                                alt="Avisos principales"
                                                src={imgaviso}
                                                style={{ padding:'5%',height: '150px', width:'auto'}}
                                                preview={false}
                                            />}
                                        className="text-center"
                                    >
                                        <Meta title={tooltipTitle4}></Meta>
                                    </Card>
                                </Tooltip>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={24} sm={12} md={5} lg={3}>
                            <Badge.Ribbon text="Mesas" color="yellow">
                                <Tooltip title={tooltipTitle5}>
                                    <Card
                                        hoverable
                                        style={cardStyle}
                                        cover={
                                            <Image
                                                alt="Mesas"
                                                src={imgmesas}
                                                style={{ padding:'5%',height: '150px', width:'auto'}}
                                                preview={false}
                                            />}
                                        className="text-center"
                                    >
                                        <Meta title={tooltipTitle5}></Meta>
                                    </Card>
                                </Tooltip>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={24} sm={12} md={5} lg={3}>
                            <Badge.Ribbon text="Recompensas" color="purple">
                                <Tooltip title={tooltipTitle7}>
                                    <Card
                                        hoverable
                                        style={cardStyle}
                                        cover={
                                            <Image
                                                alt="Recompensas"
                                                src={imgrecompensa}
                                                style={{ padding:'5%',height: '150px', width:'auto'}}
                                                preview={false}
                                            />}
                                        className="text-center"
                                    >
                                        <Meta title={tooltipTitle7}></Meta>
                                    </Card>
                                </Tooltip>
                            </Badge.Ribbon>
                        </Col>
                        <Col xs={24} sm={12} md={5} lg={3}>
                            <Badge.Ribbon text="Sucursales" color="#F84173">
                                <Tooltip title={tooltipTitle8}>
                                    <Card
                                        hoverable
                                        style={cardStyle}
                                        cover={
                                            <Image
                                                alt="Sucursales"
                                                src={subsidiario}
                                                style={{ padding:'5%',height: '150px', width:'auto'}}
                                                preview={false}
                                            />}
                                        className="text-center"
                                    >
                                        <Meta title={tooltipTitle8}></Meta>
                                    </Card>
                                </Tooltip>
                            </Badge.Ribbon>
                        </Col>
                    </>
                )}
                {currentPage === 'empresa' && (
                    <>
                        <Row>
                            <Col md={12}>
                                <Empresa />
                            </Col>
                        </Row>

                    </>)}
                    {currentPage === 'empleado' && (
                    <>
                        <Row>
                            <Col md={12}>
                                <Empleados />
                            </Col>
                        </Row>

                    </>)}
                    {currentPage === 'sucursal' && (
                    <>
                        <Row>
                            <Col md={12}>
                                <Sucursales />
                            </Col>
                        </Row>

                    </>)}
                    {currentPage != 'home' && (
                    <>
                        <Row>
                            <Col md={12}>
                                <Button
                                    variant="success"
                                    style={{ position: 'fixed', right: '16px', bottom: '16px', zIndex: 1000 }}
                                    onClick={() => handleAtrasClick()}
                                >
                                    Atrás
                                </Button>
                            </Col>
                        </Row>

                    </>)}
            </Row>

        </>
    );
};

export default MenuG;