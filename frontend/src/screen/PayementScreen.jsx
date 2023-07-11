import { useEffect, useState } from "react"
import FormContainer from "../component/FormContainer";
import Checkoutsteps from "../component/Checkoutsteps";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slice/cartSlice";

const PayementScreen = () => {
    const [paymentmethod,setPaymentMethod]=useState('PayPal');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;

    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping');
        }
    },[navigate,shippingAddress])

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentmethod));
        navigate('/placeorder')
    }

  return (
     <FormContainer>
        <Checkoutsteps step2 step3 />
        <h1>Payement Method</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label as={'legend'}>Select Method</Form.Label>
                <Form.Check type="radio"
                className="my-2"
                label='PayPal or credit card'
                name="paymentmethod"
                id="PayPal"
                value='PayPal'
                onChange={(e)=>setPaymentMethod(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary">continue</Button>
        </Form>
     </FormContainer>
  )
}

export default PayementScreen