import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../api';
import { useAuth } from '../context/AuthContext';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Grid
} from '@mui/material';

const Profile = () => {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        username: '',
        fechaNacimiento: '',
        genero: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                const data = response.data;
                setFormData({
                    nombre: data.nombre || '',
                    apellidos: data.apellidos || '',
                    email: data.email || '',
                    username: data.username || '',
                    fechaNacimiento: data.fechaNacimiento || '',
                    genero: data.genero || ''
                });
            } catch (err) {
                setError('Error al cargar el perfil');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        const payload = {};
        if (formData.nombre) payload.nombre = formData.nombre;
        if (formData.apellidos) payload.apellidos = formData.apellidos;
        if (formData.email) payload.email = formData.email;
        if (formData.fechaNacimiento) payload.fechaNacimiento = formData.fechaNacimiento;

        try {
            await updateProfile(payload);
            setSuccess('Perfil actualizado correctamente');
        } catch (err) {
            setError('Error al actualizar el perfil');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Mi Perfil
                    </Typography>

                    {error && <Alert severity="error" className="mb-4">{error}</Alert>}
                    {success && <Alert severity="success" className="mb-4">{success}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Nombre"
                                    name="nombre"
                                    fullWidth
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Apellidos"
                                    name="apellidos"
                                    fullWidth
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Nombre de usuario"
                                    name="username"
                                    fullWidth
                                    disabled
                                    value={formData.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Fecha de nacimiento"
                                    name="fechaNacimiento"
                                    type="date"
                                    fullWidth
                                    slotProps={{ inputLabel: { shrink: true } }}
                                    value={formData.fechaNacimiento}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Género"
                                    name="genero"
                                    fullWidth
                                    disabled
                                    value={formData.genero || 'No especificado'}
                                />
                            </Grid>
                        </Grid>

                        <div className="flex gap-3 mt-6">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={saving}
                            >
                                {saving ? 'Guardando...' : 'Guardar cambios'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={logout}
                            >
                                Cerrar sesión
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
