import { useEffect, useState } from 'react';
import { successMsg, errorMsg } from '../broadcastMessages/BroadcastMessages';
import { userData, addProductToDb , getCategories} from '../../common/services/apiService';
import { TextField, Typography, Grid, Button, Box, CircularProgress, Backdrop } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from '../creatableSelect/CreatableSelect';

const AddProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    manufacturer: "",
    availableItems: "",
    imageUrl: ""
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch categories from the API
  const getCategoriesList = async () => {
    console.log("Fetching categories from endpoint");
    try {
        const categories = await getCategories(); // Fetch categories
        console.log("categories::"+categories);
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
        console.error("Error occurred while loading the product category details:", e);
        errorMsg("Error occurred while loading the product category details!");
    }
};


  useEffect(() => {
    getCategoriesList();
  }, []);

  // Function to handle field changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCategoryChange = (newValue) => {
    setData({ ...data, category: newValue });
  };

  // Validation function to check individual fields
  const validate = () => {
    let isValid = true;
    let errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!data.category.trim()) {
      errors.category = "Category is required";
      isValid = false;
    }
    if (!data.price || isNaN(data.price) || Number(data.price) <= 0) {
      errors.price = "Valid price is required";
      isValid = false;
    }
    if (!data.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }
    if (!data.manufacturer.trim()) {
      errors.manufacturer = "Manufacturer is required";
      isValid = false;
    }
    if (!data.availableItems.trim() || isNaN(data.availableItems) || Number(data.availableItems) <= 0) {
      errors.availableItems = "Available items is required";
      isValid = false;
    }
    if (!data.imageUrl.trim()) {
      errors.imageUrl = "Image URL is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Function to handle product addition
  const addProduct = async () => {
    if (validate()) {
      setLoading(true);

      const result = await addProductToDb(data);

      if (result.success) {
        successMsg(`Product ${data.name} added successfully !`);
        navigate('/products');
      } else {
        errorMsg(`Failed to add product:${data.name}`);
      }
      setLoading(false);
    }
  };

  
  // Check if user is logged in, redirect if not
  useEffect(() => {
    if (!userData()) {
      navigate('/login');
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={2}>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant="subtitle1"
                noWrap
                sx={{ fontSize: "25px", color: 'inherit' }}
              >
                Add Product
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10px" }}>
              <TextField
                name='name'
                label="Name *"
                variant="outlined"
                fullWidth
                value={data.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
            <CreatableSelect
                name='category'
                label='Category'
                fullWidth
                options={categories}
                value={data.category}
                onChange={handleCategoryChange}
                error={!!errors.category}
                helperText={errors.category}                
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                name='manufacturer'
                label='Manufacturer *'
                variant='outlined'
                fullWidth
                value={data.manufacturer}
                onChange={handleChange}
                error={!!errors.manufacturer}
                helperText={errors.manufacturer}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                name='price'
                type='number'
                label='Price *'
                variant='outlined'
                fullWidth
                value={data.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                name='availableItems'
                label='Available Items *'
                variant='outlined'
                fullWidth
                value={data.availableItems}
                onChange={handleChange}
                error={!!errors.availableItems}
                helperText={errors.availableItems}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                name='imageUrl'
                label='Image URL *'
                variant='outlined'
                fullWidth
                value={data.imageUrl}
                onChange={handleChange}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                name='description'
                label='Description *'
                variant='outlined'
                fullWidth
                multiline
                rows={1}
                value={data.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={addProduct}
                disabled={loading} // Disable button when loading
                style ={{backgroundColor: '#3f51b5'}}
              >
                Save Product
              </Button>
            </div>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default AddProduct;
