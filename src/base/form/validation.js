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
