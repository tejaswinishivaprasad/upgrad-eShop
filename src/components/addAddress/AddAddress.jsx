import { useEffect, useState } from 'react'
import './AddAddress.css'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { successMsg, errorMsg } from '../broadcastMessages/BroadcastMessages';
import { get_login, userData, post_login } from '../../common/services/apiService';
import { Button, MenuItem, TextField } from '@mui/material';
import jwt_decode from "jwt-decode";
const steps = [
    'Item',
    'Select address',
    'Confirm order',
];
const AddAddress = () => {
    const { id, qty } = useParams();
    const navigate = useNavigate();
    const [addressList, setAddressList] = useState([])
    const [activeKey, setActiveKey] = useState(1);
    const [address, setAddress] = useState('');
    const [finalstep, setFinalStep] = useState(false);
    const [data, setData] = useState({
        "name": "",
        "contactNumber": "",
        "street": "",
        "city": "",
        "state": "",
        "landmark": "",
        "zipcode": ""
    })

    const addAddress = async () => {
        if (data.name.trim().length === 0 || data.contactNumber.trim().length === 0 ||
            data.street.trim().length === 0 || data.city.trim().length === 0 ||
            data.state.trim().length === 0 ||
            data.zipcode.trim().length === 0
        ) {
            errorMsg('Fill all the details');
            return;
        }
        let decoded = jwt_decode(userData().token);
        data.user=decoded.sub;
        await post_login('/addresses', data)
            .then((res) => {
                successMsg('address added successfully');
                setData({ ...data, name: '', contactNumber: '', city: '', state: '', street: '', landmark: '', zipcode: '' })
            }).catch((e) => {
                errorMsg('something went wrong')
            })
    }
    const placeOrder = async () => {
        let json = {
            "quantity": 2,
            "user": address.user,
            "product": id,
            "address": address.id
        }

        await post_login('/orders', json)
            .then((res) => {
                successMsg('Your order is confirmed.');
                navigate('/products')
            }).catch((e) => {
                errorMsg('something went wrong')
            })
    }
    const goToOrder = () => {
          navigate('/product/' + id)
      }
    const getAddresList = async () => {
        await get_login('/addresses')
            .then((res) => {
                let a = res.data
                a = a.map((e) => {
                    let obj = {
                        state: e.state,
                        city: e.city,
                        street: e.street,
                        landmark: e.landmark,
                        zipcode: e.zipcode,
                        contactNumber: e.contactNumber,
                        user:e.user,
                        id:e.id
                    }
                    return obj
                });
                setAddressList(a)
            }).catch((e) => {
                errorMsg('something  went wrong')
            })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const nextstep = () => {
        if (address === '') {
            errorMsg('please select address');
            return
        }
        setActiveKey(2);
        setFinalStep(true);
    }
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

    const midStep = () => {
          navigate('/addaddress/' + id + '/2')        
      }

    useEffect(() => {
        if (!userData()) {
            navigate('/login')
          } else { 
       
          }
    })
    return (
        <div>
            <Box sx={{ width: '80%', margin: 'auto', marginY: '20px' }}>
                <Stepper activeStep={activeKey} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            {!finalstep && <>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '20px' }}>Select address:</p>
                    <TextField
                        name='address'
                        id="outlined-select-currency"
                        select
                        label="Select"
                        defaultValue=""
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        style={{ width: '50%', textAlign: 'start' }}
                    >
                        <MenuItem value="">select</MenuItem>
                        {
                            addressList.map((e, i) => <MenuItem key={i} value={e}>{Object.values(e).join(' ')}</MenuItem>)
                        }
                    </TextField>
                </div>
                <p style={{ textAlign: 'center' }}>OR</p>
                <form className='registerForm1' style={{ marginTop: '20px' }}>
                    <h3 style={{ marginTop: '5px', textAlign: 'center' }}>Add Address</h3>
                    <TextField name='name' label="Name *" variant="outlined" onChange={(e) => { handleChange(e) }} />
                    <TextField name='contactNumber' variant='outlined' label='Contact Number *' onChange={(e) => { handleChange(e) }} />
                    <TextField name='street' variant='outlined' label='Street *' onChange={(e) => { handleChange(e) }} />
                    <TextField name='city' variant='outlined' label='City *' onChange={(e) => { handleChange(e) }} />
                    <TextField name='state' variant='outlined' label='State *' onChange={(e) => { handleChange(e) }} />
                    <TextField name='landmark' variant='outlined' label='Landmark' onChange={(e) => { handleChange(e) }} />
                    <TextField name='zipcode' variant='outlined' label='Zipcode *' onChange={(e) => { handleChange(e) }} />
                    <button type='button' onClick={addAddress} className='loginBtn'>Save Address</button>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button style={{ marginTop: '10px', marginRight: '20px', backgroundColor: "#3f51b5" }} size="medium" variant='contained' onClick={goToOrder}>BACK</Button>
                        <Button style={{ marginTop: '10px', backgroundColor: "#3f51b5" }} size="medium" variant='contained' color="primary" onClick={nextstep}>NEXT</Button>
                    </div>
                </form>
            </>}
            {
                finalstep &&
                <>
                    <div className='finalStep'>
                        {details && <div style={{ width: '60%' }}>
                            <h2>{details.name}</h2>
                            <p>Quantity: {qty}</p>
                            <p>Category: {(details.category).toUpperCase()}</p>
                            <p><em>{details.description}</em></p>
                            <h2 style={{ color: 'red' }}>Total Price : {details.price * qty}</h2>
                        </div>}
                        <div style={{ width: '40%', borderLeft: '2px solid #80808045' }}>
                            <h2>Address Details</h2>
                            <p>{address.street}</p>
                            <p>Contact Number :{address.contactNumber}</p>
                            <p>{address.landmark}</p>
                            <p>{address.state}</p>
                            <p>{address.zipcode}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button style={{ marginTop: '10px', marginRight: '20px', backgroundColor: "#3f51b5" }} size="medium" variant='contained' onClick={midStep} >BACK</Button>
                        <Button style={{ marginTop: '10px' , backgroundColor: "#3f51b5"}} size="medium" variant='contained' onClick={placeOrder}>PLACE ORDER</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default AddAddress