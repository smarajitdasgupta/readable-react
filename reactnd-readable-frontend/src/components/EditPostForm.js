import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { FormControl, FormGroup, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap'



const validate = values => {
  
      const errors = {};
  
      if (!values.title) {
          errors.title = 'Please enter a post title.'
      }
  
      if (!values.body) {
          errors.body = 'Some content is required.'
      }
  
      return errors
  }


const renderInputField = ({
  input,
  label,
  placeholder,
  type,
  className,
  meta: { touched, error }
}) =>
  <div>
    <label>{ label }</label>
    <div>
       <FormControl { ...input } className={ className } type={ type } placeholder={placeholder} />
      { touched && error &&
        <div className="error">{error} </div> }
    </div>
  </div>

const renderTextareaField = ({
  input,
  label,
  placeholder,
  type,
  className,
  meta: { touched, error }
}) =>
  <div>
    <label>{ label }</label>
    <div>
  
      <FormControl { ...input } className={ className } componentClass={type} placeholder={placeholder} />

      { touched && error &&
        <div className="error">{error} </div> }
    </div>
  </div>


class EditPostForm extends Component {

  render() {

    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit} className="post-form">
        <FormGroup controlId="formControlsTextTitle">       
          <Field
            name="title"
            component={renderInputField}
            type="text"
            placeholder="Post title"
            className="post-title"
            label="Title"
          />
        </FormGroup>

        <FormGroup controlId="formControlsText">
          <Field
            name="body"
            type="textarea"
            placeholder="Post content"
            className="post-content"
            component={renderTextareaField}
            label="Content"
          />
        </FormGroup>

        <div><Glyphicon glyph="user" /> {this.props.initialValues.author}</div>

        <br />
        <ButtonToolbar>
          <Button type="submit" bsStyle="success" bsSize="large" className="form-submit-button">
            <Glyphicon glyph="ok" />  Save
          </Button>
        </ButtonToolbar>
      </form>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

EditPostForm = connect(
  mapStateToProps
)(EditPostForm)

export default reduxForm({
  form: 'postForm',
  validate
})(EditPostForm)
