import React from 'react';
import merge from 'lodash/merge';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  handleChange(field) {
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user);
  }

  displaySwitchFormType() {
    if (this.props.formType === 'login') {
      return <Link to="/signup" className="switch-form-link">{"New user? Create a new Lexicon account."}</Link>;
    } else {
      return <Link to="/login" className="switch-form-link">{"Already a Lexicon user? Log in."}</Link>;
    }
  }

  displayErrors() {
    return (
      <ul>
        {this.props.errors.map((error, idx) => (
          <li key={error}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  loginDemoUser(e) {
    e.preventDefault();
    this.props.login({
      username: "eHemmingway",
      password: "fivetoedcat"
    });
  }

  render() {
    const text = (this.props.formType === 'login') ? 'Log In' : 'Sign Up';
    return (
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit}
              className="session-form fixed-width">
          <h2>{text}</h2>
          <div className="session-form-errors">
            {this.displayErrors()}
          </div>
          <div className="session-form-inputs">
            <input type='text'
                   onChange={this.handleChange('username')}
                   className='session-form-input'
                   placeholder="Enter username" />
            <input type='password'
                   onChange={this.handleChange('password')}
                   className='session-form-input'
                   placeholder="Enter password" />
            <input type='submit'
                   value='Submit'
                   className='session-form-button'/>
          </div>
          {this.displaySwitchFormType()}
          <span>
            ...or enter as a &nbsp;
            <button className="demo-user-button"
                    onClick={this.loginDemoUser}>
                    Demo User
            </button>
          </span>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
