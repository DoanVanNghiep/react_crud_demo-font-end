import React, { Component } from 'react';
import OrderService from '../services/OrderService';

class OrderListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            isImageVisible: {}, // Khởi tạo một đối tượng để lưu trạng thái hiển thị ảnh cho từng đơn hàng
            startDate: '',
            endDate: '',
            filteredOrders: [],
            revenue: 0,
            totalPaidRevenue: 0 // Thêm biến trạng thái để lưu tổng doanh thu từ các đơn hàng đã thanh toán
        };
    }

    componentDidMount() {
        OrderService.getOrders().then((res) => {
            this.setState({ orders: res.data }, () => {
                this.calculateRevenue();
                this.calculateTotalPaidRevenue();
            });
        });
    }

    toggleImageVisibility(orderId) {
        this.setState((prevState) => ({
            isImageVisible: {
                ...prevState.isImageVisible,
                [orderId]: !prevState.isImageVisible[orderId]
            }
        }));
    }

    handleFilter = () => {
        const { startDate, endDate, orders } = this.state;
        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
        });

        this.setState({ filteredOrders }, this.calculateRevenue);
    };

    calculateRevenue = () => {
        const { filteredOrders } = this.state;
        const revenue = filteredOrders
            .filter(order => order.status === 1) // Lọc các đơn hàng đã thanh toán
            .reduce((sum, order) => sum + order.totalAmount, 0);
        this.setState({ revenue });
    };

    calculateTotalPaidRevenue = () => {
        const { orders } = this.state;
        const totalPaidRevenue = orders
            .filter(order => order.status === 1) // Lọc các đơn hàng đã thanh toán
            .reduce((sum, order) => sum + order.totalAmount, 0);
        this.setState({ totalPaidRevenue });
    };

    render() {
        const { orders, filteredOrders, revenue, totalPaidRevenue } = this.state;
        const displayedOrders = filteredOrders.length ? filteredOrders : orders;

        return (
            <div>
                <h2 className="text-center">Orders List</h2>
                <div style={{ margin: '20px 0' }}>
                    <label htmlFor="startDate">Lọc theo ngày bán: Từ ngày</label>
                    <input
                        type="date"
                        id="startDate"
                        value={this.state.startDate}
                        onChange={(e) => this.setState({ startDate: e.target.value })}
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                    />
                    đến
                    <input
                        type="date"
                        id="endDate"
                        value={this.state.endDate}
                        onChange={(e) => this.setState({ endDate: e.target.value })}
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                    />
                    <button onClick={this.handleFilter} className="btn btn-primary" style={{ marginLeft: '10px' }}>
                        Lọc
                    </button>
                    <span style={{ marginLeft: '20px' }}>Doanh thu: {revenue.toLocaleString()}</span>&nbsp;&nbsp;&nbsp;&nbsp;|
                    <span style={{ marginLeft: '20px' }}>Tổng doanh thu: {totalPaidRevenue.toLocaleString()}</span>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">  
                        <thead>
                            <tr>
                                <th>Mã hóa đơn</th>
                                <th>Tên khách</th>
                                <th>Số điện thoại</th>
                                <th>Ngày đặt mua</th>
                                <th>Địa chỉ nhận sách</th>
                                <th>Trạng thái đơn hàng</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedOrders.map(order =>
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.username}</td>
                                    <td>{order.phone}</td>
                                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                                    <td>{order.address}</td>
                                    <td>{order.status === 0 ? 'Đang xử lý' : 'Đã thanh toán'}</td>
                                    <td>
                                        <button onClick={() => this.toggleImageVisibility(order.orderId)}>
                                            {this.state.isImageVisible[order.orderId] ? 'Ẩn' : 'Xem thông tin'}
                                        </button>
                                        {this.state.isImageVisible[order.orderId] && (
                                            <div id={`div${order.orderId}`}>
                                                <table border="1">
                                                    <thead>
                                                        <tr>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Giá tiền</th>
                                                            <th>Số lượng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{order.empName}</td>
                                                            <td>{order.price}</td>
                                                            <td>{order.quantity}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default OrderListComponent;
