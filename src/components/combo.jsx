import React, { useState, useEffect } from 'react';
import { Form, Card, Input, Pagination, Button, Select, Modal, Upload, Tooltip, Badge, Segmented, Avatar, Checkbox, Drawer, Divider } from 'antd';
import { Row, Col } from 'react-bootstrap';
import imgcombos from './res/imgcombos.png';
import NuevoComboForm from './crearcombo';

const { Meta } = Card;
const { Option } = Select;

const Combos = () => {
    const [openp, setOpenp] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOpcion, setSelectedOpcion] = useState('Combos');
    const [total, setTotal] = useState(0);

    const Changueopcion = (value) => {
        setSelectedOpcion(value);
    }

    const showDrawerp = () => {
        setOpenp(true);
    };

    const onClosep = () => {
        setOpenp(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div>
            <Row>
                <Col md={12}>
                    <Segmented
                        options={[
                            {
                                label: (
                                    <Tooltip title="Combos">
                                        <div style={{ padding: 4 }}>
                                            <Avatar shape="square" src={imgcombos} size="large" />
                                        </div>
                                    </Tooltip>
                                ),
                                value: 'Combos',
                            }
                        ]}
                    />
                </Col>
                {selectedOpcion === 'Combos' && (
                    <>
                        <Divider>Control combos</Divider>
                        <Col md={12}>
                            <Button type="primary" style={{ width: '100%', margin: '2%' }} onClick={showDrawerp}>
                                Crear nuevo combo
                            </Button>
                        </Col>
                        <Col md={12}>
                            <Row>

                            </Row>
                            <Pagination current={currentPage} total={total} onChange={handlePageChange} pageSize={8} style={{ marginTop: '16px', textAlign: 'center' }} />
                        </Col>
                    </>)}
            </Row>
            <Drawer
                title="Crear combo"
                width={720}
                onClose={onClosep}
                open={openp}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                < NuevoComboForm/>
            </Drawer>
        </div>
    );
};

export default Combos;