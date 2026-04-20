import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api';
import { TextField, Button, Card, CardContent, Typography, Alert, MenuItem } from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        username: '',
        password: '',
        fechaNacimiento: '',
        genero: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await registerApi(formData);
            setSuccess('Usuario registrado correctamente. Redirigiendo al login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Error al registrar usuario';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <Card sx={{ maxWidth: 500, width: '100%', p: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                        Registro de Usuario
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            fullWidth
                            margin="normal"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Apellidos"
                            name="apellidos"
                            fullWidth
                            margin="normal"
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Nombre de usuario"
                            name="username"
                            fullWidth
                            margin="normal"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Fecha de nacimiento"
                            name="fechaNacimiento"
                            type="date"
                            fullWidth
                            margin="normal"
                            slotProps={{ inputLabel: { shrink: true } }}
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Género"
                            name="genero"
                            select
                            fullWidth
                            margin="normal"
                            value={formData.genero}
                            onChange={handleChange}
                        >
                            <MenuItem value="">No especificar</MenuItem>
                            <MenuItem value="Masculino">Masculino</MenuItem>
                            <MenuItem value="Femenino">Femenino</MenuItem>
                            <MenuItem value="Otro">Otro</MenuItem>
                        </TextField>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 2, mb: 1 }}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </Button>

                        <Typography sx={{ textAlign: 'center', mt: 2 }}>
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/login" style={{ color: '#1976d2' }}>
                                Inicia sesión
                            </Link>
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;