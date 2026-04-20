import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Training from './pages/Training';
import NotFound from './pages/NotFound';
import History from './pages/History';
import Profile from './pages/Profile';
import SessionDetail from './pages/SessionDetail';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <div className="p-4">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/training" element={<Training />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/history" element={<History />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/session/:id" element={<SessionDetail />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;