import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { successMsg, errorMsg } from '../broadcastMessages/BroadcastMessages';
import { login } from '../../common/services/apiService';
import { TextField, Box, Typography } from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';

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

  // Function to handle sign-in logic
  const signIn = async () => {
    if (!validateFields()) {
      return;
    }

    // Attempt to login
    try {
      const res = await login(loginData);
      console.log("response::" + JSON.stringify(res));

            // Parse the JSON response
            const jsonResponse = await res.json();

      // Save token and role in local storage
      
      if (res.ok) {
        // Handle successful response
        console.log("OK status for signin");
        localStorage.setItem('token', jsonResponse.token);
        console.log("roles::"+jsonResponse.roles);
        localStorage.setItem('role', jsonResponse.roles);
        successMsg("Login Successful !");
        navigate('/products');
    } else {
        // Handle error response
        console.log("Response is not OK");
        console.log(jsonResponse.error);
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
    <Box>
      <form className='registerForm'>
        <span>
          <LockOutlinedIcon
            style={{
              display: 'inline-block',
              borderRadius: '60px',
              padding: '0.6em 0.6em',
              color: '#ffffff',
              background: "#f50057"
            }}
          />
        </span>
        <h3 style={{ marginTop: '20px', textAlign: 'center', fontSize: '25px', fontWeight: 400 }}>Sign In</h3>
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
          margin="normal"
        />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
        <TextField 
          name='password'
          type="password"
          variant='outlined'
          label='Password*'
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin="normal"
        />
        </div>
        <button className='loginBtn' type='button' onClick={signIn}>SIGN IN</button>
        <div style={{ display: 'flex', justifyContent: 'left', marginTop: "10px" }}>
          <NavLink to="/signup">
            <Typography variant="body1">
              Don't have an account? Sign Up
            </Typography>
          </NavLink>
        </div>
      </form>
    </Box>
  );
};

export default Login;
