import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="login-box">
        <ListErrors errors={this.props.errors} />
        <div className="card card-default">
          <div className="card-body">
            <h1 className="text-center">Sign In</h1>
            <p className="text-center">
              <Link to="/register">
                Need an account?
              </Link>
            </p>
            <form onSubmit={this.submitForm(email, password)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.changeEmail} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.changePassword} />
                </fieldset>
                <div className="form-group text-center">
                  <button
                    className="btn btn-default"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign in
                  </button>
                </div>
     
              </fieldset>
            </form>


          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
