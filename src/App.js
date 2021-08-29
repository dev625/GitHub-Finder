import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import UserPage from './components/users/UserPage'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  }
  //Search GitHub Users
  searchUsers = async (text) => {
    this.setState({ loading: true })
    console.log(text)
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    this.setState({ users: res.data.items, loading: false })
  }
  //Get single GitHub user
  getUser = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    console.log(res.data)
    this.setState({ user: res.data, loading: false })
  }

  //Clear Users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const { users, user, loading } = this.state //Destructure users and loading from the state
    return (
      <Router>
        <div className='App'>
          <Navbar title='GitHub Finder V1' />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      /*
            Notice how searchUsers and clearUsers are defined in App.js but are actually fired 
            off from the Search Component.
           */
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <UserPage
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
