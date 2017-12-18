import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreatePostForm from './CreatePostForm'
import { sendPost } from '../actions'
import { reset } from 'redux-form'
import Modal from 'react-modal'
import helpers from "../helpers"
import { ButtonToolbar, Button, Glyphicon, Col } from 'react-bootstrap'

class CreatePost extends Component {

  state = {
    postModalOpen: false
  }

  openCreatePostModal = () => this.setState(() => ({ postModalOpen: true }))
  closeCreatePostModal = () => this.setState(() => ({ postModalOpen: false }))

  createPost = (post) => {
    // create unique IDs for new posts
    const uuid = helpers.guid();
    console.log(uuid);
    const newPost = {
      id: uuid,
      timestamp: Date.now(),
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    }
    this.props.addNewPost(newPost)
    this.props.resetPostForm()
    this.closeCreatePostModal()
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    const { postModalOpen } = this.state

    return (
    <Col md={6}>
      <Modal
        className='rd-modal'
        overlayClassName='overlay'
        isOpen={postModalOpen}
        onRequestClose={this.closeCreatePostModal}
        contentLabel='Modal'
      >
        <div className="modal-close animate" onClick={this.closeCreatePostModal}></div>

        {postModalOpen && <CreatePostForm onSubmit={this.createPost} />}
      </Modal>

      <ButtonToolbar>
      <Button onClick={this.openCreatePostModal} bsStyle="primary" className="pull-right">
        <Glyphicon glyph="plus-sign" /> Create new post
      </Button>
      </ButtonToolbar>
      <br />
      

    </Col>

    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (post) => dispatch(sendPost(post)),
    resetPostForm:() => dispatch(reset('CreatePostForm')),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost)
