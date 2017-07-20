export const arrayToCommaSeparated = value => (
  Array.isArray(value)
    ? value.reduce((output, item) => (`${output}${output ? ', ' : ''}${item}`), '')
    : value
);

export const jsonToString = value => {
  return value && typeof value === 'object'
    ? JSON.stringify(value)
    : value
};
