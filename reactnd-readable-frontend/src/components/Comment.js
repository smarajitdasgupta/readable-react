import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EditCommentForm from './EditCommentForm'
import { connect } from 'react-redux';
import helpers from "../helpers"
import { sendCommentVote, editComment, destroyComment } from '../actions'
import { reset } from 'redux-form'
import Modal from 'react-modal'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  state = {
    commentModalOpen: false
  }

  openEditCommentModal = () => this.setState(() => ({ commentModalOpen: true }))
  closeEditCommentModal = () => this.setState(() => ({ commentModalOpen: false }))

  editComment = (comment) => {
    const updatedComment = {
      id: comment.id,
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    }
    this.props.updateComment(updatedComment)
    this.props.resetCommentForm()
    this.closeEditCommentModal()
  }

  deleteComment = (comment) => this.props.destroyComment(comment)

  vote = (comment, vote) => {
    this.props.sendVote(comment, vote)
  }


  render() {
    const { comment } = this.props
    const vote = this.vote
    const { commentModalOpen } = this.state

    return (
      <div>
        <Modal
          className='rd-modal comment-modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.closeEditCommentModal}
          contentLabel='Modal'
        >
          <div className="modal-close animate" onClick={this.closeEditCommentModal}></div>
          {commentModalOpen && <EditCommentForm
            initialValues={comment}
            onSubmit={this.editComment} />}
        </Modal>
        <div className="comment" key={comment.id}>

          <div className="votes-wrap pull-right">

            <div className='vote-score'>{comment.voteScore}</div>
            <ButtonToolbar>
              <ButtonGroup>
                <Button bsStyle="success" onClick={() => vote(comment, "upVote")}><Glyphicon glyph="thumbs-up" /></Button>
                <Button bsStyle="danger" onClick={() => vote(comment, "downVote")}><Glyphicon glyph="thumbs-down" /></Button>
              </ButtonGroup>
            </ButtonToolbar>

          </div>

          <div className="comment-body">
            <div className="comment-data">
              <div><h5>{comment.body}</h5></div>

               <div className="comment-meta">
                  <Glyphicon glyph="user" /> <strong className="author">{comment.author}</strong>
                  &nbsp;  &nbsp;
                  <Glyphicon glyph="time" /> <small className="timestamp"><em>{helpers.formatDate(comment.timestamp)}</em></small>
                </div>

            </div>

            <ButtonGroup bsSize="small">
              <Button onClick={this.deleteComment.bind(this, comment)}><Glyphicon glyph="trash" /> Delete</Button>
              <Button onClick={this.openEditCommentModal}><Glyphicon glyph="pencil" /> Edit</Button>
            </ButtonGroup>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { comments: state.comments }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendVote: (comment, vote) => dispatch(sendCommentVote(comment, vote)),
    updateComment: (comment) => dispatch(editComment(comment)),
    resetCommentForm: () => dispatch(reset('commentForm')),
    destroyComment: (comment) => dispatch(destroyComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
