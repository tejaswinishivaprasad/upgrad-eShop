

/* Function to handle user login which calls the backend REST API by passing the username 
and password. The Auth API returns a token back . This is being improvised to return roles associated 
with the user , So that I can check if the user has an adnpm npmin role associated 
*/
export const loginUser = async (email, password) => {
    try {
        // Make the login request
        const response = await fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ username: email, password: password }),
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || "Server error occurred. Please try again.");
        }

        const token = json.token;
        const userName = json.userName;
        const roles = json.roles;
        const userId = json.userId;

        console.log("token is ::"+json.token);

        return {
            userName: userName,
            accessToken: token,
            roles: roles,
            userId: userId,
            response: response,
        };

    } catch (error) {
        console.error("Login error:", error);
        return Promise.reject({
            reason: error.message || "Some error occurred. Please try again.",
            response: error,
        });
    }
};

/* Function to handle user registration. Inputs from Sign up page are sent to below REST endpoint
which registers the user into MONGO DB and return the user id back as a response with 200 status code
*/
export const registerUser = async (userData) => {
    try {
        // Make the signup request
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(userData),
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || "Server error occurred. Please try again.");
        }

        return {
            message: json.message,
            response: response,
        };

    } catch (error) {
        console.error("Signup error:", error);
        return Promise.reject({
            reason: error.message || "Some error occurred. Please try again.",
            response: error,
        });
    }
};
