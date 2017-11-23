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
      return <Link to="/signup">{"Create a new Lexicon account."}</Link>;
    } else {
      return <Link to="/login">{"Already a Lexicon user? Log in."}</Link>;
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

  render() {
    const text = (this.props.formType === 'login') ? 'Log In' : 'Sign Up';
    return (
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit} className="session-form">
          <h2>{text}</h2>
          {this.displayErrors()}
          <label>
            Username:
            <input type='text'
                   onChange={this.handleChange('username')}
                   className='session-form-input' />
          </label>
          <label>
            Password:
            <input type='password'
                   onChange={this.handleChange('password')}
                   className='session-form-input' />
          </label>
          <input type='submit' value='submit' />
          {this.displaySwitchFormType()}
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
