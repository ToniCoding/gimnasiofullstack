import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSessionById } from '../api';
import {
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Chip,
    Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SessionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await getSessionById(id);
                setSession(response.data);
            } catch (err) {
                if (err.response?.status === 403) {
                    setError('No tienes permiso para ver esta sesión');
                } else if (err.response?.status === 404) {
                    setError('Sesión no encontrada');
                } else {
                    setError('Error al cargar la sesión');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [id]);

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

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert severity="error" className="mb-4">
                    {error}
                </Alert>
                <Button variant="outlined" onClick={() => navigate('/')}>
                    Volver al inicio
                </Button>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                className="mb-4"
            >
                Volver
            </Button>

            <Card>
                <CardContent>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Entrenamiento
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {formatDate(session.timestampCreacion)}
                            </Typography>
                        </div>
                        <Chip
                            label={formatDuracion(session.duracionSegundos)}
                            color="primary"
                            size="medium"
                        />
                    </div>

                    <Divider className="my-4" />

                    <Typography variant="h6" gutterBottom>
                        Ejercicios realizados
                    </Typography>

                    <div className="space-y-6 mt-4">
                        {session.ejercicios?.map((ejercicio, idx) => (
                            <Card key={ejercicio.id} variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" className="font-semibold" gutterBottom>
                                        {idx + 1}. {ejercicio.nombre}
                                    </Typography>
                                    {ejercicio.descripcion && (
                                        <Typography variant="body2" color="textSecondary" className="mb-3">
                                            {ejercicio.descripcion}
                                        </Typography>
                                    )}

                                    <table className="w-full mt-3 border-collapse">
                                        <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2">Serie</th>
                                            <th className="text-left py-2">KG</th>
                                            <th className="text-left py-2">Repeticiones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {ejercicio.series?.map((serie, sIdx) => (
                                            <tr key={serie.id} className="border-b">
                                                <td className="py-2">{sIdx + 1}</td>
                                                <td className="py-2">{serie.kg}</td>
                                                <td className="py-2">{serie.repeticiones}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SessionDetail;
