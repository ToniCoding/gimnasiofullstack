import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Gimnasio</Link>
                </Typography>

                {isAuthenticated ? (
                    <>
                        <Button color="inherit" component={Link} to="/">Inicio</Button>
                        <Button color="inherit" component={Link} to="/training">Entrenar</Button>
                        <Button color="inherit" component={Link} to="/history">Historial</Button>
                        <Button color="inherit" component={Link} to="/profile">Perfil</Button>
                        <Button color="inherit" onClick={handleLogout}>Salir</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Registro</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
