import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + 'authenticate', {
                username,
                password
            })
            .then(response => {
                if (response.data.token && response.data.user_id) { // Kiểm tra nếu token và user_id có tồn tại
                    this.setCookie('user', JSON.stringify({
                        token: response.data.token,
                        user_id: response.data.user_id,
                        username: response.data.username,
                        role: response.data.role
                    }), 1); // Lưu vào cookie, hết hạn sau 1 ngày
                }
                return response.data;
            });
    }

    signup(username, password, role) {
        return axios.post(API_URL + 'signup', {
            username,
            password,
            role
        });
    }

    logout() {
        const cartKey = this.getCartKey();
        this.deleteCookie(cartKey); // Xóa giỏ hàng
        this.deleteCookie('user'); // Xóa thông tin người dùng
    }

    getCurrentUser() {
        const user = this.getCookie('user');
        return user ? JSON.parse(user) : null;
    }

    getCurrentUserRole() {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    }

    getCurrentUserId() {
        const user = this.getCurrentUser();
        return user ? user.user_id : null;
    }

    authHeader() {
        const user = this.getCurrentUser();
        if (user && user.token) {
            return { Authorization: 'Bearer ' + user.token };
        } else {
            return {};
        }
    }

    getCartKey() {
        const user = this.getCurrentUser();
        return user ? `cart_${user.user_id}` : 'cart';
    }

    saveCart(cart) {
        const cartKey = this.getCartKey();
        this.setCookie(cartKey, JSON.stringify(cart), 1); // Lưu giỏ hàng vào cookie, hết hạn sau 1 ngày
    }

    loadCart() {
        const cartKey = this.getCartKey();
        const cart = this.getCookie(cartKey);
        return cart ? JSON.parse(cart) : [];
    }

    // Helper functions to manage cookies
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
}

export default new AuthService();
