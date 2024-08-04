import { useEffect, useState } from 'react';
import { successMsg, errorMsg } from '../broadcastMessages/BroadcastMessages';
import { updateProductDetails, userData, put_login, getProductForGivenID } from '../../common/services/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Typography, Grid, Button, Box, CircularProgress, Backdrop } from '@mui/material';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    "name": "",
    "category": "",
    "price": 0,
    "description": "",
    "manufacturer": "",
    "availableItems": "",
    "imageUrl": ""
  })

  

  const editProduct = async () => {
    console.log("Inside edit product method ...");
    if (data.name.trim().length === 0 || data.category.trim().length === 0 ||
      Number(data.price)===0 || data.description.trim().length === 0 ||
      data.manufacturer.trim().length === 0 ||
      data.imageUrl.trim().length === 0
    ) {
      errorMsg('Fill all the details');
      return;
    }

      const result = await updateProductDetails(id, data);
      console.log("result is ok ?"+result.ok);
      if (result.ok) {
        successMsg(`Product ${data.name} modified successfully !`);
        navigate('/products');
      } else {
        errorMsg(`Failed to modify product:${data.name}`);
      }
      setLoading(false);
    }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }
 
  
  
  const getProductData = async () => {
    console.log("fetching products from endpoint");
    try {
        const { product, ok } = await getProductForGivenID(id);
        
        if (ok) {
            // Handle successful response
            console.log("OK status for getProductData");
            console.log("Product details fetched successfully for EDIT");
            console.log("Products response:", product);
            
            // Update state with the fetched product details
            setData({
                ...product,
                name: product.name,
                category: product.category,
                price: product.price,
                manufacturer: product.manufacturer,
                description: product.description,
                availableItems: product.availableItems,
                imageUrl: product.imageUrl
            });
        } else {
            // Handle error response
            console.log("Response is not OK");
            errorMsg("Error occurred while loading the product details!");
        }
    } catch (e) {
        // Show error message if fetching product details fails
        errorMsg("Error occurred while loading the product details!");
    }
};
  useEffect(() => {
    getProductData();
  }, [id])

  useEffect(()=>{
    if (!userData()) {
      navigate('/login')
    } else {
    getProductData();
    }
  }, [id])
 
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
                Modify Product
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10px" }}>
              <TextField
                name='name'
                label="Name *"
                variant="outlined"
                fullWidth
                value={data.name}
                onChange={(e) => { handleChange(e) }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
            <TextField
                name='category'
                label='Category'
                variant="outlined"
                fullWidth
                value={data.category}
                onChange={(e) => { handleChange(e) }}               
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                name='manufacturer'
                label='Manufacturer *'
                variant='outlined'
                fullWidth
                value={data.manufacturer}
                onChange={(e) => { handleChange(e) }}
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
                onChange={(e) => { handleChange(e) }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                name='availableItems'
                label='Available Items *'
                variant='outlined'
                fullWidth
                value={data.availableItems}
                onChange={(e) => { handleChange(e) }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <TextField
                name='imageUrl'
                label='Image URL *'
                variant='outlined'
                fullWidth
                value={data.imageUrl}
                onChange={(e) => { handleChange(e) }}
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
                onChange={(e) => { handleChange(e) }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={editProduct}
                disabled={loading} // Disable button when loading
                style ={{backgroundColor: '#3f51b5'}}
              >
                Modify Product
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
}

export default EditProduct