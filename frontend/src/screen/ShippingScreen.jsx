import { useState } from "react"
import {Form,Button} from 'react-bootstrap'
import FormContainer from "../component/FormContainer"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slice/cartSlice";
import Checkoutsteps from "../component/Checkoutsteps";


const ShippingScreen = () => {
    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;

    const [address,setAddress]=useState(shippingAddress.address || '');
    const [city,setCity]=useState(shippingAddress.city || '');
    const [postalcode,setPostalcode]=useState(shippingAddress.postalcode || '');
    const [country,setCountry]=useState(shippingAddress.country || '');

   
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,postalcode,country}));
        navigate('/payment');
        
    }

  return (
    
    <FormContainer>
        <Checkoutsteps step2 />
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={address}
                placeholder="Enter Address" onChange={(e)=>setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={city}
                placeholder="Enter City" onChange={(e)=>setCity(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="postalcode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" value={postalcode}
                placeholder="Enter Postal Code" onChange={(e)=>setPostalcode(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" value={country}
                placeholder="Enter Country" onChange={(e)=>setCountry(e.target.value)} />
            </Form.Group>
            <Button type="submit" className="my-2" variant="primary" >
                continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen