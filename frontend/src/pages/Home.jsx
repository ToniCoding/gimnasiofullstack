import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessionsSummary } from '../api';
import { useAuth } from '../context/AuthContext';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';

const Home = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchSessions = async () => {
            try {
                const response = await getSessionsSummary();
                setSessions(response.data);
            } catch (err) {
                setError('Error al cargar las sesiones');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, [isAuthenticated, navigate]);

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4" component="h1">
                    Mis Entrenamientos
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/training')}
                >
                    Nuevo Entrenamiento
                </Button>
            </div>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {sessions.length === 0 ? (
                <Card>
                    <CardContent>
                        <Typography textAlign="center" color="textSecondary">
                            No tienes entrenamientos registrados.
                            Haz clic en "Nuevo Entrenamiento" para comenzar.
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Grid container spacing={3}>
                    {sessions.map((session) => (
                        <Grid item xs={12} sm={6} md={4} key={session.id}>
                            <Card
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => navigate(`/session/${session.id}`)}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        {formatDate(session.timestampCreacion)}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Duración: {Math.floor(session.duracionSegundos / 60)} min {session.duracionSegundos % 60} seg
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Ejercicios: {session.totalEjercicios}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Series totales: {session.totalSeries}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default Home;
