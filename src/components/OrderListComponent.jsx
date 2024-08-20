import React, { Component } from 'react';
import OrderService from '../services/OrderService';

class OrderListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        OrderService.getOrders().then((res) => {
            this.setState({ orders: res.data });
        });
    }

    render() {
        const totalAmount = this.state.orders.reduce((sum, order) => sum + order.totalAmount, 0);

        return (
            <div>
                <h2 className="text-center">Orders List</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Date</th>
                                <th>Total Amount</th>
                                <th>Username</th>
                                <th>Employee Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Note</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.map(order =>
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>{order.username}</td>
                                    <td>{order.empName}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}</td>
                                    <td>{order.address}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.note}</td>
                                    <td>
                                        {order.status === 0 ? 'Đang xử lý' : 'Đã thanh toán'}
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan="3"><strong>Tổng cộng</strong></td>
                                <td><strong>{totalAmount}</strong></td>
                                <td colSpan="7"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default OrderListComponent;
