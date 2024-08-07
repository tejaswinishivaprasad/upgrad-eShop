
# ************ IMPORTANT *********************
There are a few major code updates/fixes that were to be done to the backend project so as to integrate it with UI application.
The raw code given by upgrad had some critical code missing which was to be added .
NOTE : PLEASE MAKE SURE TO USE THE BELOW BACK END CODE TO RUN THIS REACT APPLICATION 
https://github.com/tejaswinishivaprasad/ecommerce-upgrad-master.git 

THE PROJECT SCREENS ARE PLACED UNDER ASSETS FOLDER WITHIN THIS REACT APPLICATION REPO
https://github.com/tejaswinishivaprasad/upgrad-eShop/blob/8b54bdd955c0f7c07d748432e60eb61877a98dbf/src/assets/images_screen/Project_screenshot.pdf

src/assets/images_screen/Project_screenshot.pdf


# upGrad-eShop Application 
Overview
This project is a fully functional online shopping portal built with React. It allows users to register, log in, browse a product catalog, and place orders. Administrators have additional capabilities to manage the product catalog and handle user orders. This README provides an overview of the application's features and API endpoints.

# Usage
Navigate to the application in your browser (usually http://localhost:3000).
Register a new account or log in with existing credentials.
Browse the product catalog and use the sorting and filtering features to find products.
Select items to buy, select address and proceed to checkout.

# Features
1. User Authentication
    Sign Up: Register a new user by calling the /api/signin endpoint. User details are stored in MongoDB.
    Login: Authenticate users with email and password via the /auth/login endpoint. Upon successful authentication, users are redirected to the product catalog page.


2. Product Catalog
 View Products: Display all available products fetched from the API.
Sorting: Sort products by:
Price (High to Low)
Price (Low to High)
Default order (as provided by the API)
Newest Added (most recent products on top)
Filtering: Filter products based on categories retrieved from /products/categories.

3. User Actions
Login : User must login using a registered email and password , or sign up by registering 
Place Order: Users can place an order by sending a POST request to /order. An address must be selected or added to complete the order.
Address Management
Select Address: Choose from existing addresses during the checkout process.
Add Address: Add a new address by sending a POST request to /addresses. The new address will be available in the address dropdown for future use.

4. Admin Actions
Add Product: Add a new product using the POST request to /products.
Edit Product: Update product details via GET request to /products/{id}.
Delete Product: Remove a product with a DELETE request to /products/{id}.

# API Endpoints
User Authentication
POST [/auth/signup] (http://localhost:8080/api/auth/signup) : Register a new user.
POST [/auth/login] (http://localhost:8080/api/auth/signin) : Authenticate a user and obtain a session token, userid , roles associated with user

Products
GET [/api/products] (http://localhost:8080/api/products) : Retrieve the list of all products.
GET [/products/categories](http://localhost:8080/api/products/categories): Fetch available product categories.
POST [/products](http://localhost:8080/api/products): Add a new product (Admin only).
GET [api/products/{id}] http://localhost:8080/api/products/{id}: Get details of a specific product.
DELETE [/products/{id}](http://localhost:8080/api/products/{id}): Delete a product (Admin only).

Addresses
GET [api/addresses](http://localhost:8080/api/addresses): Retrieves all the stored addresses
POST [/addresses](http://localhost:8080/api/addresses): Add a new address.

Orders
POST [/order](http://localhost:8080/api/orders): Place a new order. 


# Installation of react application
Clone the repository:
git clone <repository-url>

Navigate to the project directory:
cd <project-directory>

Install dependencies:
npm install

Start the development server:
npm start

# Installation of backend code and MONGO DB 
Please clone the spring boot backend project from below location and build it as maven build and run it as spring boot application 
The spring noot application will usually run on http://localhost:8080. If u install on any other port, please make sure to update the 
port in the react application as well where the ednpoints are registered .
https://github.com/tejaswinishivaprasad/ecommerce-upgrad-master.git 
To install Mongo DB into your local machine , you can go through below links 
https://www.geeksforgeeks.org/how-to-install-mongodb-on-windows/
https://www.geeksforgeeks.org/how-to-install-mongodb-on-macos/












