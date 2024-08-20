// import React, { Component } from 'react';
// import OrderDetailService from '../services/OrderDetailService';

// class ListOrderDetailComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             orderDetails: []
//         };
//     }

//     componentDidMount() {
//         OrderDetailService.getOrderDetails().then((res) => {
//             this.setState({ orderDetails: res.data });
//         }).catch(error => {
//             console.error("There was an error retrieving the order details!", error);
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <h2 className="text-center">Order Details List</h2>
//                 <div className="row">
//                     <table className="table table-striped table-bordered">
//                         <thead>
//                             <tr>
//                                 <th>Order Detail ID</th>
//                                 <th>Order ID</th>
//                                 <th>Employee Number</th>
//                                 <th>Quantity</th>
//                                 <th>Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 this.state.orderDetails.map(
//                                     orderDetail =>
//                                         <tr key={orderDetail.orderDetailId}>
//                                             <td>{orderDetail.orderDetailId}</td>
//                                             <td>{orderDetail.orderId}</td>
//                                             <td>{orderDetail.empNo}</td>
//                                             <td>{orderDetail.quantity}</td>
//                                             <td>{orderDetail.price}</td>
//                                         </tr>
//                                 )
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         );
//     }
// }

// export default ListOrderDetailComponent;
