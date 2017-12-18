import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { sendPostVote } from '../actions'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'

class PostVotes extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  vote = (postId, vote) => {
    this.props.sendVote(postId, vote)
  }

  render() {
    const { post } = this.props
    const postId = post.id || ''

    return (
      <div className="votes-wrap pull-right">

        <div className='vote-score'>{post.voteScore}</div>
        <ButtonToolbar>
          <ButtonGroup>
            <Button bsStyle="success" onClick={() => this.vote(postId, "upVote")}><Glyphicon glyph="thumbs-up" /></Button>

            <Button bsStyle="danger" onClick={() => this.vote(postId, "downVote")}><Glyphicon glyph="thumbs-down" /></Button>
          </ButtonGroup>
        </ButtonToolbar>



      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendVote: (postId, vote) => dispatch(sendPostVote(postId, vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostVotes)
