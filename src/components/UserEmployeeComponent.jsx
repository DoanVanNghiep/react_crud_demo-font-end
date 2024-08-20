import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';

class UserEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
        this.viewEmployee = this.viewEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    viewEmployee(id) {
        this.props.navigation(`/view-employee/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map(employee =>
                                <tr key={employee.empNo}>
                                    <td>{employee.empNo}</td>
                                    <td>{employee.empName}</td>
                                    <td>{employee.position}</td>
                                    <td>
                                        <button onClick={() => this.viewEmployee(employee.empNo)} className="btn btn-info">View</button>
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

export default withHook(UserEmployeeComponent);
