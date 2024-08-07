/*
ProductForm component provides UI form with validation to add new product details and api calls to backend to fetch the product information
 required to Edit and save the product into MONGO
*/
import React, { useEffect, useState } from "react";
import { successMsg, errorMsg } from "../broadcastMessages/BroadcastMessages";
import {
  userData,
  addProductToDb,
  updateProductDetails,
  getCategories,
  getProductForGivenID,
} from "../../common/services/apiService";
import {
  TextField,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "../creatableSelect/CreatableSelect";

const ProductForm = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    manufacturer: "",
    availableItems: "",
    imageUrl: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch categories from the API
  const getCategoriesList = async () => {
    console.log("Fetching categories from endpoint");
    try {
      const categories = await getCategories(); // Fetch categories
      console.log("categories::" + categories);
      if (categories && categories.length > 0) {
        console.log("Categories fetched successfully");
        //console.log("Categories response:", JSON.stringify(categories));

        // Update state with the fetched categories
        setCategories(categories); // Assuming setCategories is the correct state updater
      } else {
        console.log("No categories found or empty response");
        // Handle empty response if needed
      }
    } catch (e) {
      console.error(
        "Error occurred while loading the product category details:",
        e
      );
      errorMsg("Error occurred while loading the product category details!");
    }
  };

  //Get product details for the selected product using its ID
  const getProductData = async () => {
    try {
      const { product, ok } = await getProductForGivenID(id);
      if (ok) {
        setData(product);
      } else {
        errorMsg("Error occurred while loading the product details!");
      }
    } catch (e) {
      errorMsg("Error occurred while loading the product details!");
    }
  };

  // Load the categories and product data to deal with ADD/Edit
  useEffect(() => {
    getCategoriesList();
    if (mode === "edit") {
      getProductData();
    }
  }, [id, mode]);

  //If user is not logged in , do not allow them into further pages , redirect to login
  useEffect(() => {
    if (!userData()) {
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCategoryChange = (newValue) => {
    setData({ ...data, category: newValue });
  };

  //Validate Edit or Add product form
  const validate = () => {
    let errors = {};
    let hasEmptyFields = false;
    let isValid = true;

    // Required fields check
    const requiredFields = [
      "name",
      "category",
      "price",
      "description",
      "manufacturer",
      "availableItems",
      "imageUrl",
    ];

    requiredFields.forEach((field) => {
      const value = data[field];

      if (!value || (typeof value === "string" && !value.trim())) {
        hasEmptyFields = true;
      }
    });

    // If there are empty fields, show a collective error message
    if (hasEmptyFields) {
      errorMsg("Please fill all the required fields");
      isValid = false;
    } else {
      // Detailed validation for numeric fields
      if (isNaN(data.price) || Number(data.price) <= 0) {
        errors.price = "Valid price is required";
        isValid = false;
      }
      if (isNaN(data.availableItems) || Number(data.availableItems) <= 0) {
        errors.availableItems = "Available items is required";
        isValid = false;
      }
    }

    setErrors(errors);
    return isValid;
  };

  //On saving the prodtc , call API to update or create product into DB
  const handleSave = async () => {
    if (validate()) {
      setLoading(true);
      try {
        let result;
        console.log("mode::" + mode);
        if (mode === "add") {
          result = await addProductToDb(data);
        } else {
          result = await updateProductDetails(id, data);
        }
        if (result.success || result.ok) {
          successMsg(
            `Product ${data.name} ${
              mode === "add" ? "added" : "modified"
            } successfully!`
          );
          navigate("/products");
        } else {
          errorMsg(
            `Failed to ${mode === "add" ? "add" : "modify"} product: ${
              data.name
            }`
          );
        }
      } catch (error) {
        errorMsg(`Error: ${error.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={2}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                variant="subtitle1"
                noWrap
                sx={{ fontSize: "25px", color: "inherit" }}
              >
                {mode === "add" ? "Add" : "Modify"} Product
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <TextField
                name="name"
                label="Name *"
                variant="outlined"
                fullWidth
                value={data.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <CreatableSelect
                name="category"
                label="Category *"
                options={categories}
                value={data.category}
                onChange={handleCategoryChange}
                error={!!errors.category}
                helperText={errors.category}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                name="manufacturer"
                label="Manufacturer *"
                variant="outlined"
                fullWidth
                value={data.manufacturer}
                onChange={handleChange}
                error={!!errors.manufacturer}
                helperText={errors.manufacturer}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                name="price"
                type="number"
                label="Price *"
                variant="outlined"
                fullWidth
                value={data.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                name="availableItems"
                label="Available Items *"
                variant="outlined"
                fullWidth
                value={data.availableItems}
                onChange={handleChange}
                error={!!errors.availableItems}
                helperText={errors.availableItems}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                name="imageUrl"
                label="Image URL *"
                variant="outlined"
                fullWidth
                value={data.imageUrl}
                onChange={handleChange}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <TextField
                name="description"
                label="Description *"
                variant="outlined"
                fullWidth
                multiline
                rows={1}
                value={data.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSave}
                disabled={loading}
                style={{ backgroundColor: "#3f51b5" }}
              >
                {mode === "add" ? "Save" : "Modify"} Product
              </Button>
            </div>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ProductForm;
