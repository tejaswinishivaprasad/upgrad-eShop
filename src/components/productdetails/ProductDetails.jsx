import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get_login, userData } from '../../common/services/apiService';
import Chip from '@mui/material/Chip';
import './ProductDetails.css'
import { errorMsg } from '../broadcastMessages/BroadcastMessages';
import { Button, TextField } from '@mui/material';
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1)
  const [details, setDetails] = useState(null)
  const getProductDetails = async () => {
    await get_login('/products/' + id)
      .then((res) => {
        let a = res.data;
        setDetails(a)
      }).catch((e) => {
        errorMsg('something  went wrong')
      })
  }
  const placeOrder = () => {
    if (quantity && quantity > 0) {
      navigate('/addaddress/' + id + '/' + quantity)
    } else {
      errorMsg('select Quantity')
    }
  }
  useEffect(() => {
    if (!userData()) {
      navigate('/login')
    } else {
    getProductDetails()
    }
  }, [id])
  return (
    <div className='detailsParentDiv'>
      {details && <div className='detailsDiv'>
        <div className='prodImage'>
          <img src={details.imageUrl} alt={details.name} srcSet="" />
        </div>
        <div className='proddetails'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ marginRight: '20px' }}>{details.name}</h2>
            <Chip style={{backgroundColor: "#3f51b5"}} label={'Available items :' + details.availableItems} color="primary" />
          </div>
          <p style={{ marginTop: '0' }}>category : <b>{details.category}</b></p>
          <p>{details.description}</p>
          <h3 style={{ color: 'red' }}>₹ {details.price}</h3>
          <TextField type="number" name='quantity' variant='outlined' value={quantity} label='Quantity' onChange={(e) => { setQuantity(e.target.value) }} /><br />
          <Button style={{ marginTop: '10px', backgroundColor: "#3f51b5"}} size="medium" variant='contained' onClick={placeOrder}>PLACE ORDER</Button>
          
        </div>
      </div>}
    </div>
  )
}

export default ProductDetails