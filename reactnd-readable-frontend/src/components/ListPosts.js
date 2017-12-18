import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostSnippet from './PostSnippet'
import { loadPosts, setCategory } from '../actions'
import CreatePost from './CreatePost'
import { withRouter } from 'react-router-dom'
import { ListGroup, Row, Col } from 'react-bootstrap'

class ListPosts extends Component {

  state = {
    posts: [],
    listState: {}
  }

  setCat = (catName) => this.props.changeCat(catName)

  componentDidMount() {
    this.props.getPosts(this.props.listState.category)
  }

  componentWillReceiveProps({ location }) {
    const newCat = location.pathname !== '/' ? location.pathname.slice(1) : 'all'
    const oldCat = this.props.listState.category
    if (newCat !== oldCat) {
      this.setCat(newCat)
      this.props.getPosts(newCat)
    }
  }

  render() {

    const { listState, posts } = this.props

    // sort posts by votes or date
    const sortPosts = () => {
      switch (listState.sortType) {
        case "Top Score":
          return posts.sort((a, b) => (b.voteScore - a.voteScore))
        case "Most Recent":
          return posts.sort((a, b) => (b.timestamp - a.timestamp))
        default:
          return posts
      }
    }

    return (
      <div>
        <Row>
          <Col md={6}></Col>
          <CreatePost />
        </Row>

        <ListGroup componentClass="ul">
          {posts.length > 0 ?
            sortPosts().map((post) => (
              <PostSnippet
                post={post}
                key={post.id}
              />
            )) : <div className="not-available">
              <p>There are no posts to show. Why don't you create one? </p>
            </div>}
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    listState: state.listState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCat: (category) => dispatch(setCategory(category)),
    getPosts: (category) => dispatch(loadPosts(category))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts))
