import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { delete_login, getProducts, getCategories,get_login,userData,deleteProduct } from '../../common/services/apiService';
import { successMsg, errorMsg, confirmMsg } from '../broadcastMessages/BroadcastMessages';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, MenuItem, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Grid";
import {Delete, Edit} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import './Home.css';

const Home = () => {
  const userDetails = userData();
  console.log("userDetails role inside home :"+userDetails.roles);
  console.log("userDetails token inside home :"+userDetails.token);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State variables
  const [products, setProducts] = useState([]);
  const [defaultProductsOrder, setDefaultProductsOrder] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['ALL']);
  const [alignment, setAlignment] = useState('ALL');

  // Handle filter changes
  const handleChange = (event, newAlignment) => {
    if (newAlignment === 'ALL') {
      console.log("handling chnage for  ALL");
      getProductDetails();
    } else {
      console.log("handling chnage for not ALL");
      const productsFiltered = filteredProducts.filter((product) => product.category === newAlignment);
      setProducts(productsFiltered);
      setDefaultProductsOrder(productsFiltered);
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
          //  console.log("response::" + JSON.stringify(products));
      // Save token and role in local storage
      
      if (products && products.length > 0) {
        console.log("Product details fetched successfully");
        console.log("Products response:", JSON.stringify(products));
        
        // Update state with the fetched product details
        setProducts(products); 
        setFilteredProducts(products);
        setDefaultProductsOrder(products)
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
    console.log("came inside handleSort");
    const sortValue = e.target.value;
    console.log("sortvalue::"+sortValue);
    if (sortValue === 'def') {
      // Reset to original order
      setProducts(defaultProductsOrder);
    } else {
      // Sort based on selected criteria
      const sortedProducts = [...products];
      
      if (sortValue === 'asc') {
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setProducts(sortedProducts);
      } else if (sortValue === 'desc') {
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        setProducts(sortedProducts);
      } else if (sortValue === 'new') {        
        const reversedProducts = [...defaultProductsOrder].reverse();
        setProducts(reversedProducts);
      }
    }
  };

  // Fetch product categories from API

  const getCategoriesList = async () => {
    console.log("Fetching categories from endpoint");
    try {
        const categoriesFromDb = await getCategories(); // Fetch categories
        console.log("categories from db::"+categoriesFromDb);
        console.log("categories within localobj ::"+categories);
        if (categoriesFromDb && categoriesFromDb.length > 0) {
            console.log("Categories fetched successfully");
            const updatedCategories = ['ALL', ...categoriesFromDb];
            setCategories(updatedCategories);
            // Update state with the fetched categories
            setCategories(updatedCategories); // Assuming setCategories is the correct state updater
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
  const confirmDelete = (id,name) => {
    const callback = (result) => {
      if (result.isConfirmed) {
        deleteSelectedProduct(id,name);
      }
    };
    confirmMsg(callback);
  };

 
  const deleteSelectedProduct = async (id,name) => {
    console.log("Inside delete product method ...");
      const result = await deleteProduct(id);
      console.log("result is ok ?"+result.status);
      if (result.status === 204) {
        successMsg(`Product ${name} deleted successfully !`);
        navigate('/products');
      } else {
        errorMsg(`Failed to delete product:${name}`);
      }
    }

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
      const productsFiletered = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setProducts(productsFiletered);
    } else {
      getProductDetails();
    }
  }, [location]);

  let truncateText = (text) => {
		if(150 > text.length) {
			return text;
		}
		return text.substring(0, 100) + "...";
	};


  let checkAdminMode = (item) => {
    if (userDetails.roles === 'ADMIN') {
      return (
        <>
          <Grid item xs={2}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                aria-label="Modify"
                onClick={() => navigate(`/editproduct/${item.id}`)}
              >
                <Edit />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                aria-label="Delete"
                onClick={() => confirmDelete(item.id,item.name)}
              >
                <Delete />
              </IconButton>
            </div>
          </Grid>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div>
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

      <div className='card-parent'>
        {products.map((item) => (
          <Card className="card" key={item.id}>
            <CardMedia sx={{ height: "200px", display: "flex", justifyContent: "center" }}>
              <img
                src={item.imageUrl}
                alt={"Image of " + item.name}
                style={{
                  maxWidth: "200px",
                  width: "100%",
                  height: "200px",
                }}
              />
            </CardMedia>

            <CardContent className="card-content">
              <Grid container>
                <Grid item xs={9}>
                  <div style={{ display: 'flex', justifyContent: 'left' }}>
                    <Typography gutterBottom variant="h6" component="div" className="wrap_text" title={item.name}>
                      {item.name}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <Typography gutterBottom variant="h6" component="div" className="wrap_text" title={'\u20B9 ' + item.price}>
                      {'\u20B9 ' + item.price}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" sx={{ height: 50 }}>
                {truncateText(item.description)}
              </Typography>
            </CardContent>

            <CardActions className="card-actions">
              <Grid container>
                <Grid item xs={8}>
                  <div style={{ display: 'flex', justifyContent: 'left', marginTop: '2px', marginLeft: '5px', marginBottom: '2px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={()=>{navigate('/product/'+item.id)}}
                    >
                      BUY
                    </Button>
                  </div>
                </Grid>
                {checkAdminMode(item)}
              </Grid>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;