import React, { Component } from 'react'
import PostVotes from './PostVotes'
import PostChange from './PostChange'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import helpers from '../helpers/'
import { Label, Row, Col, Glyphicon } from 'react-bootstrap'

class PostSnippet extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  render() {
    const { post } = this.props
    const link = `${post.category}/${post.id}`

    return (

      <li className="list-group-item">

        <div className="post-main">
          <div className="post-header">

            <Row className="show-grid">
              <Col sm={9} className="post-meta">
                <div>
                  <Glyphicon glyph="user" /> <strong className="author">{post.author}</strong>
                  &nbsp;  &nbsp;
                  <Glyphicon glyph="time" /> <small className="timestamp"><em>{helpers.formatDate(post.timestamp)}</em></small>
                </div>
                <h3><Link to={link} className="post-link post-data">{post.title}</Link></h3>

                <div>
                  <Glyphicon glyph="tag" /> <Label className='category-tag' bsStyle="info">{post.category}</Label>
                  &nbsp;  &nbsp;
                    <Glyphicon glyph="comment" /> <span className="comments-icon-white icon">{post.commentCount} comments</span>
                </div>
                <br />
              </Col>
              <Col sm={3} className="posts-sidebar"><PostVotes post={post} /></Col>
            </Row>

            <PostChange post={post} />
          </div>
        </div>
      </li>

    )
  }
}

export default PostSnippet
