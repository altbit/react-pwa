import ReactDom from 'react-dom';
import AppRoutes from './app/routes';

const onDOMLoaded = () => {
  window.removeEventListener('load', onDOMLoaded, false);
  document.removeEventListener('DOMContentLoaded', onDOMLoaded, false);

  document.body.classList.add('loader-fade-out');
  setTimeout(() => {
    document.body.classList.remove('loader-fade-out');
    document.body.classList.remove('loading');

    ReactDom.render(
      <AppRoutes />,
      document.querySelector('#main')
    );
  }, 500);
};

export const bootstrap = () => {
  if (document.readyState === 'complete') {
    onDOMLoaded();
  } else {
    window.addEventListener('load', onDOMLoaded, false);
    document.addEventListener('DOMContentLoaded', onDOMLoaded, false);
  }
};

bootstrap();
