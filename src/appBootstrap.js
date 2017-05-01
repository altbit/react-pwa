require('./assets/less/app.less');

const onDOMLoaded = () => {
  window.removeEventListener('load', onDOMLoaded, false);
  document.removeEventListener('DOMContentLoaded', onDOMLoaded, false);

  document.body.classList.add('loader-fade-out');
  setTimeout(() => {
    document.body.classList.remove('loader-fade-out');
    document.body.classList.remove('loading');
  }, 1000);

  console.log('Code goes here');
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
