import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            role: 1, // Default to user role
            loading: false,
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleRegister(event) {
        event.preventDefault();

        this.setState({
            message: '',
            loading: true
        });

        AuthService.signup(this.state.username, this.state.password, this.state.role).then(
            () => {
                this.props.navigate('/login');
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <form onSubmit={this.handleRegister}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                className="form-control"
                                name="role"
                                value={this.state.role}
                                onChange={this.handleChange}
                            >
                                <option value={0}>Admin</option>
                                <option value={1}>User</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Register</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        );
    }
}

export default function(props) {
    const navigate = useNavigate();
    return <RegisterPage {...props} navigate={navigate} />;
}
