import React, { Component } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import ListPosts from './components/ListPosts'
import Sidebar from './components/Sidebar'
import SinglePost from './components/SinglePost'
import NotFound from './components/NotFound'
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
            <Route exact path='/:category/:postId' render={(props) => <SinglePost {...props} />} />
            <Route exact path='/:category' render={(props) => (
              <Row className="show-grid">
                <Col sm={6} md={2} className="sidebar"><Sidebar /></Col>
                <Col sm={6} md={10} className="posts-display"><ListPosts /></Col>
              </Row>
            )}/>
            <Route exact path='*' component={ NotFound } />
          </Switch>
        </Grid>
      </div>
    );
  }
}


export default App
