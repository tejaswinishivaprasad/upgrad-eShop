import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { successMsg, errorMsg } from '../broadcastMessages/BroadcastMessages';
import { signup } from '../../common/services/apiService';
import { TextField, Box, Typography } from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [data, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles: "user",
    contactNumber: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: ""
  });

  // Validation function
  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^[0-9]+$/;

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: ""
    };

    // Validate each field and set errors
    Object.keys(data).forEach((key) => {
      const value = data[key];
      switch (key) {
        case 'firstName':
        case 'lastName':
          const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          if (!value.trim()) {
            newErrors[key] = `${label} is required`;
          } else if (!nameRegex.test(value)) {
            newErrors[key] = `${label} should not contain numbers`;
          }
          break;
        case 'email':
          if (!value.trim()) {
            newErrors[key] = "Email is required";
          } else if (!emailRegex.test(value)) {
            newErrors[key] = "Invalid email address";
          }
          break;
        case 'password':
          if (!value.trim()) {
            newErrors[key] = "Password is required";
          } else if (!passwordRegex.test(value)) {
            newErrors[key] = "Password must be at least 6 characters and include uppercase, lowercase, a number, and a special character";
          }
          break;
        case 'confirmPassword':
          if (!value.trim()) {
            newErrors[key] = "Confirm Password is required";
          } else if (value !== data.password) {
            newErrors[key] = "Confirm Password does not match Password";
          }
          break;
        case 'contactNumber':
          if (!value.trim()) {
            newErrors[key] = "Contact Number is required";
          } else if (!phoneRegex.test(value)) {
            newErrors[key] = "Contact Number should not contain alphabets";
          }
          break;
        default:
          break;
      }
    });

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  // Function to handle sign-up logic
  const signUp = async () => {
    if (!validateFields()) {
        return;
    }

    try {
        const res = await signup(data);

        // Parse the JSON response
        const jsonResponse = await res.json();

        if (res.ok) {
            // Handle successful response
            console.log("OK status for signup");
            console.log(jsonResponse.message);
            successMsg(jsonResponse.message);
            navigate('/login');
        } else {
            // Handle error response
            console.log("Response is not OK");
            console.log(jsonResponse.message);
            errorMsg(jsonResponse.message);
        }
        
    } catch (e) {
        // Handle errors (e.g., network issues)
        console.error("Error occurred during signup:", e);
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
        <Typography variant="h5" sx={{ marginTop: '20px', textAlign: 'center', fontWeight: 400 }}>
          Sign Up
        </Typography>
        <TextField
          name='firstName'
          label="First Name*"
          variant="outlined"
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          fullWidth
        />
        <TextField
          type="text"
          name='lastName'
          variant='outlined'
          label='Last Name*'
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
        />
        <TextField
          type="email"
          name='email'
          variant='outlined'
          label='Email Address*'
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          type="password"
          name='password'
          variant='outlined'
          label='Password*'
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
        />
        <TextField
          type="password"
          name='confirmPassword'
          variant='outlined'
          label='Confirm Password*'
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
        />
        <TextField
          type="text"
          name='contactNumber'
          variant='outlined'
          label='Contact Number*'
          onChange={handleChange}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber}
          fullWidth
        />
        <button type='button' onClick={signUp} className='loginBtn'>SIGN UP</button>
        <div style={{ display: 'flex', justifyContent: 'right', marginTop: "30px" }}>
          <NavLink to="/login">
            <Typography variant="body1">
              Already have an account? Sign in
            </Typography>
          </NavLink>
        </div>
      </form>
    </Box>
  );
};



export default Signup;
