import axios from "axios";
import AuthService from "./AuthService";

const REACT_APP_BACKEND_URL = "http://localhost:8080/employees";

class EmployeeService {

    getEmployees() {
        return axios.get(REACT_APP_BACKEND_URL, { headers: AuthService.authHeader() });
    }

    createEmployee(employee) {
        return axios.post(REACT_APP_BACKEND_URL, employee, { headers: AuthService.authHeader() });
    }

    getEmployeeById(employeeId) {
        return axios.get(REACT_APP_BACKEND_URL + '/' + employeeId, { headers: AuthService.authHeader() });
    }

    updateEmployee(employeeId, employee) {
        return axios.put(REACT_APP_BACKEND_URL + '/' + employeeId, employee, { headers: AuthService.authHeader() });
    }

    deleteEmployee(employeeId) {
        return axios.delete(REACT_APP_BACKEND_URL + '/' + employeeId, { headers: AuthService.authHeader() });
    }

    uploadPhoto(photo) {
        return axios.post(REACT_APP_BACKEND_URL + '/upload', photo, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...AuthService.authHeader()
            }
        });
    }
}

export default new EmployeeService();
