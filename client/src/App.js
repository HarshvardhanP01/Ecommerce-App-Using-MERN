import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Privacy from "./Pages/Privacy";
import Pagenotfound from "./Pages/Pagenotfound";
import Register from "./Pages/auth/Register";
import Login from './Pages/auth/Login';
import Dashboard from './Pages/user/Dashboard';
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./Pages/auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Orders from "./Pages/user/Orders";
import Profile from "./Pages/user/Profile";
import Users from './Pages/Admin/Users';
import Products from "./Pages/Admin/Products";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import Search from "./Pages/Search";
import CartPage from "./Pages/CartPage";
import AdminOrders from "./Pages/Admin/AdminOrders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Privacy />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>

  );
}

export default App;
