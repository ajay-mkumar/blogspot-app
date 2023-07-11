import React from 'react'
import { logout } from '../slice/authSlice'
import { useLogoutMutation } from '../slice/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import { LinkContainer} from 'react-router-bootstrap'
import { Badge, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const {cartItem}=useSelector((state)=>state.cart);
  const {userinfo}=useSelector((state)=>state.auth);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [logoutUser]=useLogoutMutation();

  const logoutHandler=async()=>{
    try{
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/signin')
      
   }catch(err){
    console.log(err)
   }
  }
  return (
    <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to={'/'}>
        <Navbar.Brand >Aj Shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to={'/cart'}>
            <Nav.Link ><i className='fas fa-shopping-cart px-1'></i>Cart
            { cartItem.length >0 &&
            <Badge pill bg='success' style={{marginLeft:"5px"}}>
              {cartItem.reduce((a,c)=>a+c.qty,0)}
              </Badge>}
              </Nav.Link>
            </LinkContainer>
            {userinfo ? (<NavDropdown title={userinfo.name} id='username'>
              <LinkContainer to={'/profile'}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  logout
                </NavDropdown.Item>
            </NavDropdown>) : ( 
            <LinkContainer to={'/signin'}>
            <Nav.Link link="/signin"><i className='fas fa-user px-1'></i>Sign in</Nav.Link>
            </LinkContainer>)}
            {userinfo && userinfo.isAdmin && (
            <NavDropdown title='admin' id='adminmenu'>
               <LinkContainer to={'/admin/products'}>
                <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={'/admin/users'}>
                <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              <LinkContainer to={'/admin/orders'}>
                <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
            </NavDropdown>) }
         
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </header>
  )
}

export default Header