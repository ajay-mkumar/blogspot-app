import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { Form,Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Rating from '../component/Rating';
import { useCreatereviewMutation, useGetProductDetailsQuery } from '../slice/productApislice';
import { Loader } from '../component/Loader';
import { Message } from '../component/Message';
import {  useState } from 'react';
import {toast} from 'react-toastify'
import { addToCart } from '../slice/cartSlice';
const ProductScreen = () => {

   const {id:ProductID}=useParams();
   const [qty,setQty]=useState(1)
   const [ratings,setRatings]=useState(0);
   const [comment,setComment]=useState();

   const [createreview,{isLoading:reviewLoadign}]=useCreatereviewMutation();

   const {userinfo}=useSelector(state=>state.auth);
   const dispatch=useDispatch();
   const navigate=useNavigate();

   const addToCartHandler=()=>{
    dispatch(addToCart({...product,qty}));
    navigate('/cart')

   }

   const {data:product,isLoading,error,refetch}=useGetProductDetailsQuery(ProductID);
 

   const reviewHandler=async(e)=>{
    e.preventDefault();
    try {
      await createreview({
        ProductID,
        ratings,
        comment
      }).unwrap();
      toast.success("Review submitted")
      refetch();
      setRatings(0)
      setComment('')
      
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
   }
  
  return (
    <>
    <Link to={'/'} className='btn btn-light my-3'>Go back</Link>
    {isLoading ? (<Loader />) :error ? <Message variant="danger" > (error.data.messzge || error.error) </Message> :
    (<>
      <Row>
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid/>
      </Col>
      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroupItem>
            <h3>{product.name}</h3>
          </ListGroupItem>
          <ListGroupItem>
            <Rating value={product.rating} review={`${product.numReviews} reviews`} />
          </ListGroupItem>
          <ListGroupItem>
            ${product.price}
          </ListGroupItem>
          <ListGroupItem>
            Description: {product.description}
          </ListGroupItem>
        </ListGroup>

      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <Row> 
                <Col>Price:</Col>
                <Col>
                <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Status:</Col>
                <Col>
                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></Col>
              </Row>
            </ListGroupItem>
            { product.countInStock > 0 && 
            <ListGroupItem>
              <Row>
                <Col>qty</Col>
                <Col>
                <Form.Control 
                  as='select'
                  value={qty}
                  onChange={(e)=>setQty(Number(e.target.value))}
                  >
                  {[...Array(product.countInStock).keys()].map((x)=>(
                    <option key={x+1} value={x+1}>{x+1}</option>
                  ))}
                  </Form.Control>
                  </Col>
              </Row>
            </ListGroupItem>
            
            }
            <ListGroupItem>
              <Button
              className='btn-block'
              type='button'
              disabled={product.countInStock===0} onClick={addToCartHandler}>Add to Cart</Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    <Row className='review'>
      <Col md={6}>
        <h2>Reviews</h2>
        {product.reviews.length===0 && <Message>No Reviews</Message>}
        <ListGroup variant='flush'>
          {product.reviews.map(review=>(
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p>{review.createdAt.substring(0,10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <ListGroup>
          <h2>Write Customer Review</h2>
          {reviewLoadign && <Loader />}
          {userinfo ? (
            <Form onSubmit={reviewHandler}>
              <Form.Group controlId='rating' className='my-2'>
                <Form.Label>Rating</Form.Label>
                <Form.Control as={'select'} value={ratings}
                onChange={(e)=>setRatings(e.target.value)}>
                  <option value={''}>select...</option>
                  <option value={'1'}>1-Poor</option>
                  <option value={'2'}>2-Fair</option>
                  <option value={'3'}>3.Good</option>
                  <option value={'4'}>4.very Good</option>
                  <option value={'5'}>5.Excelent</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='comment' className='my-2'>
                <Form.Label>Comments</Form.Label>
                <Form.Control as={'textarea'} value={comment}
                onChange={(e)=>setComment(e.target.value)}></Form.Control>
                <Button type='submit' className='my-2' variant='primary' disabled={reviewLoadign}>Submit</Button>
              </Form.Group>
            </Form>
          ) : (<Message>Please Login to review</Message>)}
        </ListGroup>
      </Col>
    </Row>
    </>
    )}
   
    </>
  )
}

export default ProductScreen