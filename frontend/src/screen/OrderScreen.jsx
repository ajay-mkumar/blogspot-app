import { useEffect } from 'react';
import { useDeliverorderMutation, useGetOrderDetailsQuery } from '../slice/orderSlice'
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../component/Loader';
import { Message } from '../component/Message';
import { Col, ListGroup, Row,Image, Button } from 'react-bootstrap';
import {PayPalButtons,usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { usePayOrderMutation,useGetPayPalClientIdQuery } from '../slice/orderSlice';
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';

const OrderScreen = () => {

    const {id:orderId}=useParams();
    const {data:order,refetch,isLoading,error}=useGetOrderDetailsQuery(orderId);

    const [payOrder,{isLoading:payLoading}]=usePayOrderMutation();
    const [deliverOrder,{isLoading:deliverLoading}]=useDeliverorderMutation();

    const [{isPending} , paypalDispatch]=usePayPalScriptReducer();

    const {data:paypal,isLoading:paypalLoading,error:paypalError}=useGetPayPalClientIdQuery();

    const {userinfo}=useSelector(state=>state.auth)

    useEffect(()=>{
        if(!paypalError && !paypalLoading && paypal.clientId){
            const loadPayPalScript=async()=>{
                paypalDispatch({
                    type:'resetOptions',
                    value:{
                        'client-id':paypal.clientId,
                        'currency':'USD'
                      
                    }

                });
                paypalDispatch({type:"setLoadingStatus" , value:"pending"});
            }
        
        if(order && !order.isPaid){
            if(!window.paypal){
                loadPayPalScript();
            }
        }
    }
    },[order,paypal,paypalDispatch,paypalLoading,paypalError])

    function onApprove(data,actions){
        return actions.order.capture().then(async function(details){
            try{
            await payOrder({orderId,details});
            refetch();
            toast.success('payment successfull')
            }catch(err){
            toast.error(err?.data?.Message || err.Message)
        }
        });

    }
   
    function onError(err){
        toast.error(err.Message)

    }
    function createOrder(data,actions){
        return actions.order.create({
            purchase_units:[
                {
                    amount:{
                        'currency_code':"USD",
                        value:order.totalPrice,
                    },
                },
            ],
        }).then((orderId)=>{
            return orderId
        })
    }
    const deliverHandler=async()=>{
        try{
        await deliverOrder({orderId}).unwrap();
        refetch();
        toast.success("Order Delivered");
    }catch(err){
        toast.error(err?.data?.message || err.message)
    }
}
  return isLoading ? <Loader /> : error ? <Message variant={'danger'}>{error}</Message> :
  (<>
  <h1>Order:{order._id}</h1>
  <Row>
    <Col md={8}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                    <strong>Name:</strong> {order.user.name}
                </p>
                <p>
                    <strong>Email:</strong> {order.user.email}
                </p>
                <p>
                    <strong>Address:</strong> {
                        order.shippingAddress.map((a,i)=>(
                            <p>{a.address},{a.city},{a.postalcode},{a.country}</p>                            
                        ))
                    }
                  
                </p>
                <p>
                  
                    {order.isDelivered ?(
                        <Message variant={'success'}>Delivered on {order.DeliveredAt}</Message>
                    ):(<Message variant={'danger'}>Not Delivered</Message>)}
                </p>
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                </p>
                     
                    {order.isPaid ?(
                        <Message variant={'success'}>paid on {order.PaidAt}</Message>
                    ):(<Message variant={'danger'}>Not Paid</Message>)}   
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>ordered items</h2>
                {order.orderItems.map((item,index)=>(
                    <ListGroup.Item key={index}>
                        <Row>
                            <Col md={1}>
                               <Image src={item.image} alt={item.name} fluid rounded/> 
                            </Col>
                            <Col>
                            <Link to={`/product/${item.product}`}>
                                {item.name}
                            </Link>
                            </Col>
                            <Col md={4}>
                                {item.qty} x Rs.{item.price}=Rs.{item.qty * item.price}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup.Item>
        </ListGroup>
    </Col>
    <Col  md={4}>
        <ListGroup variant='flush'>
        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Items:
                                </Col>
                                <Col>
                                Rs.{order.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping:
                                </Col>
                                <Col>
                                Rs.{order.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Tax:
                                </Col>
                                <Col>
                                Rs.{order.tax}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Total Price:
                                </Col>
                                <Col>
                                Rs.{order.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {payLoading && <Loader />}

                                {isPending ?<Loader /> :(
                                  <>
                                       
                                       
                                            <PayPalButtons 
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}></PayPalButtons>
                                        </>
                                )}
                            </ListGroup.Item>
                        )}

                        {deliverLoading && <Loader />}
                         {userinfo && userinfo.isAdmin && order.isPaid && !order.isDelivered &&
                         <ListGroup.Item>
                            <Button  type='button' className='btn btn-block' onClick={deliverHandler}>
                                Mark As Delivered
                                </Button></ListGroup.Item>}
        </ListGroup>
    </Col>
    </Row></>);
}

export default OrderScreen