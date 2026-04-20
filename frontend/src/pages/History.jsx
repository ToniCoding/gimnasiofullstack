import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSessions } from '../api';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const History = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await getAllSessions();
                setSessions(response.data);
            } catch (err) {
                setError('Error al cargar el historial');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuracion = (segundos) => {
        const minutos = Math.floor(segundos / 60);
        const segs = segundos % 60;
        return `${minutos} min ${segs} seg`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Typography variant="h4" component="h1" gutterBottom>
                Historial de Entrenamientos
            </Typography>

            {error && <Alert severity="error" className="mb-4">{error}</Alert>}

            {sessions.length === 0 ? (
                <Card>
                    <CardContent>
                        <Typography textAlign="center" color="textSecondary">
                            No tienes entrenamientos registrados.
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {sessions.map((session) => (
                        <Accordion key={session.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <div className="flex justify-between items-center w-full pr-4">
                                    <div>
                                        <Typography variant="subtitle1" className="font-semibold">
                                            {formatDate(session.timestampCreacion)}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Duración: {formatDuracion(session.duracionSegundos)}
                                        </Typography>
                                    </div>
                                    <Chip
                                        label={`${session.ejercicios?.length || 0} ejercicios`}
                                        size="small"
                                        color="primary"
                                    />
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="space-y-4">
                                    {session.ejercicios?.map((ejercicio, idx) => (
                                        <div key={ejercicio.id} className="border-l-4 border-blue-500 pl-4">
                                            <Typography variant="subtitle2" className="font-semibold">
                                                {idx + 1}. {ejercicio.nombre}
                                            </Typography>
                                            {ejercicio.descripcion && (
                                                <Typography variant="body2" color="textSecondary">
                                                    {ejercicio.descripcion}
                                                </Typography>
                                            )}
                                            <div className="mt-2">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                    <tr className="text-left">
                                                        <th className="pb-1">Serie</th>
                                                        <th className="pb-1">KG</th>
                                                        <th className="pb-1">Repeticiones</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {ejercicio.series?.map((serie, sIdx) => (
                                                        <tr key={serie.id}>
                                                            <td className="py-1">{sIdx + 1}</td>
                                                            <td className="py-1">{serie.kg}</td>
                                                            <td className="py-1">{serie.repeticiones}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
