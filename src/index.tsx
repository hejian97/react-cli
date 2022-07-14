import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot(container!) if you use TypeScript
import App from './app';
import './index.css';

const container = document.querySelector('#root');
console.log(container);
const root = createRoot(container!);

if (module && module.hot) {
  module.hot.accept();
}

const name = 'minnie';

root.render(<App name={name} age={25} />);
