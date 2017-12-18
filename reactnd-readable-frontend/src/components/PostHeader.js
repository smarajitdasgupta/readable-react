import React, { Component } from 'react';
import PropTypes from 'prop-types'
import PostChange from './PostChange'
import helpers from "../helpers"
import { Label, Glyphicon } from 'react-bootstrap'

class PostHeader extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  render() {
    const { post } = this.props

    return (
      <div className="single-post-detail">
        <PostChange post={post} />
        <h1>{post.title}</h1>

        <div>
          <Glyphicon glyph="user" /> by <strong className="author">{post.author}</strong>
          &nbsp;  &nbsp;
          <Glyphicon glyph="time" /> <small className="timestamp"><em>{helpers.formatDate(post.timestamp)}</em></small>
          &nbsp; &nbsp;
          <Glyphicon glyph="tag" /> <Label className='category-tag' bsStyle="info">{post.category}</Label>
        </div>
         
      </div>
    )
  }
}

export default PostHeader
