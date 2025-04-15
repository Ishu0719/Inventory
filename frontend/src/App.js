import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forget from "./Auth/Forget";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutProducts from "./Layout/LayoutProducts";
import LayoutSuppliers from "./Layout/LayoutSuppliers";
import LayoutCustomer from "./Layout/LayoutCustomer";
import LayoutBanner from "./Layout/LayoutBanner";
import LayoutDiscount from "./Layout/LayoutDiscount";
import LayoutFinance from "./Layout/LayoutFinance";
import { ToastContainer } from "react-toastify";
import Register from "./Auth/Register";
import LayoutStock from "./Layout/LayoutStock"; 
import LayoutPurchase from "./Layout/LayoutPurchase";
function App() {
  return (
    
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<LayoutDashboard />} />
        <Route path="/product" element={<LayoutProducts />} />
        <Route path="/suppliers" element={<LayoutSuppliers />} />
        <Route path="/customer" element={<LayoutCustomer />} />
        <Route path="/banner" element={<LayoutBanner />} />
        <Route path="/discount" element={<LayoutDiscount />} />
        <Route path="/finance" element={<LayoutFinance />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/stock" element={<LayoutStock/>}/>
      <Route path ="/purchase"element ={<LayoutPurchase/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
