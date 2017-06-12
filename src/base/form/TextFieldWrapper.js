import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export const isRequired = (fieldName) => (value, allValues, props) => {
  if (!value || value == '') {
    return `Enter ${fieldName}`;
  }
};

export const parseValidationErrors = (error) => {
  if (error && parseInt(error.code) === 412 && error.message && error.message.length) {
    return error.message.reduce((errors, current) => {
      if (current.param && !errors[current.param]) {
        errors[current.param] = {
          message: current.msg,
          value: current.value,
        };
      }
      return errors;
    }, {});
  }
  return {};
};

const TextFieldWrapper = (props) => {
  const { input, meta, fieldError, ...otherProps } = props;
  let { error, helperText, ...other } = otherProps;

  if (fieldError) {
    error = true;
    helperText = fieldError.message;
  }

  if (meta.touched && (!fieldError || input.value != fieldError.value)) {
    error = typeof meta.error !== 'undefined';
    helperText = error ? meta.error : '';
  }

  return (<TextField
    InputProps={input}
    error={error}
    helperText={helperText}
    {...other}
  />);
};
TextFieldWrapper.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  error: PropTypes.any,
  helperText: PropTypes.string,
  fieldError: PropTypes.object,
};

export default TextFieldWrapper;