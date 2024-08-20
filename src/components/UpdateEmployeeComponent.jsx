import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            empNo: '',
            empName: '',
            position: '',
            photoUrl: null,
            quantity: 0, // Add this line
            price: 0.0 // Add this line
        };

        this.changeEmployeeNoHandler = this.changeEmployeeNoHandler.bind(this);
        this.changeEmployeeNameHandler = this.changeEmployeeNameHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this); // Add this line
        this.changePriceHandler = this.changePriceHandler.bind(this); // Add this line
        this.updateEmployee = this.updateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changePhotoHandler = this.changePhotoHandler.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            let employee = res.data;
            this.setState({
                empNo: employee.empNo,
                empName: employee.empName,
                position: employee.position,
                photoUrl: employee.photoUrl,
                quantity: employee.quantity, // Add this line
                price: employee.price // Add this line
            });
        }).catch(error => {
            console.error('Error fetching employee:', error);
            alert('Could not retrieve employee data. Please try again later.');
        });
    }

    updateEmployee(e) {
        e.preventDefault();
        let employee = {
            empNo: this.state.empNo,
            empName: this.state.empName,
            position: this.state.position,
            photoUrl: this.state.photoUrl,
            quantity: this.state.quantity, // Add this line
            price: this.state.price // Add this line
        };

        console.log('Updating employee data:', employee);

        EmployeeService.updateEmployee(this.state.id, employee).then(res => {
            console.log('Employee updated successfully:', res.data);
            this.props.navigation('/employee');
        }).catch(error => {
            console.error('Error updating employee:', error);
            alert('An error occurred while updating the employee. Please try again.');
        });
    }

    changeEmployeeNoHandler(event) {
        this.setState({ empNo: event.target.value });
    }

    changeEmployeeNameHandler(event) {
        this.setState({ empName: event.target.value });
    }

    changePositionHandler(event) {
        this.setState({ position: event.target.value });
    }

    changeQuantityHandler(event) {
        this.setState({ quantity: event.target.value });
    }

    changePriceHandler(event) {
        this.setState({ price: event.target.value });
    }

    changePhotoHandler(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        EmployeeService.uploadPhoto(formData).then(response => {
            this.setState({ photoUrl: response.data });
        }).catch(error => {
            console.error('Error uploading photo:', error);
            alert('An error occurred while uploading the photo. Please try again.');
        });
    }

    cancel() {
        this.props.navigation('/employee');
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Employee No:</label>
                                        <input
                                            placeholder="Employee No"
                                            name="empNo"
                                            className="form-control"
                                            value={this.state.empNo}
                                            onChange={this.changeEmployeeNoHandler}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Employee Name:</label>
                                        <input
                                            placeholder="Employee Name"
                                            name="empName"
                                            className="form-control"
                                            value={this.state.empName}
                                            onChange={this.changeEmployeeNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Position:</label>
                                        <input
                                            placeholder="Position"
                                            name="position"
                                            className="form-control"
                                            value={this.state.position}
                                            onChange={this.changePositionHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Quantity:</label>
                                        <input
                                            placeholder="Quantity"
                                            name="quantity"
                                            type="number"
                                            className="form-control"
                                            value={this.state.quantity}
                                            onChange={this.changeQuantityHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Price:</label>
                                        <input
                                            placeholder="Price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            value={this.state.price}
                                            onChange={this.changePriceHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Photo:</label>
                                        <input type="file" name="photo" className="form-control" onChange={this.changePhotoHandler} />
                                    </div>

                                    {this.state.photoUrl && (
                                        <div className="form-group">
                                            <img src={this.state.photoUrl} alt={this.state.empName} style={{ width: '100px', height: '100px' }} />
                                        </div>
                                    )}

                                    <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withHook(UpdateEmployeeComponent);
