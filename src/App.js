import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Category from './components/Category/Category'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Notfound from './components/Notfound/Notfound'
import UserTokenProvider from './context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Details from './components/Details/Details';
import CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders'
const routes = createBrowserRouter([
{path:'', element:<Layout/>, children: [
  {path: '', element: <ProtectedRoute><Home/></ProtectedRoute> }, 
  {path: 'home', element: <ProtectedRoute><Home/></ProtectedRoute>}, 
  {path: 'product', element:<ProtectedRoute><Products/></ProtectedRoute> },
  {path: 'category', element: <ProtectedRoute><Category/></ProtectedRoute>},
  {path: 'allorders', element: <ProtectedRoute><Allorders/></ProtectedRoute>},
  {path: 'brands', element:<ProtectedRoute><Brands/></ProtectedRoute> },
  {path: 'cart', element: <ProtectedRoute><Cart/></ProtectedRoute> },
  {path: 'checkout', element: <ProtectedRoute><Checkout/></ProtectedRoute> },
  {path: 'details/:id', element: <ProtectedRoute><Details/></ProtectedRoute> },
  {path: 'signin', element: <SignIn/>},
  {path: 'signup', element: <SignUp/>},
  {path: '*', element: <Notfound/>}
]}
])
function App() {
  return (
    <CartContextProvider>
      <UserTokenProvider>
        <RouterProvider router = {routes}></RouterProvider>
        <ToastContainer theme='colored'/>
      </UserTokenProvider>
    </CartContextProvider>
  );
}

export default App;
