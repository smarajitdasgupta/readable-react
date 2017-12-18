import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { FormControl, FormGroup, ButtonToolbar, Button, InputGroup, Glyphicon } from 'react-bootstrap'

const renderInputField = ({
  input,
  label,
  placeholder,
  type,
  icon,
  className,
  meta: { touched, error }
}) =>
  <div>
    <label>{ label }</label>
    <div>
    { icon ? (
      <InputGroup>
        <InputGroup.Addon><Glyphicon glyph={icon} /></InputGroup.Addon>
        <FormControl { ...input } placeholder={ placeholder } type={ type } className={ className }/>
      </InputGroup>
    ) : (
       <FormControl { ...input } placeholder={ placeholder } type={ type } className={ className }/>
    )}

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

const renderSelectField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error },
  children
}) =>
<div>
  <label>{ label }</label>
  <div>
    <FormControl componentClass={type} className={ className } { ...input }>
      {children}
    </FormControl>
    { touched && error &&
      <div className="error">{error} </div> }
  </div>
</div>

const validate = values => {
  
      const errors = {};
  
      if (!values.author) {
          errors.author = 'Author name is mandatory.'
      }
  
      if (!values.title) {
          errors.title = 'Please enter a post title.'
      }
  
      if (!values.body) {
          errors.body = 'Some content is required.'
      }
  
      return errors
  }


class CreatePostForm extends Component {

  render() {

    const { handleSubmit, categories } = this.props

    return (
      <form onSubmit={handleSubmit} className="post-form">
        <FormGroup controlId="formControlsTextTitle">
          <Field 
            name="title" 
            className='post-title' 
            type='text' 
            component={renderInputField} 
            placeholder='Post title' 
            label="Title"  />
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

        <FormGroup controlId="formControlsTextAuthor">
          <Field
            name="author"
            type="text"
            placeholder="Your username"
            className="post-form-author"
            icon="user"
            component={renderInputField}
            label="Author"
          />
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <Field
            name="category"
            component={renderSelectField}
            type="select"
            className="post-form-category"
            label="Category"
          >

          {categories.filter((category) =>
            category.name !== "all").map((category, index) => (
              <option
                value={category.name}
                key={index}>{category.name}
              </option>
            ))}

          </Field>
        </FormGroup>
        <br />
        <ButtonToolbar>
          <Button type="submit" bsStyle="info" bsSize="large" className="form-submit-button">
            <Glyphicon glyph="send" />  Publish
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

CreatePostForm = connect(
  mapStateToProps
)(CreatePostForm)

export default reduxForm({
  form: 'postForm',
  validate
})(CreatePostForm)
