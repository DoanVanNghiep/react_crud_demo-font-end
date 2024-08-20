import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import axios from 'axios';
import withHook from '../components/withHook';

class CheckoutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: AuthService.loadCart(),
            address: '',
            phone: '',
            note: '',
            orderId: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    calculateTotal() {
        return this.state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }

    handleCheckout() {
        const orderData = {
            order: {
                userId: AuthService.getCurrentUser().user_id,
                orderDate: new Date(),
                totalAmount: this.calculateTotal(),
                address: this.state.address,
                phone: this.state.phone,
                note: this.state.note,
                status: 0
            },
            orderDetails: this.state.cart.map(item => ({
                empNo: item.empNo,
                quantity: item.quantity,
                price: item.price
            }))
        };

        axios.post('http://localhost:8080/orders/create', orderData, {
            headers: AuthService.authHeader()
        })
        .then(response => {
            this.setState({ orderId: response.data.orderId });
            alert('Order successfully placed!');
            this.props.navigation(`/order-details/${response.data.orderId}`);
        })
        .catch(error => {
            console.error('There was an error placing the order!', error);
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Checkout</h2>
                <div className="row">
                    <div className="col-md-8">
                        <h3>Order Summary</h3>
                        <ul className="list-group">
                            {this.state.cart.map(item =>
                                <li className="list-group-item" key={item.empNo}>
                                    {item.empName} x {item.quantity} = ${item.price * item.quantity}
                                </li>
                            )}
                        </ul>
                        <h4>Total: ${this.calculateTotal()}</h4>
                    </div>
                    <div className="col-md-4">
                        <h3>Delivery Information</h3>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="text" className="form-control" name="address" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" className="form-control" name="phone" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Note:</label>
                            <textarea className="form-control" name="note" onChange={this.handleChange}></textarea>
                        </div>
                        <button className="btn btn-success" onClick={this.handleCheckout}>Place Order</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withHook(CheckoutComponent);
