import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { successMsg, errorMsg } from '../broadcastMessages/BroadcastMessages';
import { login } from '../../common/services/apiService';
import { TextField, Box, Typography } from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
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

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const newErrors = {
      username: "",
      password: "",
    };

    if (!loginData.username.trim()) {
      newErrors.username = "Email is required";
    } else if (!emailRegex.test(loginData.username)) {
      newErrors.username = "Invalid email address";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(loginData.password)) {
      newErrors.password = "Password must be at least 6 characters and include uppercase, lowercase, a number, and a special character.";
    }

    setErrors(newErrors);

    return !newErrors.username && !newErrors.password;
  };

  const signIn = async () => {
    if (!validateFields()) {
        return;
    }

    // Attempt to login
    try {
        const { response, jsonResponse } = await login(loginData);

        if (response.ok) {
            // Handle successful response
            console.log("OK status for signin");
            successMsg("Login Successful !");
            navigate('/products');
        } else {
            // Handle error response
            console.log("Response is not OK");
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
    <Box sx={{flexGrow: 1}}>
				<Grid container spacing={1}>
					<Grid container item spacing={3}>
						<Grid item xs={4}/>
						<Grid item xs={4}>
							<div style={{display: 'flex', justifyContent: 'center', marginTop: "10%"}}>
          <LockOutlinedIcon
            style={{
              display: 'inline-block',
              borderRadius: '60px',
              padding: '0.6em 0.6em',
              color: '#ffffff',
              background: "#f50057",
            }}
          />
       </div>
       <div style={{display: 'flex', justifyContent: 'center'}}>
       <Typography
									variant="subtitle1"
									noWrap
									sx={{
										fontSize: "25px",
										color: 'inherit',
									}}
								>
									Sign in
								</Typography>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
        <TextField
          name='username'
          type="email"
          variant='outlined'
          label='Email Address*'
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          fullWidth
        />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
        <TextField 
          name='password'
          type="password"
          variant='outlined'
          label='Password*'
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
        />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: "30px"}}>
								<Button variant="contained"
										color="primary"
										fullWidth
										onClick={signIn} style ={{backgroundColor: '#3f51b5'}}
								>
									SIGN IN
								</Button>
							</div>
              <div style={{display: 'flex', justifyContent: 'left', marginTop: "15px"}}>
								<Link to="/signup">
									<Typography variant="body1">
										Don't have an account? Sign Up
									</Typography>
								</Link>
							</div>
						</Grid>
						<Grid item xs={4}/>
					</Grid>
				</Grid>
				<Backdrop
					sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
				>
					<CircularProgress color="inherit"/>
				</Backdrop>
			</Box>
      );
    };

export default Login;