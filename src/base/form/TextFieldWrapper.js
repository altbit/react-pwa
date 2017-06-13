import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

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