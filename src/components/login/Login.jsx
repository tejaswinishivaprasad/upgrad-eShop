import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

/* This component handles all the Login page functionalities */

const Login = () => {
    const [formInputs, setFormInputs] = useState({
        username: { value: "", error: false, errorMessage: null },
        password: { value: "", error: false, errorMessage: null }
    });
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const succLogin = false;

    const regexMatcher = (exp, value) => {
        const regex = new RegExp(exp);
        return regex.test(value);
    };

    const validateUserAndPwd = (field, value) => {
        let valid = true;
        let errorMsg = null;

        if (!value) {
            valid = false;
            errorMsg = "This field is required.";
        } else {
            if (field === "username") {
                valid = regexMatcher("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", value);
                if (!valid) errorMsg = "Please enter a valid email!";
            }
            if (field === "password") {
                if (value.length < 6 || value.length > 40) {
                    valid = false;
                    errorMsg = "Password's length must be between 6 and 40.";
                }
            }
        }

        return { valid, errorMsg };
    };

    const saveData = (field, value) => {
        const { valid, errorMsg } = validateUserAndPwd(field, value);
        setFormInputs(prevState => ({
            ...prevState,
            [field]: { value, error: !valid, errorMessage: errorMsg }
        }));
    };

    const saveOnFieldChange = (field, value) => {
        setFormInputs(prevState => ({
            ...prevState,
            [field]: { ...prevState[field], value }
        }));
    };

    const handleLogin = () => {
        const formData = { ...formInputs };
        let isValidForm = true;
        const requestJson = {};

        Object.keys(formInputs).forEach(field => {
            const { valid, errorMsg } = validateUserAndPwd(field, formInputs[field].value);
            formData[field] = { ...formData[field], error: !valid, errorMessage: errorMsg };
            isValidForm = isValidForm && valid;
            if (valid) requestJson[field] = formInputs[field].value;
        });

        setFormInputs(formData);

        if (isValidForm) {
            setIsLoading(true);
            //Need to add login conditions here 
        }
    };

    return succLogin ? (
        <Navigate to="/home" />
    ) : (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10%" }}>
                            <LockOutlinedIcon style={{
                                display: 'inline-block',
                                borderRadius: '60px',
                                padding: '0.6em 0.6em',
                                color: '#ffffff',
                                background: "#f50057"
                            }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="subtitle1" noWrap sx={{ fontSize: "25px", color: 'inherit' }}>
                                Sign in
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', jmarginTop: "30px" , ustifyContent: 'center'}}>
                            <TextField
                                id="username"
                                label="Email Address *"
                                fullWidth
                                type="email"
								variant="outlined"
                                value={formInputs.username.value}
                                onChange={(event) => saveOnFieldChange("username", event.target.value)}
                                onBlur={(event) => saveData("username", event.target.value)}
                                error={formInputs.username.error}
                                helperText={formInputs.username.error && formInputs.username.errorMessage}
                            />
                        </div>
                        <div style={{ display: 'flex',  marginTop: "30px" ,justifyContent: 'center',}}>
                            <TextField
                                id="password"
                                label="Password *"
                                fullWidth
                                type="password"
								variant="outlined"
                                value={formInputs.password.value}
                                onChange={(event) => saveOnFieldChange("password", event.target.value)}
                                onBlur={(event) => saveData("password", event.target.value)}
                                error={formInputs.password.error}
                                helperText={formInputs.password.error && formInputs.password.errorMessage}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleLogin}
                            >
                                SIGN IN
                            </Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'left', marginTop: "30px" }}>
                            <Link to="/signup">
                                <Typography variant="body1">
                                    Don't have an account? Sign Up
                                </Typography>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default Login;
