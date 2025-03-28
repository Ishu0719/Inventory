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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<LayoutDashboard />} />
        <Route path="/product" element={<LayoutProducts />} />
        <Route path="/suppliers" element={<LayoutSuppliers />} />
        <Route path="/customer" element={<LayoutCustomer />} />
        <Route path="/banner" element={<LayoutBanner />} />
        <Route path="/discount" element={<LayoutDiscount />} />
        <Route path="/finance" element={<LayoutFinance />} />
        <Route path="/forget-password" element={<Forget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
