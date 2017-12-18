import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormControl, FormGroup, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap'


const validate = values => {

    const errors = {}

    if (!values.body) {
        errors.body = 'Some content is required for a comment.'
    }

    return errors
}

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

const EditCommentForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <FormGroup controlId="formControlsText">
        <Field
          name="body"
          type="textarea"
          placeholder="Your comment"
          className="comment-form-body"
          component={renderTextareaField}
          label="Edit comment"
        />
      </FormGroup>
      <br />
      <ButtonToolbar>
        <Button type="submit" bsStyle="success" bsSize="large" className="form-submit-button">
          <Glyphicon glyph="ok" />  Save
        </Button>
      </ButtonToolbar>
    </form>
  );
};

export default reduxForm({
  form: 'commentForm',
  validate
})(EditCommentForm);
