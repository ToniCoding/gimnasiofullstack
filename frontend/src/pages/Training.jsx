import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrainingSession } from '../api';
import {
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    IconButton,
    Alert,
    Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Training = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [duracionMinutos, setDuracionMinutos] = useState(30);
    const [ejercicios, setEjercicios] = useState([
        {
            id: Date.now(),
            nombre: '',
            descripcion: '',
            series: [{ id: Date.now(), kg: 0, repeticiones: 0 }]
        }
    ]);

    const agregarEjercicio = () => {
        setEjercicios([
            ...ejercicios,
            {
                id: Date.now(),
                nombre: '',
                descripcion: '',
                series: [{ id: Date.now(), kg: 0, repeticiones: 0 }]
            }
        ]);
    };

    const eliminarEjercicio = (index) => {
        const nuevosEjercicios = ejercicios.filter((_, i) => i !== index);
        setEjercicios(nuevosEjercicios);
    };

    const actualizarEjercicio = (index, campo, valor) => {
        const nuevosEjercicios = [...ejercicios];
        nuevosEjercicios[index][campo] = valor;
        setEjercicios(nuevosEjercicios);
    };

    const agregarSerie = (ejercicioIndex) => {
        const nuevosEjercicios = [...ejercicios];
        nuevosEjercicios[ejercicioIndex].series.push({
            id: Date.now(),
            kg: 0,
            repeticiones: 0
        });
        setEjercicios(nuevosEjercicios);
    };

    const actualizarSerie = (ejercicioIndex, serieIndex, campo, valor) => {
        const nuevosEjercicios = [...ejercicios];
        nuevosEjercicios[ejercicioIndex].series[serieIndex][campo] = valor;
        setEjercicios(nuevosEjercicios);
    };

    const eliminarSerie = (ejercicioIndex, serieIndex) => {
        const nuevosEjercicios = [...ejercicios];
        nuevosEjercicios[ejercicioIndex].series = nuevosEjercicios[ejercicioIndex].series.filter(
            (_, i) => i !== serieIndex
        );
        setEjercicios(nuevosEjercicios);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const duracionSegundos = duracionMinutos * 60;

        const payload = {
            duracionSegundos,
            timestampCreacion: new Date().toISOString(),
            ejercicios: ejercicios.map(ej => ({
                nombreEjercicio: ej.nombre,
                descripcion: ej.descripcion,
                series: ej.series.map(serie => ({
                    kg: parseFloat(serie.kg),
                    repeticiones: parseInt(serie.repeticiones)
                }))
            }))
        };

        try {
            await createTrainingSession(payload);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el entrenamiento');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Typography variant="h4" component="h1" gutterBottom>
                Nuevo Entrenamiento
            </Typography>

            <form onSubmit={handleSubmit}>
                <Card className="mb-6">
                    <CardContent>
                        <TextField
                            label="Duración (minutos)"
                            type="number"
                            fullWidth
                            value={duracionMinutos}
                            onChange={(e) => setDuracionMinutos(parseInt(e.target.value))}
                            required
                            inputProps={{ min: 1 }}
                        />
                    </CardContent>
                </Card>

                {ejercicios.map((ejercicio, ejIndex) => (
                    <Card key={ejercicio.id} className="mb-6">
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Typography variant="h6">
                                    Ejercicio {ejIndex + 1}
                                </Typography>
                                <IconButton
                                    color="error"
                                    onClick={() => eliminarEjercicio(ejIndex)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>

                            <TextField
                                label="Nombre del ejercicio"
                                fullWidth
                                className="mb-3"
                                value={ejercicio.nombre}
                                onChange={(e) => actualizarEjercicio(ejIndex, 'nombre', e.target.value)}
                                required
                            />

                            <TextField
                                label="Descripción (opcional)"
                                fullWidth
                                className="mb-3"
                                value={ejercicio.descripcion}
                                onChange={(e) => actualizarEjercicio(ejIndex, 'descripcion', e.target.value)}
                            />

                            <Typography variant="subtitle1" className="mt-3 mb-2">
                                Series
                            </Typography>

                            {ejercicio.series.map((serie, sIndex) => (
                                <Box key={serie.id} className="flex gap-3 mb-2 items-center">
                                    <TextField
                                        label={`Serie ${sIndex + 1} - KG`}
                                        type="number"
                                        size="small"
                                        value={serie.kg}
                                        onChange={(e) => actualizarSerie(ejIndex, sIndex, 'kg', e.target.value)}
                                        required
                                    />
                                    <TextField
                                        label={`Serie ${sIndex + 1} - Repeticiones`}
                                        type="number"
                                        size="small"
                                        value={serie.repeticiones}
                                        onChange={(e) => actualizarSerie(ejIndex, sIndex, 'repeticiones', e.target.value)}
                                        required
                                    />
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => eliminarSerie(ejIndex, sIndex)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}

                            <Button
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={() => agregarSerie(ejIndex)}
                                className="mt-2"
                            >
                                Añadir serie
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                <div className="flex gap-3 mb-6">
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={agregarEjercicio}
                    >
                        Añadir ejercicio
                    </Button>
                </div>

                {error && <Alert severity="error" className="mb-4">{error}</Alert>}

                <div className="flex gap-3">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar entrenamiento'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Training;