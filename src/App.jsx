// import { ReactComponent as Logo } from "./assets/WebShop.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/AddProduct";
import Category from "./pages/admin/Category";
import OneItem from "./pages/OneItem";
import Item from "./pages/Item";
import Shops from "./pages/Shops";
import NavigationBar from "./pages/admin/NavigationBar";
import MaintainProduct from "./pages/admin/MaintainProduct";
import EditProduct from "./pages/components/EditProduct";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import SingleProduct from "./pages/components/SingleProduct";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="" exact element={<Home />}></Route>
        <Route path="admin" exact element={<AdminHome />}></Route>
        <Route
          path="admin/lisa-toode"
          exact
          element={
            <div>
              <AddProduct />
            </div>
          }
        ></Route>
        <Route path="admin/kategooriad" exact element={<Category />}></Route>
        <Route path="admin/muuda/:id" exact element={<EditProduct />}></Route>
        <Route path="admin/tooted" exact element={<MaintainProduct />}></Route>
        <Route
          path="muuda-toode"
          exact
          element={<div>Muuda toode</div>}
        ></Route>
        <Route path="item" exact element={<Item />}></Route>
        <Route path="item/:itemName" exact element={<OneItem />}></Route>
        <Route path="poed" exact element={<Shops />}></Route>
        <Route path="ostukorv" exact element={<Cart />}></Route>
        <Route path="meist" exact element={<AboutUs />}></Route>
        <Route path="toode/:id" exact element={<SingleProduct />}></Route>
        <Route path="*" exact element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
