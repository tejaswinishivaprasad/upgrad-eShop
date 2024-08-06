
// let headersWithToken = { 
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + userData().token,
// };
let headers = { 'Content-Type': 'application/json' };
const baseUrl = 'http://localhost:8080/api';

const login = async (data) => {
    try {
        const response = await fetch(baseUrl + "/auth/signin", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        const jsonResponse = await response.json();

        if (response.ok) {
            // Handle successful response and store token and role in local storage
            console.log("userID within localstorage before adding::"+jsonResponse.userId);
            localStorage.setItem('token', jsonResponse.token);
            localStorage.setItem('roles', jsonResponse.roles);
            localStorage.setItem('userId',jsonResponse.userId);
        } else {
            // Handle error response (no local storage update)
            console.error("Sign in error:", jsonResponse.error);
        }

        // Return the response (with or without local storage update)
        return { response, jsonResponse };
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

const getAddresses = async () => {
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };
    try {
        const response = await fetch(baseUrl + "/addresses", {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            // Handle HTTP errors
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching address details');
        }

        // Return the JSON response
        return await response.json();
    } catch (error) {
        console.error("Error occurred while fetching address details:", error);
        throw error; // Re-throw the error to be handled by the calling code
    }
};

const getProductForGivenID = async (id) => {
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };
    try {
        console.log("id::" + id);
        const response = await fetch(baseUrl + "/products/" + id, {
            method: 'GET',
            headers: headers,
        });      
        // Parse the JSON response
        const product = await response.json();
        console.log("Returning product object here:", product);
        return { product, ok: response.ok };
    } catch (error) {
        console.error("Error occurred while fetching product details:", error);
        throw error; // Re-throw the error to be handled by the calling code
    }
};


const updateProductDetails = async (id,data) => {
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };
    try {
        console.log("id::" + id);
        const response = await fetch(baseUrl + "/products/" + id, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data),
        });      
        // Parse the JSON response
        
        return response;
    } catch (error) {
        console.error("Error occurred while updating product details:", error);
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


const addProductToDb = async (data) => {
    console.log("adding below to DB::"+JSON.stringify(data));
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };
    try {
        const response = await fetch(baseUrl + "/products", {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        });
    
        if (response.status === 201) {
          // If status is 201 Created, return the response text
          const responseText = await response.text();
          return { success: true, data: responseText };
        } else {
          // For other status codes, throw an error
          const errorText = await response.text();
          return { success: false, error: errorText };
        }
      } catch (error) {
        console.error('API request error:', error);
        return { success: false, error: error.message };
      }
    };


    const addAddressToDb = async (data) => {
        const headers = { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData().token,
        };
        try {
            console.log("address JSON::"+JSON.stringify(data));
            const response = await fetch(baseUrl + "/addresses", {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(data),
            });
        
            if (response.status === 201) {
              // If status is 201 Created, return the response text
              const responseText = await response.text();
              return { success: true, data: responseText };
            } else {
              // For other status codes, throw an error
              const errorText = await response.text();
              return { success: false, error: errorText };
            }
          } catch (error) {
            console.error('Could not add address to DB:', error);
            return { success: false, error: error.message };
          }
        };
    
        const createOrder = async (json) => {
            console.log("orders json ::"+JSON.stringify(json));
            const headers = { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData().token,
            };
            try {
                
                const response = await fetch(baseUrl + "/orders", {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify(json),
                });
            
                if (response.status === 201) {
                  // If status is 201 Created, return the response text
                  const responseText = await response.text();
                  return { success: true, data: responseText };
                } else {
                  // For other status codes, throw an error
                  const errorText = await response.text();
                  return { success: false, error: errorText };
                }
              } catch (error) {
                console.error('Could not place order', error);
                return { success: false, error: error.message };
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

const deleteProduct = async (id) => {
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData().token,
    };
    try {
        console.log("id::" + id);
        const response = await fetch(baseUrl + "/products/" + id, {
            method: 'DELETE',
            headers: headers,
        });      
        // Parse the JSON response
        
        return response;
    } catch (error) {
        console.error("Error occurred while deleting product details:", error);
        throw error; // Re-throw the error to be handled by the calling code
    }
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

const getProductDetailToBuy = async (id) =>
{

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
        console.log("useriod within userdata::"+localStorage.getItem('userId'));
        return {
            token: localStorage.getItem('token'),
            roles: localStorage.getItem('roles'),
            userId : localStorage.getItem('userId'),
            
        };
    } else {
        return null;
    }
};

export { userData, login, signup, get_data,addAddressToDb, getProducts, getAddresses,getCategories,addProductToDb,get_login,createOrder,getProductForGivenID,updateProductDetails,deleteProduct,getProductDetailToBuy,post_login, put_login, delete_login };
