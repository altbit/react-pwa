export const FORM_VALIDATION_CODE = 412;

export const isRequired = (fieldName) => (value, allValues, props) => {
  if (!value || value == '') {
    return `Enter ${fieldName}`;
  }
};

export const parseValidationErrors = (error, formValues = {}) => {
  if (error && parseInt(error.code) === FORM_VALIDATION_CODE && error.message && error.message.length) {
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
