import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import AppRoutes from './app/routes';
import storage from './app/storage';

// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const onDOMLoaded = () => {
  window.removeEventListener('load', onDOMLoaded, false);
  document.removeEventListener('DOMContentLoaded', onDOMLoaded, false);

  document.body.classList.add('loader-fade-out');
  setTimeout(() => {
    document.body.classList.remove('loader-fade-out');
    document.body.classList.remove('loading');

    ReactDom.render(
      <Provider store={storage()}>
        <AppRoutes />
      </Provider>,
      document.querySelector('#app')
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
