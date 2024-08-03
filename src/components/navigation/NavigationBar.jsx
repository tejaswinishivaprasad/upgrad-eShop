import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { userData } from '../../common/services/apiService';
import SearchBar from '../searchBar/SearchBar';
import './NavigationBar.css'

const NavigationBar = () => {
  const [islogin, setIslogin] = useState(false)
  const location = useLocation();
  const navigator = useNavigate()
  const logout = () => {
    localStorage.clear();
    navigator('/login')
  }

  const [timeOut,setTimout] = useState(false)
  const debounce = (e)=>{
    if(timeOut){
      clearTimeout(timeOut)
  }
       setTimout(setTimeout(function(){
        if(e.target.value.trim().length>0){
          navigator('/products/'+e.target.value)
        }else{
          navigator('/products')
        }
    },300))
  }
  useEffect(() => {
      if (userData()) {
      setIslogin(true);
      console.log(userData().token);
      console.log(userData().role);

    }else{
      setIslogin(false);
    }
  }, [location])

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#3f51b5' }}>
      <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <IconButton  sx={{ mr: 2 }}
            color="inherit"
            size="large"
            edge="start"            
            aria-label="open drawer"          
          >
            < ShoppingCartIcon />
          </IconButton>
          <Typography sx={{ display: { xs: 'none', sm: 'block', width: '35%' } }}
            variant="h6"
            noWrap
            component="div"            
          >
            upGrad E-Shop
          </Typography>


          
          {islogin && <SearchBar/>}
          <div className='headerLinks'>
            {islogin &&
              <>
                <NavLink to='products' style={{ textDecorationLine:'underline',margin: 'auto 10px' }} >Home</NavLink>
               {userData()?.role==='ADMIN' && <NavLink to='addproduct' style={{ textDecorationLine:'underline',margin: 'auto 10px' }} >Add Product</NavLink>}
                <Button className='logout' variant='container' color='secondary'onClick={logout}>Logout</Button>
              </>
            }
            {!islogin &&
              <>
                <NavLink  style={{ margin: 'auto 10px' ,textDecorationLine:'underline'}} to='login'>Login</NavLink>
                <NavLink  style={{textDecorationLine:'underline',marginLeft:'20px'}} to='signup'> Signup</NavLink>
              </>
            }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavigationBar