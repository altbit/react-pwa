require('./../../assets/less/app.less');

import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className='layout-wrapper'>
      {children}
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;