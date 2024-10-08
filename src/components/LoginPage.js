import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleLogin(event) {
        event.preventDefault();

        this.setState({
            message: '',
            loading: true
        });

        AuthService.login(this.state.username, this.state.password).then(
            () => {
                const role = AuthService.getCurrentUserRole();
                if (role === 0) {
                    this.props.navigate('/employee');
                } else if (role === 1) {
                    this.props.navigate('/user');
                }
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
                    <form onSubmit={this.handleLogin}>
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
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
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
                    <div className="form-group">
                        <a href="/register">Don't have an account? Register</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default function(props) {
    const navigate = useNavigate();
    return <LoginPage {...props} navigate={navigate} />;
}
