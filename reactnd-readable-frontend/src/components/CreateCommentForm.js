import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormControl, FormGroup, ButtonToolbar, Button, InputGroup, Glyphicon } from 'react-bootstrap'


const validate = values => {

  const errors = {};

  if (!values.author) {
    errors.author = 'Author name is mandatory for a comment.'
  }

  if (!values.body) {
    errors.body = 'Some content is required for a comment.'
  }

  return errors
}

const renderInputField = ({
  input,
  label,
  placeholder,
  type,
  className,
  icon,
  meta: { touched, error }
}) =>
  <div>
    <label>{label}</label>
    <div>
    
      {icon ? (
        <InputGroup>
          <InputGroup.Addon><Glyphicon glyph={icon} /></InputGroup.Addon>
          <FormControl { ...input } placeholder={placeholder} type={type} className={className} />
        </InputGroup>
      ) : (
          <FormControl { ...input } placeholder={placeholder} type={type} className={className} />
        )}

      {touched && error &&
        <div className="error">{error} </div>}
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
    <label>{label}</label>
    <div>
    <FormControl { ...input } className={ className } componentClass={type} placeholder={placeholder} />

      {touched && error &&
        <div className="error">{error} </div>}
    </div>
  </div>

const CreateCommentForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <FormGroup controlId="formControlsTextAuthor">
        <Field
          name="author"
          type="text"
          placeholder="Your name"
          className="comment-form-author"
          label="Author"
          component={renderInputField}
          icon="user"
        />
      </FormGroup>

      <FormGroup controlId="formControlsText">
        <Field
          name="body"
          type="textarea"
          placeholder="Write a response"
          className="comment-form-body"
          component={renderTextareaField}
          label="Comment"
        />
      </FormGroup>
      <br />
      <ButtonToolbar>
        <Button type="submit" bsStyle="info" bsSize="large" className="form-submit-button">
          <Glyphicon glyph="send" />  Publish
        </Button>
      </ButtonToolbar>
    </form>
  );
};

export default reduxForm({
  form: 'commentForm',
  validate
})(CreateCommentForm);
