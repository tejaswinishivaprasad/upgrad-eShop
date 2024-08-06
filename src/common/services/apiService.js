/* This is a common service layer used by all components to call spring boot rest endpoints 
which acts as the backend of this application*/

let headers = { "Content-Type": "application/json" };
const baseUrl = "http://localhost:8080/api";

const userData = () => {
  if (localStorage.getItem("token")) {
    return {
      token: localStorage.getItem("token"),
      roles: localStorage.getItem("roles"),
      userId: localStorage.getItem("userId"),
    };
  } else {
    return null;
  }
};
const login = async (data) => {
  try {
    userData();
    const response = await fetch(baseUrl + "/auth/signin", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();

    if (response.ok) {
      // Handle successful response and store token and role in local storage
      localStorage.setItem("token", jsonResponse.token);
      localStorage.setItem("roles", jsonResponse.roles);
      localStorage.setItem("userId", jsonResponse.userId);
    } else {
      // Handle error response (no local storage update)
      console.error("Sign in error:", jsonResponse.error);
    }
    // Return the response (with or without local storage update)
    return { response, jsonResponse };
  } catch (error) {
    // Handle and log errors (e.g., network issues or response parsing issues)
    console.error("Error occurred while signing in:", error);
    throw error; // Re-throw the error so it can be handled by the calling code
  }
};

const signup = async (data) => {
  try {
    const response = await fetch(baseUrl + "/auth/signup", {
      method: "POST",
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
    "Content-Type": "application/json",
    Authorization: "Bearer " + userData().token,
  };
  try {
    const response = await fetch(baseUrl + "/products", {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching product details");
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
    "Content-Type": "application/json",
    Authorization: "Bearer " + userData().token,
  };
  try {
    const response = await fetch(baseUrl + "/addresses", {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching address details");
    }
    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error occurred while fetching address details:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

const getProductForGivenID = async (id) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userData().token,
    };
    console.log("id::" + id);
    const response = await fetch(baseUrl + "/products/" + id, {
      method: "GET",
      headers: headers,
    });
    // Parse the JSON response
    const product = await response.json();
    return { product, ok: response.ok };
  } catch (error) {
    console.error("Error occurred while fetching product details:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

const updateProductDetails = async (id, data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userData().token,
    };
    console.log("id::" + id);
    const response = await fetch(baseUrl + "/products/" + id, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error occurred while updating product details:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

const getCategories = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userData().token,
    };
    const response = await fetch(baseUrl + "/products/categories", {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching categories");
    }
    // Return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error occurred while fetching product categories:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

const addProductToDb = async (data) => {
  console.log("adding below to DB::" + JSON.stringify(data));
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userData().token,
    };
    const response = await fetch(baseUrl + "/products", {
      method: "POST",
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
    console.error("Error occurred while adding products into DB:", error);
    return { success: false, error: error.message };
  }
};

const addAddressToDb = async (data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userData().token,
    };
    console.log("address JSON::" + JSON.stringify(data));
    const response = await fetch(baseUrl + "/addresses", {
      method: "POST",
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
    console.error(
      "Error occurred while adding address details into DB:",
      error
    );
    return { success: false, error: error.message };
  }
};

const createOrder = async (json) => {
  console.log("orders json ::" + JSON.stringify(json));
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userData().token,
    };
    const response = await fetch(baseUrl + "/orders", {
      method: "POST",
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
    console.error("Error occurred while placing an order", error);
    return { success: false, error: error.message };
  }
};

const deleteProduct = async (id) => {
  try {
    console.log("id::" + id);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userData().token,
    };
    const response = await fetch(baseUrl + "/products/" + id, {
      method: "DELETE",
      headers: headers,
    });
    return response;
  } catch (error) {
    console.error("Error occurred while deleting product details:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

export {
  userData,
  login,
  signup,
  addAddressToDb,
  getProducts,
  getAddresses,
  getCategories,
  addProductToDb,
  createOrder,
  getProductForGivenID,
  updateProductDetails,
  deleteProduct,
};
