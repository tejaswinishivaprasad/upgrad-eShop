/*This Component controls or defines the entire project or application layout 
*/

import Grid from '@mui/material/Grid';
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import ErrorPage from "../error/ErrorPage";
import Container from '@mui/material/Container';
import NavigationBar from "../navigation/NavigationBar";
import {Navigate, Route, Routes} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";

const PageLayout = () => {

	return (
		<Router>
			<NavigationBar />
			<Container maxWidth={false} sx={{marginTop: "90px",marginBottom: "25px" }}>
				<Grid container sx={{paddingTop: "25px"}}>
					<Routes>
						<Route
							path="/"
							element={
								<Navigate to="/home" />
							}
						/>
						<Route
							path="/home"
							element={
									<Home/>
							}
						/>
						<Route
							path="/login"
							element={
								<Login/>
							}
						/>
						<Route
							path="/signup"
							element={
								<SignUp/>
							}
						/>
						<Route
							path="*"
							element={
								<ErrorPage />
							}
						/>
					</Routes>
				</Grid>
			</Container>

		</Router>
	);
};

export default PageLayout;