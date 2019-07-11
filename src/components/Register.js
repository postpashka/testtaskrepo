import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <div className="register-box">
        <ListErrors errors={this.props.errors} />
        <div className="card">
          <div className="card-body">

            <h1 className="text-center">Sign Up</h1>
            <p className="text-center">
              <Link to="/login">
                Have an account?
              </Link>
            </p>


            <form onSubmit={this.submitForm(username, email, password)}>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    value={this.props.username}
                    onChange={this.changeUsername} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={this.props.email}
                    onChange={this.changeEmail} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={this.props.password}
                    onChange={this.changePassword} />
                </fieldset>

                <div className="form-group text-center">
                  <button
                    className="btn btn-default"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
