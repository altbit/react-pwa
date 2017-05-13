require('./../../assets/less/app.less');

const Layout = ({ children }) => {
  return (
    <div className='layout-wrapper'>
      {children}
    </div>
  );
};

export default Layout;