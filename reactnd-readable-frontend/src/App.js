import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import ListPosts from './components/ListPosts'
import NotAvailable from './components/NotAvailable'
import Sidebar from './components/Sidebar'
import SinglePost from './components/SinglePost'
import { Grid, Navbar, Row, Col } from 'react-bootstrap'

class App extends Component {

  render() {

    return (
      <div className="App">
        <header>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                 <Navbar.Brand>
                    <Link to="/">
                      Readable
                    </Link>
                </Navbar.Brand>
              </Navbar.Header>
          </Navbar>
        </header>

        <Grid>
          <Switch>
            <Route exact path='/' render={(props) => (
              <Row className="show-grid">
                <Col sm={6} md={2} className="sidebar"><Sidebar /></Col>
                <Col sm={6} md={10} className="posts-display"><ListPosts /></Col>
              </Row>
            )}/>
            <Route path='/NotAvailable' component={ NotAvailable } />
            <Route path='/:category/:postId' render={(props) => <SinglePost {...props} />} />
            <Route  path='/:category' render={(props) => (
              <Row className="show-grid">
                <Col sm={6} md={2} className="sidebar"><Sidebar /></Col>
                <Col sm={6} md={10} className="posts-display"><ListPosts /></Col>
              </Row>
            )}/>

          </Switch>
        </Grid>
      </div>
    );
  }
}


export default App
