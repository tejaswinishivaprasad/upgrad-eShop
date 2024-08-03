import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { delete_login, getProducts, getCategories,get_login,userData } from '../../common/services/apiService';
import { successMsg, errorMsg, confirmMsg } from '../broadcastMessages/BroadcastMessages';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, MenuItem, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Home.css';

const Home = () => {
  const userDetails = userData();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State variables
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [categories, setCategories] = useState(['ALL']);
  const [alignment, setAlignment] = useState('ALL');

  // Handle filter changes
  const handleChange = (event, newAlignment) => {
    if (newAlignment === 'ALL') {
      getProductDetails();
    } else {
      const filteredProducts = products1.filter((product) => product.category === newAlignment);
      setProducts(filteredProducts);
    }
    setAlignment(newAlignment);
  };

  
  const getProductDetails = async () => {
   console.log("fetching products from endpoint");
    // Fetch products from mongo db
    try {
      //const res = await getProducts();

            // Parse the JSON response
            const products = await getProducts();
            console.log("response::" + JSON.stringify(products));
      // Save token and role in local storage
      
      if (products && products.length > 0) {
        console.log("Product details fetched successfully");
        console.log("Products response:", JSON.stringify(products));
        
        // Update state with the fetched product details
        setProducts(products); 
        setProducts1(products);
    }  else {
        // Handle error response
        console.log("Error occurred while loading the product details!");
        errorMsg("Error occurred while loading the product details!");
    }
    } catch (e) {
      // Show error message if fetching product details fails
      errorMsg("Error occurred while loading the product details!");
    }
  };


  // Handle sorting of products
  const handleSort = (e) => {
    const sortedProducts = [...products];
    const sortValue = e.target.value;

    if (sortValue === 'asc') {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortValue === 'desc') {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortValue === 'new') {
      sortedProducts.reverse();
    }

    setProducts(sortedProducts);
  };

  // Fetch product categories from API

  const getCategoriesList = async () => {
    console.log("Fetching categories from endpoint");
    try {
        const categories = await getCategories(); // Fetch categories
        console.log("categories::"+categories);
        if (categories && categories.length > 0) {
            console.log("Categories fetched successfully");
            console.log("Categories response:", JSON.stringify(categories));
            
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


  // Confirm and delete product
  const confirmDelete = (id) => {
    const callback = (result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    };
    confirmMsg(callback);
  };

  // Delete product from API
  const deleteProduct = async (id) => {
    try {
      await delete_login(`/products/${id}`);
      getProducts(); // Refresh product list
      successMsg('Product deleted successfully');
    } catch (error) {
      errorMsg('Something went wrong');
    }
  };

  // Effect to redirect if user is not logged in
  useEffect(() => {
    if (!userDetails) {
      navigate('/login');
    } else {
      getCategoriesList();
    }
  }, []);

  // Effect to filter products based on URL path
  useEffect(() => {
    if (location.pathname.split('/').length > 2) {
      const query = location.pathname.split('/')[2].toLowerCase();
      const filteredProducts = products1.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setProducts(filteredProducts);
    } else {
      getProductDetails();
    }
  }, [location]);


  return (
    <div>
      {/* Filter by category */}
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        style={{ marginTop: '30px', width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        {categories.map((category, index) => (
          <ToggleButton key={index} value={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Sorting options */}
      <div style={{ marginLeft: '50px' }}>
        <p style={{ marginBottom: '20px' }}>Sort by:</p>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="def"
          onChange={handleSort}
          style={{ width: '200px', textAlign: 'start' }}
        >
          <MenuItem value="def">Default</MenuItem>
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
          <MenuItem value="new">Newest</MenuItem>
        </TextField>
      </div>

      {/* Products display */}
      <div className='card-parent'>
        {products.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345, padding: '10px' }}>
            <CardMedia
              component="img"
              alt={item.name}
              height="250"
              image={item.imageUrl}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.name}</span>
                <span>₹ {item.price}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}
              </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                style={{ backgroundColor: "#3f51b5" }}
                size="small"
                variant='contained'
                onClick={() => navigate(`/product/${item.id}`)}
              >
                Buy
              </Button>
              {userDetails?.role === 'ADMIN' && (
                <div>
                  <Button
                    style={{ backgroundColor: "#3f51b5" }}
                    size="small"
                    onClick={() => navigate(`/editproduct/${item.id}`)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    style={{ backgroundColor: "#3f51b5" }}
                    size="small"
                    onClick={() => confirmDelete(item.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
