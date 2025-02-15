/*
Login Component handles the functionalties to authenticate a user and has validation for the Login Page.
*/
import { useState } from "react";
import { successMsg, errorMsg } from "../broadcastMessages/BroadcastMessages";
import { login } from "../../common/services/apiService";
import { TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  //Validate login form fields
  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const newErrors = {
      username: "",
      password: "",
    };

    if (!loginData.username.trim() || !loginData.password.trim()) {
      errorMsg("Please fill all the required fields!");
      return;
    }
    if (!emailRegex.test(loginData.username)) {
      newErrors.username = "Invalid email address";
    }

    if (!passwordRegex.test(loginData.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and should be a combination of alphanumeric and atleast one special character";
    }

    setErrors(newErrors);

    return !newErrors.username && !newErrors.password;
  };

  //API call to login the user
  const signIn = async () => {
    if (!validateFields()) {
      return;
    }
    // Attempt to login
    try {
      const { response, jsonResponse } = await login(loginData);

      if (response.ok) {
        // Handle successful response
        successMsg("Login Successful !");
        navigate("/products");
      } else {
        // Handle error response
        errorMsg(jsonResponse.error);
      }
    } catch (e) {
      // Show error message if login fails
      errorMsg("Error occurred while logging in!");
    }
  };

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
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
                Sign in
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
                name="username"
                type="email"
                variant="outlined"
                label="Email Address*"
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
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
                name="password"
                type="password"
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={signIn}
                style={{ backgroundColor: "#3f51b5" }}
              >
                SIGN IN
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                marginTop: "15px",
              }}
            >
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
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Login;
