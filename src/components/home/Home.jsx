/*
This component is specific to the Home page of the upgrad eshop
*/

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


const Home = () => {


	return (
		<Box sx={{flexGrow: 1}}>
			<Grid container spacing={1}>
				<Grid container item spacing={3}>
					<Grid item xs={12}>
						<div style={{display: 'flex', justifyContent: 'center'}}>
						</div>
					</Grid>
					<Grid item xs={12}>
						<div style={{display: 'flex', justifyContent: 'left'}}>
						</div>
					</Grid>

				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;