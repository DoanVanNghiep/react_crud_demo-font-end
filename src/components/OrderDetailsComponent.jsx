import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService';
import withHook from '../components/withHook';

class OrderDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            orderDetails: []
        };
    }

    componentDidMount() {
        const { orderId } = this.props.params;
        axios.get(`http://localhost:8080/orders/${orderId}`, {
            headers: AuthService.authHeader()
        })
        .then(response => {
            this.setState({ order: response.data });
        })
        .catch(error => {
            console.error('There was an error fetching the order!', error);
        });

        axios.get(`http://localhost:8080/orders/details/${orderId}`, {
            headers: AuthService.authHeader()
        })
        .then(response => {
            this.setState({ orderDetails: response.data });
        })
        .catch(error => {
            console.error('There was an error fetching the order details!', error);
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Order Details</h2>
                <div className="row">
                    <div className="col-md-8">
                        <h3>Order Summary</h3>
                        <ul className="list-group">
                            {this.state.orderDetails.map(detail =>
                                <li className="list-group-item" key={detail.orderDetailId}>
                                    {detail.empNo} x {detail.quantity} = ${detail.price * detail.quantity}
                                </li>
                            )}
                        </ul>
                        <h4>Total: ${this.state.order.totalAmount}</h4>
                    </div>
                    <div className="col-md-4">
                        <h3>Thong tin don hang</h3>
                        <p>Dia chi: {this.state.order.address}</p>
                        <p>So dien thoai: {this.state.order.phone}</p>
                        <p>note: {this.state.order.note}</p>
                        <p>Order Date: {new Date(this.state.order.orderDate).toLocaleString()}</p>
                        <p>Total Amount: ${this.state.order.totalAmount}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withHook(OrderDetailsComponent);
