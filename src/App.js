import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import UserEmployeeComponent from './components/UserEmployeeComponent';
import RegisterPage from './components/RegisterPage';
import CartComponent from './components/CartComponent';
import CheckoutComponent from './components/CheckoutComponent'; // Thêm mới
import OrderDetailsComponent from './components/OrderDetailsComponent'; // Thêm mới
import LoginPage from './components/LoginPage';
import OrderView from './components/OrderListComponent';
import OrderDetailView from './components/OrderDetailListComponent';
function App() {
    return (
        <Router>
            <HeaderComponent />
            <div className="container">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/employee" element={<ListEmployeeComponent />} />
                    <Route path="/add-employee/:id" element={<CreateEmployeeComponent />} />
                    <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
                    <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
                    <Route path="/user" element={<UserEmployeeComponent />} />
                    <Route path="/cart" element={<CartComponent />} />
                    <Route path="/checkout" element={<CheckoutComponent />} /> {/* Thêm mới */}
                    <Route path="/order-details/:orderId" element={<OrderDetailsComponent />} /> {/* Thêm mới */}
                    <Route path="/order-view" element={<OrderView />} />
                    <Route path="/order-detail-view/:orderId" element={<OrderDetailView />} />
                </Routes>
            </div>
            <FooterComponent />
        </Router>
    );
}

export default App;
