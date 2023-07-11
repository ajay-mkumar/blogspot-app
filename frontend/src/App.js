import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from "./component/Header";
import {Container} from 'react-bootstrap'
import Footer from "./component/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ShippingScreen from './screen/ShippingScreen';
import PrivateRoute from './component/PrivateRoute';
import PayementScreen from './screen/PayementScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import ProfileScreen from './screen/ProfileScreen';
import OrdersListScreen from './screen/admin/OrdersListScreen';
import AdminRoute from './component/AdminRoute';
import ProductlistScreen from './screen/admin/ProductlistScreen';
import ProductEditScreen from './screen/admin/ProductEditScreen';
import UserListScreen from './screen/admin/UserListScreen';
import UserEditScreen from './screen/admin/UserEditScreen';

function App() {
  return (
 <Router>
   <Header />
   
   <main className="py-3">
    <Container>
    <Routes>
    <Route index={true} path='/' element={<HomeScreen />} />
    <Route path='/page/:pageNumber' element={<HomeScreen />} />
    <Route path='/product/:id' element={<ProductScreen />} />
    <Route path='/cart' element={<CartScreen />} />
    <Route path='/signin' element={<LoginScreen />} />
    <Route path='/register' element={<RegisterScreen />} />
    

    <Route path='' element={<PrivateRoute />}>
    <Route path='/shipping' element={<ShippingScreen />} />
    <Route path='/payment' element={<PayementScreen />} />
    <Route path='/placeorder' element={<PlaceOrderScreen />} />
    <Route path='/order/:id' element={<OrderScreen />} />
    <Route path='/profile' element={<ProfileScreen />} />
    </Route>

    <Route path='' element={<AdminRoute />}>
    <Route path='/admin/orders' element={<OrdersListScreen />} />
    <Route path='/admin/products' element={<ProductlistScreen />} />
    <Route path='/admin/products/:pageNumber' element={<ProductlistScreen />} />
    <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
    <Route path='/admin/users' element={<UserListScreen />} />
    <Route path='/admin/users/:id/edit' element={<UserEditScreen />} />
    </Route>
    </Routes>
    </Container>

   </main>
 
   <Footer />
   <ToastContainer />
   </Router>
  );
}

export default App;
