import React, { useState } from 'react';
import { Table, TimePicker, Tag, message, Button } from 'antd';
import { Row, Col } from 'react-bootstrap';

const CrearHorariosSemanales = ({ onHorarioCreate }) => {
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

    const handleTimeChange = (index, value, setDayData) => {
        setDayData((prevData) => {
            const updatedData = [...prevData.slice(0, index), { time: value }];

            if (value !== null && index === prevData.length - 1) {
                updatedData.push({ time: null });
            }

            if (index > 0) {
                const prevTime = prevData[index - 1]?.time;
                if (prevTime && value && value.isBefore(prevTime)) {
                    message.error('La nueva hora debe ser mayor que la anterior');
                    return prevData;
                }

                const prevTag = prevData[index - 1]?.tag;
                const currentTag = prevTag === 'Abrir' ? 'Cerrar' : 'Abrir';
                updatedData[index] = { time: value, tag: currentTag };
            } else {
                updatedData[index] = { time: value, tag: value ? 'Abrir' : 'Sin especificar' };
            }

            return updatedData;
        });
    };

    const renderDayTable = (dayName, dayData, setDayData) => {
        return (
            <>
                <table className="table " headers="false"  >
                    <thead>
                        <tr>
                            <th>{dayName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {dayData.map((record, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        {record.time ? (
                                            <>
                                                <Tag color={record.tag === 'Abrir' ? '#52c41a' : '#f5222d'}>{record.tag}</Tag>
                                                <TimePicker
                                                    format="HH:mm"
                                                    value={record.time}
                                                    onChange={(value) => handleTimeChange(index, value, setDayData)}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Tag color="#858585">Sin especificar</Tag>
                                                <TimePicker
                                                    format="HH:mm"
                                                    onChange={(value) => handleTimeChange(index, value, setDayData)}
                                                />
                                            </>
                                        )}
                                    </div>
                                ))}
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
                <table className="table table-bordered" headers="false" style={{ border: '1px solid #A4A4A4' }}>
  
                    <tbody>
                        <tr>
                            <td>
                                <table className="table" headers="false" style={{ border: '1px solid #A4A4A4' }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {renderDayTable('Domingo', domingoData, setDomingoData)}
                                            </td>
                                            <td>
                                                {renderDayTable('Lunes', lunesData, setLunesData)}
                                            </td>
                                            <td>
                                                {renderDayTable('Martes', martesData, setMartesData)}
                                            </td>
                                            <td>
                                                {renderDayTable('Miércoles', miercolesData, setMiercolesData)}
                                            </td>
                                            <td>
                                                {renderDayTable('Jueves', juevesData, setJuevesData)}
                                            </td>
                                            <td>
                                                {renderDayTable('Viernes', viernesData, setViernesData)}
                                            </td>
                                            <td>
                                                {renderDayTable('Sábado', sabadoData, setSabadoData)}
                                            </td>
                                            <td>
                                                {renderDayTable('Domingo', domingoData, setDomingoData)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
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
export default CrearHorariosSemanales;
