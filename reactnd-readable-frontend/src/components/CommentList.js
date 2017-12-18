import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import CreateComment from './CreateComment'

class CommentList extends Component {
  static propTypes = {
    postComments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
  }

  render() {
    const { postComments, postId } = this.props

    const sortComments = postComments.sort((a, b) => (b.voteScore-a.voteScore))

    return (
      <div>
        <div className="comments-list" id={postId}>
          <CreateComment postId={postId} />
          {sortComments.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default CommentList
