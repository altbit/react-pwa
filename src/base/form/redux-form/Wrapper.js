import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

const FieldWrapper = (props) => {
  const { input, meta, fieldError, component: TextFieldComponent, ...otherProps } = props;
  let { error, helperText, ...other } = otherProps;

  if (fieldError) {
    error = true;
    helperText = fieldError.message;
  }

  if (meta.touched && (!fieldError || input.value != fieldError.value)) {
    error = typeof meta.error !== 'undefined';
    helperText = error ? meta.error : helperText;
  }

  return (<TextFieldComponent
    fullWidth
    InputProps={input}
    error={error}
    helperText={helperText}
    {...other}
    />);
};
FieldWrapper.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fieldError: PropTypes.object,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default FieldWrapper;