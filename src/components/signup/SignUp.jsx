import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

/* Sign Up Page for registering regular users/customers */

const SignUp = () => {
    const initialFormState = {
        firstName: { value: "", error: false, errorMessage: null },
        lastName: { value: "", error: false, errorMessage: null },
        email: { value: "", error: false, errorMessage: null },
        password: { value: "", error: false, errorMessage: null },
        confirmPassword: { value: "", error: false, errorMessage: null },
        contactNumber: { value: "", error: false, errorMessage: null },
    };

	const isSuccessLogin = null;
    const [formState, setFormState] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    const regexMatch = (pattern, value) => {
        const regex = new RegExp(pattern);
        return regex.test(value);
    };

    const validateField = (field, value) => {
        let isValid = true;
        let errorMsg = null;

        if (!value) {
            isValid = false;
            errorMsg = "This field is required.";
        } else {
            switch (field) {
                case "firstName":
                case "lastName":
                    isValid = regexMatch("^([A-Za-z]+)$", value);
                    if (!isValid) errorMsg = `Please enter a valid ${field}.`;
                    break;
                case "email":
                    isValid = regexMatch("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", value);
                    if (!isValid) errorMsg = "Please enter a valid email.";
                    break;
                case "password":
                    isValid = value.length >= 6 && value.length <= 30 && regexMatch("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,30}$", value);
                    if (!isValid) errorMsg = "Password must be 6-30 characters long, and include at least one symbol (!@#$%^&*), one uppercase letter, one lowercase letter, and one number.";
                    break;
                case "confirmPassword":
                    isValid = value === formState.password.value;
                    if (!isValid) errorMsg = "Passwords do not match.";
                    break;
                case "contactNumber":
                    isValid = regexMatch("^([7-9]{1}[0-9]{9})$", value);
                    if (!isValid) errorMsg = "Please enter a valid contact number.";
                    break;
                default:
                    break;
            }
        }

        return { isValid, errorMsg };
    };

    const validateAndSaveField = (field, value) => {
        const { isValid, errorMsg } = validateField(field, value);
        setFormState(prevState => ({
            ...prevState,
            [field]: { value, error: !isValid, errorMessage: errorMsg }
        }));
    };

    const handleChange = (field, value) => {
        setFormState(prevState => ({
            ...prevState,
            [field]: { ...prevState[field], value }
        }));
    };

    const handleSignUp = () => {
        let updatedFormState = { ...formState };
        let requestData = {};
        let isFormValid = true;

        for (let field in formState) {
            const { isValid, errorMsg } = validateField(field, formState[field].value);
            updatedFormState[field] = { ...updatedFormState[field], error: !isValid, errorMessage: errorMsg };
            isFormValid = isFormValid && isValid;
            if (isValid) {
                requestData[field] = formState[field].value;
            }
        }

        setFormState(updatedFormState);

        if (isFormValid) {
            setLoading(true);
            // Simulate sign up request
            setTimeout(() => {
                setLoading(false);
                // Handle successful sign up
                console.log("Signed up successfully:", requestData);
            }, 2000);
        }
    };

    return isSuccessLogin === null ? (
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
                            <Typography
                                variant="subtitle1"
                                noWrap
                                sx={{ fontSize: "25px", color: 'inherit' }}
                            >
                                Sign up
                            </Typography>
                        </div>
                        {Object.keys(initialFormState).map((field, index) => (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }} key={index}>
                                <TextField
                                    id={field}
                                    label={`${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} *`}
                                    variant="outlined"
                                    fullWidth
                                    type={field === 'email' ? 'email' : field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
                                    value={formState[field].value}
                                    onChange={(event) => handleChange(field, event.target.value)}
                                    onBlur={(event) => validateAndSaveField(field, event.target.value)}
                                    error={formState[field].error}
                                    helperText={formState[field].error && formState[field].errorMessage}
                                />
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
                            <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
                                SIGN UP
                            </Button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right', marginTop: "30px" }}>
                            <Link to="/login">
                                <Typography variant="body1">
                                    Already have an account? Sign in
                                </Typography>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>
            </Grid>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    ) : (
        <Navigate to="/home" />
    );
};

export default SignUp;
