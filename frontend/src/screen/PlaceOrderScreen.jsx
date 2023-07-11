import { useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Checkoutsteps from "../component/Checkoutsteps"
import { Row,Col, ListGroup,Image, Card, Button } from "react-bootstrap"
import { Message } from "../component/Message"
import { useCreateOrderMutation } from "../slice/orderSlice"
import { Loader } from "../component/Loader"
import {toast} from 'react-toastify'
import { clearCartItems } from "../slice/cartSlice"

const PlaceOrderScreen = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.cart);

    const [createOrder,{isLoading,error}]=useCreateOrderMutation();

    useEffect(()=>{
        if(!cart.shippingAddress.address ){
            navigate('/shipping')
        }
        if(!cart.paymentMethod){
            navigate('/payment')
        }
    },[navigate,cart.shippingAddress,cart.paymentMethod])

    

    const placeOrderHandler=async()=>{
        try{
         
            const res=await createOrder({
                orderItems:cart.cartItem,
                shippingAddress:cart.shippingAddress,
                paymentMethod:cart.paymentMethod,
                itemPrice:cart.itemsPrice,
                taxPrice:cart.tax,
                shippingPrice:cart.shippingPrice,
                totalPrice:cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`)
        }catch(err){
            toast.error(error)

        }

    }
  return (
    <>
        <Checkoutsteps step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                <h2>Shipping:</h2>
                    <ListGroup.Item>
                        <strong>Address:</strong>
                        <p>{cart.shippingAddress.address},{cart.shippingAddress.city}{' '}
                        {cart.shippingAddress.postalcode}{' '},{cart.shippingAddress.country}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Payment Method: </strong>
                        <p>{cart.paymentMethod}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItem.length===0 ? (
                            <Message>Your Cart Is Empty</Message>
                        ) : (<ListGroup >
                           {cart.cartItem.map((item,index)=>(
                           
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                        <Image src={item.image} alt={item.name}
                                        fluid rounded />

                                        </Col>
                                        <Col>
                                        <Link to={`/product/${item._id}`}>
                                        {item.name}
                                        </Link></Col>
                                        <Col md={4}>
                                            {item.qty} X {item.price}=Rs.{item.qty*item.price}
                                        </Col>
                                    </Row>
                                    
                                </ListGroup.Item>
                           
                        ))}
                        </ListGroup>)}
                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Items:
                                </Col>
                                <Col>
                                Rs.{cart.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping:
                                </Col>
                                <Col>
                                Rs.{cart.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Tax:
                                </Col>
                                <Col>
                                Rs.{cart.tax}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Total Price:
                                </Col>
                                <Col>
                                Rs.{cart.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message>{error}</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block"
                            disabled={cart.cartItem.length===0} onClick={placeOrderHandler}>Place Order</Button>
                            {isLoading && <Loader />}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen