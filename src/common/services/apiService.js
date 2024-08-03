
// let headersWithToken = { 
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + userData().token,
// };
let headers = { 'Content-Type': 'application/json' };
const baseUrl = 'http://localhost:8080/api';

const login = async (data) => {
    try{
    const response = await fetch(baseUrl+"/auth/signin", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });
    return response;
} catch (error) {
    // Handle and log errors (e.g., network issues or response parsing issues)
    console.error("Sign in error:", error);
    throw error; // Re-throw the error so it can be handled by the calling code
}
};

const signup = async (data) => {
    console.log("signup json::" + JSON.stringify(data));
    
    try {
        const response = await fetch(baseUrl + "/auth/signup", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        // Handle and log errors (e.g., network issues or response parsing issues)
        console.error("Signup error:", error);
        throw error; // Re-throw the error so it can be handled by the calling code
    }
};

const getProducts = async () => {
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };
    try {
        const response = await fetch(baseUrl + "/products", {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching product details');
        }

        // Return the JSON response
        return await response.json();
    } catch (error) {
        console.error("Error occurred while fetching product details:", error);
        throw error; // Re-throw the error to be handled by the calling code
    }
};


const getCategories = async () => {
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };
    try {
        const response = await fetch(baseUrl + "/products/categories", {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching categories');
        }

        // Return the JSON response
        return await response.json();
    } catch (error) {
        console.error("Error occurred while fetching product categories:", error);
        throw error; // Re-throw the error to be handled by the calling code
    }
};


const get_data = async (endpoint, params) => {
    let headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };
    const url = new URL(baseUrl + endpoint);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const response = await fetch(url, { headers: headers });
    return response.json();
};


const post_login = async (endpoint, data) => {
    let headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };

    const response = await fetch(baseUrl + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });
    return response.json();
};


const put_login = async (endpoint, data) => {
    let headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };

    const response = await fetch(baseUrl + endpoint, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
    });
    return response.json();
};

const delete_login = async (endpoint) => {
    let headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };

    const response = await fetch(baseUrl + endpoint, {
        method: 'DELETE',
        headers: headers,
    });
    return response.json();
};

const get_login =async (endpoint) => {
    var hdrs = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+userData().token
};
const response = await fetch(baseUrl + endpoint, {
    method: 'GET',
    headers: headers,
});
return response.json();
};

const login_post_data = async (endpoint, data) => {
    let credentials = btoa(data.username + ':' + data.password);

    const response = await fetch(baseUrl + endpoint, {
        method: 'POST',
        headers: { Authorization: `Basic ${credentials}` },
    });
    return response.json();
};

const userData = () => {
    if (localStorage.getItem('token')) {
        console.log("role inside userdata::"+localStorage.getItem('roles'));
        console.log("token inside userdata::"+localStorage.getItem('token'));
        return {
            token: localStorage.getItem('token'),
            role: localStorage.getItem('roles'),
            
        };
    } else {
        return null;
    }
};

export { userData, login, signup, get_data, getProducts, getCategories,get_login,post_login, put_login, delete_login };
