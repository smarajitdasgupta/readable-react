import React, { Component } from 'react'
import PostVotes from './PostVotes'
import PostMain from './PostMain'
import CommentList from './CommentList'
import { connect } from 'react-redux'
import { loadPostComments, getPost } from '../actions'
import { Route, withRouter } from 'react-router-dom'
import NotFound from './NotFound'
import { Row, Col } from 'react-bootstrap'


class SinglePost extends Component {

  state = {
    postId: this.props.match.params.postId,
    backPath: ''
  }

  componentDidMount() {
    this.props.loadPost(this.state.postId)
    this.props.loadComments(this.state.postId)
  }

  componentWillReceiveProps({ location }) {
    const redirectPath = location.pathname.substr(0, location.pathname.lastIndexOf("/"))
    this.setState({ backPath: redirectPath })
  }

  deletePost = (postId) => this.props.destroyPost(postId)

  render() {
    const { posts, comments } = this.props
    const post = posts[0] || {}
    const postComments = comments[post.id] || []
    
    return (
      <div>
        {
          !post.id ? (
            <Route component={NotFound} />
          ) : (
              <div className="single-post">
                <Row className="single-post">
                  <Col sm={3} className="posts-sidebar"><PostVotes post={post} /></Col>
                  <Col sm={9} className="post-main">
                    <PostMain post={post} />
                  </Col>
                  <Col sm={3}></Col>
                  <Col sm={9}>
                    {post.id &&
                      <CommentList
                        postComments={postComments}
                        postId={post.id} />
                    }
                  </Col>
                </Row>
              </div>
            )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadComments: (postId) => dispatch(loadPostComments(postId)),
    loadPost: (postId) => dispatch(getPost(postId)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost))
