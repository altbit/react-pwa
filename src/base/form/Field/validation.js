export const ERROR_VALIDATION_CODE = 'ERROR_VALIDATION';

export const isRequired = (fieldName) => (value, allValues, props) => {
  if (!value || value == '') {
    return `Enter ${fieldName}`;
  }
};

export const parseValidationErrors = (error, formValues = {}) => {
  if (error &&
    error.code === ERROR_VALIDATION_CODE &&
    error.message &&
    typeof error.message == 'object'
  ) {
    return error.message.reduce((errors, current) => {
      if (current.param && !errors[current.param]) {
        errors[current.param] = {
          message: current.msg,
          value: current.value || formValues[current.param],
        };
      }
      return errors;
    }, {});
  }
  return {};
};
