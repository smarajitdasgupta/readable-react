import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotAvailable extends Component {

  render() {
    return (
        <div>
          <p className="not-available">Uh oh! This page is not available. </p>
          <Link to="/">
            Start over?
          </Link>
        </div>
      )
    }
}

export default NotAvailable
