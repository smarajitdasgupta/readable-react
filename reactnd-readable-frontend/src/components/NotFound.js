import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {

  render() {
    return (
        <div className="not-found">
          <h3>404 page not found</h3>
          <p>We are sorry but there is nothing to see here.</p>
          <Link to="/">
            Go to home.
          </Link>
        </div>
      )
    }
}

export default NotFound
