import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CreateCommentForm from './CreateCommentForm'
import { reset } from 'redux-form'
import { connect } from 'react-redux'
import { sendComment } from '../actions'
import Modal from 'react-modal'
import helpers from "../helpers"
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap'

class CreateComment extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  state = {
    commentModalOpen: false
  }

  openCreateCommentModal = () => this.setState(() => ({ commentModalOpen: true }))
  closeCreateCommentModal = () => this.setState(() => ({ commentModalOpen: false }))

  submitComment = (comment) => {
    const uuid = helpers.guid();
    const newComment = {
      id: uuid,
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
      parentId: this.props.postId
    }
    this.props.addNewComment(newComment)
    this.props.resetCommentForm()
    this.closeCreateCommentModal()
  }

  render() {
    const { commentModalOpen } = this.state

    return (
      <div>
        <Modal
          className='rd-modal comment-modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.closeCreateCommentModal}
          contentLabel='Modal'
        >
          <div className="modal-close animate" onClick={this.closeCreateCommentModal}></div>
          {commentModalOpen && <CreateCommentForm onSubmit={this.submitComment} />}
        </Modal>

        <ButtonToolbar>
          <Button onClick={this.openCreateCommentModal} bsStyle="primary" className="add-comment-button">
            <Glyphicon glyph="comment" />&nbsp; Add new comment
          </Button>
        </ButtonToolbar>
        <br />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewComment: (comment) => dispatch(sendComment(comment)),
    resetCommentForm: () => dispatch(reset('commentForm'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComment)
