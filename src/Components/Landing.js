import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../ducks/reducer'
import axios from 'axios'

//TODO Write all methods, connect to store, connect methods to JSX
class Landing extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
    //this.handleLogin = this.handleLogin.bind(this)
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleLogin = () => {
    const body = {
      email: this.state.email,
      password: this.state.password,
    }

    axios
      .post('/auth/login', body)
      .then((res) => {
        this.props.loginUser(res.data)
        this.props.history.push('/dashboard')
      })
      .catch((err) => {
        alert('Could not log in')
      })
  }

  render() {
    return (
      <div className="app-body">
        <div className="input-container">
          <div className="flex-horizontal inputs">
            <div className="flex-vertical">
              <input
                maxLength="100"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => {
                  this.handleInput(e)
                }}
              />
              <input
                type="password"
                maxLength="20"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => {
                  this.handleInput(e)
                }}
              />
            </div>
            <button
              onClick={() => {
                this.handleLogin()
              }}
              className="input-container-button"
            >
              Log in
            </button>
          </div>
          <div className="flex-horizontal link">
            <span>Don't have an account? Register here: </span>
            <Link to="/register" className="input-container-button">
              Register
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { loginUser })(Landing)
