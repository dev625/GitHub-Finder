import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
  state = {
    text: '',
  }
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      //alt, text : e.target.value
      //this is so that we are able to view the changes in the search bar
    })
  }

  onSubmit = (e) => {
    e.preventDefault() //prevent from submitting a form
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light')
    } else {
      this.props.searchUsers(this.state.text) //call the searchUsers function
      this.setState({ text: '' }) //empty the search area
    }
  }
  render() {
    const { showClear, clearUsers } = this.props
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text} //the code apparently works without this line too
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {showClear && (
          <button className='btn btn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    )
  }
}

export default Search
