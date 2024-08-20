import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: AuthService.loadCart()
        };
    }

    incrementQuantity(empNo) {
        let cart = this.state.cart.map(item =>
            item.empNo === empNo
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        this.setState({ cart });
        AuthService.saveCart(cart);
    }

    decrementQuantity(empNo) {
        let cart = this.state.cart.map(item =>
            item.empNo === empNo
                ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                : item
        );
        this.setState({ cart });
        AuthService.saveCart(cart);
    }

    removeItem(empNo) {
        let cart = this.state.cart.filter(item => item.empNo !== empNo);
        this.setState({ cart });
        AuthService.saveCart(cart);
    }

    calculateTotal() {
        return this.state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Shopping Cart</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Position</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cart.map(employee =>
                                <tr key={employee.empNo}>
                                    <td>{employee.empNo}</td>
                                    <td>{employee.empName}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.quantity}</td>
                                    <td>{employee.price}</td>
                                    <td>{(employee.price * employee.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => this.incrementQuantity(employee.empNo)} className="btn btn-success">+</button>
                                        <button onClick={() => this.decrementQuantity(employee.empNo)} className="btn btn-danger" style={{ marginLeft: "10px" }}>-</button>
                                        <button onClick={() => this.removeItem(employee.empNo)} className="btn btn-warning" style={{ marginLeft: "10px" }}>Remove</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <h3>Total Price: ${this.calculateTotal()}</h3>
                    <button className="btn btn-primary" onClick={() => this.props.navigate('/checkout')}>Proceed to Checkout</button>
                </div>
            </div>
        );
    }
}

export default function(props) {
    const navigate = useNavigate();
    return <CartComponent {...props} navigate={navigate} />;
}
