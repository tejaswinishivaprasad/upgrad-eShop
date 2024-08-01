import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LocationOffOutlinedIcon from '@mui/icons-material/LocationOffOutlined';
import Typography from '@mui/material/Typography';

/* This page loads the Error Page whenever an error occurs during processing */

const ErrorPage = () => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: "8%" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <LocationOffOutlinedIcon
              sx={{
                color: '#ffffff',
                background: "#f50057",
                padding: '0.6em',
                borderRadius: '50%',
                fontSize: 60
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: 'inherit',
                fontSize: "25px",
                marginTop: 2,
                textAlign: 'center'
              }}
            >
              404 Not Found
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ErrorPage;
