import React, { useState } from 'react';
import { Table, TimePicker, Tag, message, Button } from 'antd';
import { Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';

const EditarHorariosSemanales = ({ onHorarioCreate, detalles, handleTimeChange }) => {
    const [lunesData, setLunesData] = useState([{ time: null }]);
    const [martesData, setMartesData] = useState([{ time: null }]);
    const [miercolesData, setMiercolesData] = useState([{ time: null }]);
    const [juevesData, setJuevesData] = useState([{ time: null }]);
    const [viernesData, setViernesData] = useState([{ time: null }]);
    const [sabadoData, setSabadoData] = useState([{ time: null }]);
    const [domingoData, setDomingoData] = useState([{ time: null }]);
    const [jsonHorario, setJsonHorario] = useState(null);

    const handleCreateHorario = () => {
        const horarioData = {
            L: lunesData,
            M: martesData,
            X: miercolesData,
            J: juevesData,
            V: viernesData,
            S: sabadoData,
            D: domingoData,
        };

        const formattedData = [];
        Object.keys(horarioData).forEach((day) => {
            const dayData = horarioData[day];
            for (let i = 0; i < dayData.length; i += 2) {
                const horaInicio = dayData[i]?.time?.format('HH:mm');
                const horaFin = dayData[i + 1]?.time?.format('HH:mm');

                if (horaInicio && horaFin) {
                    formattedData.push({
                        dia: day,
                        hora_inicio: horaInicio,
                        hora_fin: horaFin,
                    });
                }
            }
        });

        // Puedes imprimir el JSON en la consola o enviarlo a tu backend
        console.log('JSON de Horario:', formattedData);

        // Puedes almacenar el JSON en el estado o realizar cualquier otra acción necesaria
        onHorarioCreate({ Detalles: formattedData });

        // Agrega el mensaje de éxito o cualquier otra lógica de manejo
        message.success('Horario creado exitosamente');
    };

    const renderDayTable = (dayName, dayData, setDayData) => {
        const detallesDia = dayData.map((record) =>
            jsonHorario?.detalles.find((detalle) => detalle.dia === dayName && detalle.hora_inicio === record.time.format('HH:mm')) || null
        );

        return (
            <>
                <table className="table " headers="false">
                    <thead>
                        <tr>
                            <th>{dayName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {dayData.map((record, index) => {
                                    const detalleActual = detallesDia.find((detalle) => detalle && detalle.hora_inicio === record.time.format('HH:mm'));

                                    return (
                                        <div key={index} style={{ marginBottom: '10px' }}>
                                            {detalleActual ? (
                                                <>
                                                    <Tag color={detalleActual.tag === 'Abrir' ? '#52c41a' : '#f5222d'}>{detalleActual.tag}</Tag>
                                                    <TimePicker
                                                        format="HH:mm"
                                                        value={record.time}
                                                        onChange={(value) => handleTimeChange(index, value, setDomingoData)}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Tag color="#858585">Sin especificar</Tag>
                                                    <TimePicker
                                                        format="HH:mm"
                                                        onChange={(value) => handleTimeChange(index, value, setDomingoData)}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered" style={{ border: '1px solid #A4A4A4', marginTop: '5%' }}>
                    <thead>
                        <tr>
                            <th scope="col">Domingo</th>
                            <th scope="col">Lunes</th>
                            <th scope="col">Martes</th>
                            <th scope="col">Miércoles</th>
                            <th scope="col">Jueves</th>
                            <th scope="col">Viernes</th>
                            <th scope="col">Sábado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((dia, index) => (
                                <td key={index} className="text-left">
                                    {detalles.map((detalle) => {
                                        if (detalle.dia === dia) {
                                            return (
                                                <>
                                                    <Tag color={detalle.hora_inicio ? '#52c41a' : '#f5222d'}>
                                                        {detalle.hora_inicio ? 'Abrir' : 'Cerrar'}
                                                    </Tag>
                                                    <br />
                                                    <TimePicker
                                                        format="HH:mm"
                                                        defaultValue={dayjs(detalle.hora_inicio, 'HH:mm:ss')}
                                                        onChange={(value) => handleTimeChange(index, value, setDayData)}
                                                    />
                                                    <br />
                                                    <Tag color={detalle.hora_fin ? '#f5222d' : '#52c41a'}>
                                                        {detalle.hora_fin ? 'Cerrar' : 'Abrir'}
                                                    </Tag>
                                                    <br />
                                                    <TimePicker
                                                        format="HH:mm"
                                                        defaultValue={dayjs(detalle.hora_fin, 'HH:mm:ss')}
                                                        onChange={(value) => handleTimeChange(index, value, setDayData)}
                                                    />
                                                    <br />
                                                    <Tag color="#858585">Sin especificar</Tag>
                                                    <TimePicker
                                                        format="HH:mm"
                                                        onChange={(value) => handleTimeChange(index, value, setDayData)}
                                                    />
                                                </>
                                            );
                                        }
                                    })}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <Button type="primary" onClick={handleCreateHorario}>
                Crear horario
            </Button>
        </>
    );
};

export default EditarHorariosSemanales;
