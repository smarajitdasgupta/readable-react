import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PostHeader from './PostHeader'

class PostMain extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  render() {
    const {post} = this.props

    return (
      <div>
        <PostHeader post={post} />
        <div className="single-post-body">{post.body}</div>
        <div className="comments-icon-white icon"> <h4>{post.commentCount} comments</h4></div>
      </div>
    )
  }
}

export default PostMain
