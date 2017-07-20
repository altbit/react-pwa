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
    return Object.keys(error.message).reduce((errors, fieldName) => {
      if (!errors[fieldName]) {
        let message = error.message[fieldName];
        if (typeof message == 'object') {
          message = Object.keys(message).reduce((result, key) => {
            return `${result}${message[key]}`;
          }, "");
        }
        errors[fieldName] = {
          message,
          value: formValues[fieldName],
        };
      }
      return errors;
    }, {});
  }
  return {};
};
