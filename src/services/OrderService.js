import axios from 'axios';

const ORDER_API_BASE_URL = "http://localhost:8080/orders";

class OrderService {
    getOrders() {
        return axios.get(`${ORDER_API_BASE_URL}/getAll`);
    }


}

export default new OrderService();
