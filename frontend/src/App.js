import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import LoginPage from "./components/LoginPage";
import BuyerHome from "./components/BuyerHome";
import SellerHome from "./components/SellerHome";
import AdminHome from "./components/AdminHome";
import AddItem from "./components/AddItem";

function App() {
  return (
    <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route element={<ProtectedRoute authRole="admin" /> }>
                <Route path={"/admin"} element={<AdminHome />}/>
            </Route>

            <Route element={<ProtectedRoute authRole="seller" /> }>
                <Route path={"/seller"} element={<SellerHome />}/>
                <Route path={"/add-item"} element={<AddItem />}/>
            </Route>

            <Route element={<ProtectedRoute authRole="buyer" /> }>
                <Route path={"/buyer"} element={<BuyerHome />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
