import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Card, CardContent, Typography, Alert } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                        Iniciar Sesión
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 2, mb: 1 }}
                        >
                            {loading ? 'Cargando...' : 'Ingresar'}
                        </Button>

                        <Typography sx={{ textAlign: 'center', mt: 2 }}>
                            ¿No tienes cuenta?{' '}
                            <Link to="/register" style={{ color: '#1976d2' }}>
                                Regístrate
                            </Link>
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;