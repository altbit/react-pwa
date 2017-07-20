import MuiTextField from 'material-ui/TextField';
import FieldWrapper from './../redux-form/Wrapper';

const TextField = (props) => {
  return (<FieldWrapper
    component={MuiTextField}
    {...props}
  />);
};

export default TextField;