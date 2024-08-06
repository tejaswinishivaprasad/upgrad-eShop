/* This component provides features to register a new user into MONGO DB.
The details enterd by the user are sent to bakend api and the registered user is redirected to login page 
*/
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { successMsg, errorMsg } from "../broadcastMessages/BroadcastMessages";
import { signup } from "../../common/services/apiService";
import { TextField, Box, Typography } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles: "user",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

   // Validation function
   const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^[0-9]+$/;

    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
    };

    let hasEmptyFields = false;

    // Check for collective errors
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (!value.trim()) {
        hasEmptyFields = true;
      }
    });

    if (hasEmptyFields) {
      errorMsg('Please fill all the required fields.');
      return false;
    } 

    // Validate each field
    Object.keys(data).forEach((key) => {
      const value = data[key];
      switch (key) {
        case 'firstName':
        case 'lastName':
          const label =
            key.charAt(0).toUpperCase() +
            key.slice(1).replace(/([A-Z])/g, ' $1');
          if (!value.trim()) {
            newErrors[key] = `${label} is required`;
          } else if (!nameRegex.test(value)) {
            newErrors[key] = `${label} should not contain numbers`;
          }
          break;
        case 'email':
          if (!value.trim()) {
            newErrors[key] = 'Email is required';
          } else if (!emailRegex.test(value)) {
            newErrors[key] = 'Invalid email address';
          }
          break;
        case 'password':
          if (!value.trim()) {
            newErrors[key] = 'Password is required';
          } else if (!passwordRegex.test(value)) {
            newErrors[key] =
              "Password must be at least 6 characters long and should be a combination of alphanumeric and atleast one special character";
          }
          break;
        case 'confirmPassword':
          if (!value.trim()) {
            newErrors[key] = 'Confirm Password is required';
          } else if (value !== data.password) {
            newErrors[key] = 'Confirm Password does not match Password';
          }
          break;
        case 'contactNumber':
          if (!value.trim()) {
            newErrors[key] = 'Contact Number is required';
          } else if (!phoneRegex.test(value)) {
            newErrors[key] = 'Contact Number should not contain alphabets';
          }
          break;
        default:
          break;
      }
    });

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };
  // Function to handle sign-up logic
  const signUp = async () => {
    if (!validateFields()) {
      return;
    }
    try {
      const res = await signup(data);
      const jsonResponse = await res.json();
      if (res.ok) {
        // Handle successful response
        successMsg(jsonResponse.message);
        navigate("/login");
      } else {
        // Handle error response
        errorMsg(jsonResponse.message);
      }
    } catch (e) {
      // Handle errors (e.g., network issues)
      errorMsg("Error occurred during signup");
    }
  };
  // Function to handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Reset the error message when the user starts typing
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10%",
              }}
            >
              <LockOutlinedIcon
                style={{
                  display: "inline-block",
                  borderRadius: "60px",
                  padding: "0.6em 0.6em",
                  color: "#ffffff",
                  background: "#f50057",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="subtitle1"
                noWrap
                sx={{
                  fontSize: "25px",
                  color: "inherit",
                }}
              >
                Sign up
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                name="firstName"
                label="First Name*"
                variant="outlined"
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                type="text"
                name="lastName"
                variant="outlined"
                label="Last Name*"
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                type="email"
                name="email"
                variant="outlined"
                label="Email Address*"
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                type="password"
                name="password"
                variant="outlined"
                label="Password*"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                type="password"
                name="confirmPassword"
                variant="outlined"
                label="Confirm Password*"
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                type="text"
                name="contactNumber"
                variant="outlined"
                label="Contact Number*"
                onChange={handleChange}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
                fullWidth
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={signUp}
                style={{ backgroundColor: "#3f51b5" }}
              >
                SIGN UP
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                marginTop: "30px",
              }}
            >
              <NavLink to="/login">
                <Typography variant="body1">
                  Already have an account? Sign in
                </Typography>
              </NavLink>
            </div>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Signup;
