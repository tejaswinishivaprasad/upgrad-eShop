import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [fields, setFields] = useState({
        email: { value: '', error: '' },
        password: { value: '', error: '' }
    });
    const [loading, setLoading] = useState(false);
    const { AuthCtx } = useAuth();
    const { login, currentUser } = useContext(AuthCtx);

    useEffect(() => {
        if (currentUser) {
            console.log("its succ login");
            <Navigate to="/home" />
        }
    }, [currentUser]);

    const handleFieldChange = (field, value) => {
        setFields({
            ...fields,
            [field]: { value, error: '' }
        });
    };

    const validateFields = () => {
        let isValid = true;
        const newFields = { ...fields };

        // Email validation
        if (!fields.email.value) {
            newFields.email.error = 'Email is required.';
            isValid = false;
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(fields.email.value)) {
            newFields.email.error = 'Please enter a valid email.';
            isValid = false;
        }

        // Password validation
        if (!fields.password.value) {
            newFields.password.error = 'Password is required.';
            isValid = false;
        } else if (fields.password.value.length < 6) {
            newFields.password.error = 'Password must be at least 6 characters.';
            isValid = false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(fields.password.value)) {
            newFields.password.error = 'Password must contain upper, lower case letters, numbers, and special characters.';
            isValid = false;
        }

        setFields(newFields);
        return isValid;
    };

    const handleLogin = (event) => {
        event.preventDefault(); // Prevent the default form submission
        if (validateFields()) {
            setLoading(true);
            login(fields.email.value, fields.password.value)
                .then(() => {
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    // Handle login error (e.g., show error message)
                });
        }
    };

    return !currentUser ? (
        <Box className="login-container">
            <form onSubmit={handleLogin}>
                <div className="icon-container">
                    <LockOutlinedIcon className="icon" />
                </div>
                <div className="title">
                    <Typography variant="h6" noWrap>Sign In</Typography>
                </div>
                <div className="input-container">
                    <TextField
                        id="email"
                        label="Email Address *"
                        variant="outlined"
                        type="email"
                        value={fields.email.value}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        error={!!fields.email.error}
                        helperText={fields.email.error}
                        className="text-field"
                        autoComplete="email" // Added autocomplete attribute
                    />
                </div>
                <div className="input-container">
                    <TextField
                        id="password"
                        label="Password *"
                        variant="outlined"
                        type="password"
                        value={fields.password.value}
                        onChange={(e) => handleFieldChange('password', e.target.value)}
                        error={!!fields.password.error}
                        helperText={fields.password.error}
                        className="text-field"
                        autoComplete="current-password" // Added autocomplete attribute
                    />
                </div>
                <div className="input-container">
                    <Button
                        className="sign-in-button"
                        variant="contained"
                        type="submit" // Set the button type to "submit"
                        style={{ backgroundColor: '#3f51b5', color: '#ffffff' }}
                    >
                        Sign In
                    </Button>
                </div>
                <div className="input-container">
                    <Link to="/signup" className="signup-text">
                        <Typography variant="body1" align="left">
                            Don't have an account? Sign Up
                        </Typography>
                    </Link>
                </div>
            </form>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    ) : (
        
        <Navigate to="/home" />
    );
};

export default Login;
